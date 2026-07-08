import { NextResponse } from 'next/server';

const DAY_SECONDS = 86_400;
const MAX_CANDLES_PER_REQUEST = 300;
const COINBASE_CANDLES_URL = 'https://api.exchange.coinbase.com/products/BTC-USD/candles';

type CoinbaseCandle = [number, number, number, number, number, number];

function parseTimestamp(value: string | null, fallback: number) {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.floor(parsed) : fallback;
}

async function fetchChunk(start: number, end: number): Promise<CoinbaseCandle[]> {
  const query = new URLSearchParams({
    granularity: String(DAY_SECONDS),
    start: new Date(start * 1000).toISOString(),
    end: new Date(end * 1000).toISOString(),
  });

  const response = await fetch(`${COINBASE_CANDLES_URL}?${query}`, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'btc-cycle-analyzer/1.0',
    },
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(12_000),
  });

  if (!response.ok) {
    throw new Error(`Coinbase returned HTTP ${response.status}`);
  }

  const payload: unknown = await response.json();
  if (!Array.isArray(payload)) throw new Error('Invalid Coinbase response');
  return payload as CoinbaseCandle[];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const now = Math.floor(Date.now() / 1000);
  const defaultFrom = Math.floor(Date.UTC(new Date().getUTCFullYear() - 2, 0, 1) / 1000);
  const requestedFrom = parseTimestamp(searchParams.get('from'), defaultFrom);
  const requestedTo = parseTimestamp(searchParams.get('to'), now);
  const from = Math.max(Math.floor(Date.UTC(2015, 0, 1) / 1000), requestedFrom);
  const to = Math.min(now, requestedTo);

  if (from >= to) {
    return NextResponse.json({ data: [], source: 'Coinbase Exchange', count: 0 });
  }

  try {
    const chunks: Array<{ start: number; end: number }> = [];
    for (let start = from; start < to; start += MAX_CANDLES_PER_REQUEST * DAY_SECONDS) {
      chunks.push({
        start,
        end: Math.min(to, start + (MAX_CANDLES_PER_REQUEST - 1) * DAY_SECONDS),
      });
    }

    // Keep a little distance between batches to respect the public API rate limit.
    const candles: CoinbaseCandle[] = [];
    for (const [index, chunk] of chunks.entries()) {
      if (index > 0) await new Promise(resolve => setTimeout(resolve, 120));
      candles.push(...await fetchChunk(chunk.start, chunk.end));
    }

    const unique = new Map<number, CoinbaseCandle>();
    for (const candle of candles) unique.set(candle[0], candle);

    const data = [...unique.values()]
      .filter(([time, low, high, open, close]) =>
        time >= from && time <= to && [low, high, open, close].every(Number.isFinite)
      )
      .map(([time, low, high, open, close]) => ({ time, open, high, low, close }))
      .sort((a, b) => a.time - b.time);

    return NextResponse.json({
      data,
      source: 'Coinbase Exchange',
      count: data.length,
      message: 'Daily BTC-USD candles loaded successfully',
    });
  } catch (error) {
    console.error('Coinbase market-data error:', error);
    return NextResponse.json(
      {
        data: [],
        source: 'Coinbase Exchange',
        error: true,
        message: 'Data pasar sedang tidak tersedia. Data simulasi tidak ditampilkan.',
      },
      { status: 502 },
    );
  }
}
