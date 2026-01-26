'use client';

import { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, type IChartApi, type ISeriesApi, type Time } from 'lightweight-charts';

interface CandlestickData {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface DateRange {
  name: string;
  start: Time;
  end: Time;
  color: string;
  borderColor: string;
  label: string;
}

const DATE_RANGES: DateRange[] = [
  {
    name: 'Range 1',
    start: Math.floor(new Date('2025-10-01').getTime() / 1000) as Time,
    end: Math.floor(new Date('2025-10-29').getTime() / 1000) as Time,
    color: 'rgba(255, 152, 0, 0.15)',
    borderColor: '#FF9800',
    label: '1 Okt 2025 - 29 Okt 2025'
  },
  {
    name: 'Range 2',
    start: Math.floor(new Date('2026-04-01').getTime() / 1000) as Time,
    end: Math.floor(new Date('2026-06-01').getTime() / 1000) as Time,
    color: 'rgba(255, 152, 0, 0.15)',
    borderColor: '#FF9800',
    label: '1 Apr 2026 - 1 Jun 2026'
  },
  {
    name: 'Range 3',
    start: Math.floor(new Date('2026-10-01').getTime() / 1000) as Time,
    end: Math.floor(new Date('2026-12-31').getTime() / 1000) as Time,
    color: 'rgba(255, 152, 0, 0.15)',
    borderColor: '#FF9800',
    label: '1 Okt 2026 - 31 Des 2026'
  },
  {
    name: 'Range 4',
    start: Math.floor(new Date('2027-03-01').getTime() / 1000) as Time,
    end: Math.floor(new Date('2027-05-31').getTime() / 1000) as Time,
    color: 'rgba(255, 152, 0, 0.15)',
    borderColor: '#FF9800',
    label: '1 Mar 2027 - 31 Mei 2027'
  }
];

export default function CryptoChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [data, setData] = useState<CandlestickData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    currentPrice: 0,
    change24h: 0,
    dataPoints: 0,
    source: 'CryptoCompare'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching data from API...');
      const response = await fetch(`/api/crypto?t=${Date.now()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.error && !result.data) {
        throw new Error(result.message || 'API error');
      }
      
      const today = Math.floor(Date.now() / 1000);
      const realDataOnly = result.data.filter((d: CandlestickData) => (d.time as number) <= today);
      
      console.log(`Received ${result.data.length} data points, keeping ${realDataOnly.length} real data points`);
      
      const futureEndDate = Math.floor(new Date('2027-07-15').getTime() / 1000);
      const extendedData = [...realDataOnly];
      
      if (realDataOnly.length > 0) {
        const lastRealData = realDataOnly[realDataOnly.length - 1];
        const lastPrice = lastRealData.close;
        const dayInSeconds = 24 * 60 * 60;
        let currentTime = (lastRealData.time as number) + dayInSeconds;
        
        while (currentTime <= futureEndDate) {
          extendedData.push({
            time: currentTime as Time,
            open: lastPrice,
            high: lastPrice,
            low: lastPrice,
            close: lastPrice,
          });
          currentTime += dayInSeconds;
        }
        
        console.log(`Extended data with ${extendedData.length - realDataOnly.length} flat price points`);
      }
      
      setData(extendedData);
      
      if (realDataOnly.length > 0) {
        const latest = realDataOnly[realDataOnly.length - 1];
        const previous = realDataOnly[realDataOnly.length - 2];
        
        setStats({
          currentPrice: latest.close,
          change24h: previous ? ((latest.close - previous.close) / previous.close) * 100 : 0,
          dataPoints: realDataOnly.length,
          source: result.source || 'Unknown'
        });
      }
      
      // Show warning if using mock data
      if (result.source && result.source.includes('mock')) {
        console.warn('⚠️ Using mock data - CryptoCompare API unavailable');
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!chartContainerRef.current || data.length === 0) return;

    // Properly dispose of previous chart instance
    if (chartRef.current) {
      try {
        chartRef.current.remove();
        chartRef.current = null;
      } catch (error) {
        // Chart already disposed, ignore error
        console.warn('Chart disposal warning:', error);
      }
    }

    // Small delay to ensure previous chart is fully disposed
    const timeoutId = setTimeout(() => {
      if (!chartContainerRef.current) return;

      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 600,
        layout: {
          background: { type: ColorType.Solid, color: 'rgba(15, 23, 42, 0.5)' },
          textColor: '#e2e8f0',
        },
        grid: {
          vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
          horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
        },
        crosshair: {
          mode: 1,
        },
        rightPriceScale: {
          borderColor: 'rgba(255, 255, 255, 0.1)',
        },
        timeScale: {
          borderColor: 'rgba(255, 255, 255, 0.1)',
          timeVisible: true,
          secondsVisible: false,
        },
      });

      chartRef.current = chart;

      // Use addCandlestickSeries for v4.2+
      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      });

      candlestickSeries.setData(data);

      const today = Math.floor(Date.now() / 1000);
      
      DATE_RANGES.forEach((range) => {
        const rangeData = data.filter(d => (d.time as number) >= (range.start as number) && (d.time as number) <= (range.end as number));
        
        if (rangeData.length > 0) {
          const minPrice = Math.min(...rangeData.map(d => d.low));
          const maxPrice = Math.max(...rangeData.map(d => d.high));
          const margin = (maxPrice - minPrice) * 0.15 || maxPrice * 0.1;

          const topValue = maxPrice + margin;
          const bottomValue = minPrice - margin;
          
          const isFutureRange = (range.start as number) > today;

          if (!isFutureRange) {
            const backgroundSeries = chart.addAreaSeries({
              topColor: range.color,
              bottomColor: range.color,
              lineColor: 'transparent',
              priceLineVisible: false,
              lastValueVisible: false,
              crosshairMarkerVisible: false,
            });

            const areaData = [
              { time: range.start, value: topValue },
              { time: range.end, value: topValue },
            ];
            backgroundSeries.setData(areaData);
          }

          const borderStyle = isFutureRange ? 2 : 0;

          const topBorder = chart.addLineSeries({
            color: range.borderColor,
            lineWidth: 3 as any,
            lineStyle: borderStyle,
            priceLineVisible: false,
            lastValueVisible: false,
            crosshairMarkerVisible: false,
          });
          topBorder.setData([
            { time: range.start, value: topValue },
            { time: range.end, value: topValue },
          ]);

          const bottomBorder = chart.addLineSeries({
            color: range.borderColor,
            lineWidth: 3 as any,
            lineStyle: borderStyle,
            priceLineVisible: false,
            lastValueVisible: false,
            crosshairMarkerVisible: false,
          });
          bottomBorder.setData([
            { time: range.start, value: bottomValue },
            { time: range.end, value: bottomValue },
          ]);
        }
      });

      chart.timeScale().fitContent();

      const handleResize = () => {
        if (chartContainerRef.current && chartRef.current) {
          try {
            chartRef.current.applyOptions({ 
              width: chartContainerRef.current.clientWidth 
            });
          } catch (error) {
            // Chart disposed during resize, safe to ignore
          }
        }
      };

      window.addEventListener('resize', handleResize);

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        if (chartRef.current) {
          try {
            chartRef.current.remove();
            chartRef.current = null;
          } catch (error) {
            // Chart already disposed, safe to ignore
          }
        }
      };
    }, 10); // Small delay to ensure previous chart is fully removed

    // Cleanup the timeout on unmount
    return () => {
      clearTimeout(timeoutId);
    };
  }, [data]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-500/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-300 font-medium">Loading chart data...</p>
          <p className="text-sm text-gray-400 mt-2">Fetching from CryptoCompare API</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-500/20">
        <div className="bg-red-900/20 border-2 border-red-500/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <svg className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <h3 className="font-bold text-red-300 text-lg mb-2">Failed to Load Chart</h3>
              <p className="text-red-200 mb-4">{error}</p>
              <button
                onClick={fetchData}
                className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-lg hover:shadow-xl"
              >
                🔄 Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Mock Data Warning */}
      {stats.source.includes('mock') && (
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-yellow-200 font-semibold text-sm">Using Demo Data</p>
              <p className="text-yellow-300 text-xs">CryptoCompare API temporarily unavailable. Displaying realistic mock data for demonstration.</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-purple-500/20">
        <div ref={chartContainerRef} className="w-full" />
        
        <div className="flex flex-wrap gap-4 md:gap-6 justify-center mt-6 pt-6 border-t border-purple-500/20">
          {DATE_RANGES.map((range, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-slate-700/50 px-4 md:px-6 py-3 rounded-xl shadow-sm border border-purple-500/10">
              <div 
                className="w-10 h-7 rounded-md border-2" 
                style={{ 
                  background: range.color, 
                  borderColor: range.borderColor 
                }}
              ></div>
              <div className="text-sm">
                <span className="font-bold text-gray-200">{range.name}:</span>
                <span className="ml-1 text-gray-400">{range.label}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-400">
          <p>📌 Box dengan <strong className="text-purple-400">border solid</strong> = periode dengan data real</p>
          <p>📌 Box dengan <strong className="text-purple-400">border putus-putus</strong> = periode masa depan (placeholder)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform border border-purple-500/30">
          <h3 className="text-xs md:text-sm uppercase tracking-wider opacity-90 mb-2 font-semibold">Current Price</h3>
          <p className="text-2xl md:text-3xl font-bold">
            ${stats.currentPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform border border-blue-500/30">
          <h3 className="text-xs md:text-sm uppercase tracking-wider opacity-90 mb-2 font-semibold">24h Change</h3>
          <p className={`text-2xl md:text-3xl font-bold ${stats.change24h >= 0 ? 'text-green-300' : 'text-red-300'}`}>
            {stats.change24h >= 0 ? '+' : ''}{stats.change24h.toFixed(2)}%
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform border border-indigo-500/30">
          <h3 className="text-xs md:text-sm uppercase tracking-wider opacity-90 mb-2 font-semibold">Data Points</h3>
          <p className="text-2xl md:text-3xl font-bold">{stats.dataPoints}</p>
        </div>
        
        <div className="bg-gradient-to-br from-violet-600 to-violet-800 rounded-xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform border border-violet-500/30">
          <h3 className="text-xs md:text-sm uppercase tracking-wider opacity-90 mb-2 font-semibold">Data Source</h3>
          <p className="text-2xl md:text-3xl font-bold">{stats.source}</p>
        </div>
      </div>
    </div>
  );
}