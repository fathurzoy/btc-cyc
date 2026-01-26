import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get('from') || Math.floor(new Date('2025-08-01').getTime() / 1000).toString();
  const to = searchParams.get('to') || Math.floor(new Date('2026-07-15').getTime() / 1000).toString();

  try {
    const limit = Math.min(2000, Math.floor((parseInt(to) - parseInt(from)) / 86400));
    
    console.log(`🔍 Fetching CryptoCompare data...`);
    console.log(`   From: ${new Date(parseInt(from) * 1000).toLocaleDateString()}`);
    console.log(`   To: ${new Date(parseInt(to) * 1000).toLocaleDateString()}`);
    console.log(`   Limit: ${limit} days`);
    
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=${limit}&toTs=${to}`,
      {
        headers: { 
          'Accept': 'application/json',
        },
        next: { revalidate: 3600 }
      }
    );
    
    if (!response.ok) {
      throw new Error(`CryptoCompare API failed with status ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.Data || !result.Data.Data) {
      throw new Error('Invalid CryptoCompare response');
    }
    
    const data = result.Data.Data.map((d: any) => ({
      time: d.time,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    }));
    
    const validData = data.filter((d: any) => d.open > 0 && d.close > 0);
    const sortedData = validData.sort((a: any, b: any) => a.time - b.time);
    
    const today = Math.floor(Date.now() / 1000);
    const futureEndDate = Math.floor(new Date('2027-07-15').getTime() / 1000);
    
    if (sortedData.length > 0 && today < futureEndDate) {
      const lastData = sortedData[sortedData.length - 1];
      const dayInSeconds = 24 * 60 * 60;
      let currentTime = lastData.time + dayInSeconds;
      let currentPrice = lastData.close;
      
      console.log(`📊 Generating future projection from ${new Date(currentTime * 1000).toLocaleDateString()} to ${new Date(futureEndDate * 1000).toLocaleDateString()}`);
      
      while (currentTime <= futureEndDate) {
        const dailyChange = (Math.random() - 0.48) * 0.02;
        currentPrice = currentPrice * (1 + dailyChange);
        
        const open = currentPrice;
        const close = currentPrice * (1 + (Math.random() - 0.5) * 0.01);
        const high = Math.max(open, close) * (1 + Math.random() * 0.01);
        const low = Math.min(open, close) * (1 - Math.random() * 0.01);
        
        sortedData.push({
          time: currentTime,
          open: Math.round(open * 100) / 100,
          high: Math.round(high * 100) / 100,
          low: Math.round(low * 100) / 100,
          close: Math.round(close * 100) / 100,
        });
        
        currentTime += dayInSeconds;
      }
      
      console.log(`✅ Total data points including projection: ${sortedData.length}`);
    }
    
    console.log(`✅ Success! Got ${sortedData.length} data points from CryptoCompare`);
    
    return NextResponse.json({ 
      data: sortedData,
      source: 'cryptocompare',
      count: sortedData.length,
      message: 'Data successfully fetched from CryptoCompare API (with future projection)'
    });
    
  } catch (error) {
    console.error('❌ CryptoCompare API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch crypto data',
        message: error instanceof Error ? error.message : 'Unknown error',
        source: 'error'
      },
      { status: 500 }
    );
  }
}