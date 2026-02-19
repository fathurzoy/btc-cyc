'use client';

import { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, type IChartApi, type Time } from 'lightweight-charts';
import { generateTheoreticalWCL, generateTheoreticalDCL } from '../utils/cycleGenerator';

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
  isProjection?: boolean;
}

// Keep historical ranges as static/verified
const STATIC_RANGES: DateRange[] = [
  {
    name: 'Range 1',
    start: Math.floor(new Date('2025-10-01').getTime() / 1000) as Time,
    end: Math.floor(new Date('2025-10-29').getTime() / 1000) as Time,
    color: 'rgba(255, 152, 0, 0.15)',
    borderColor: '#FF9800',
    label: '1 Okt 2025 - 29 Okt 2025 (Static)'
  }
];

interface CryptoChartProps {
    mode?: 'wcl' | 'dcl';
    yearRange?: { start: number, end: number }; // Replaces selectedYear
    selectedYear?: number; // Keep for backward compatibility if needed, but we'll migrate
}

export default function CryptoChart({ mode = 'wcl', yearRange, selectedYear }: CryptoChartProps) {
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
  const [activeRanges, setActiveRanges] = useState<DateRange[]>(STATIC_RANGES);
  const [wclInfo, setWclInfo] = useState<{lastLowDate: string, lastLowPrice: number} | null>(null);

  // Normalize year input to range
  const activeYearRange = yearRange || (selectedYear ? { start: selectedYear, end: selectedYear } : undefined);

  useEffect(() => {
    fetchData();
  }, [mode, activeYearRange?.start, activeYearRange?.end]);

  const findRecentMajorLow = (data: CandlestickData[]) => {
    if (data.length < 30) return null;
    
    // Look back approx 300 days (or all data if less)
    const lookbackDays = 300;
    const startIndex = Math.max(0, data.length - lookbackDays);
    const recentData = data.slice(startIndex);

    if (recentData.length === 0) return null;

    // Find the absolute lowest point
    let minLow = recentData[0].low;
    let minIndex = 0;

    for (let i = 1; i < recentData.length; i++) {
        if (recentData[i].low < minLow) {
            minLow = recentData[i].low;
            minIndex = i;
        }
    }

    return recentData[minIndex];
  };

  const calculateProjectedRanges = (lastLowTime: number): DateRange[] => {
    // Only WCL has dynamic projection for now
    if (mode !== 'wcl') return [];

    const ranges: DateRange[] = [];
    const oneDaySeconds = 86400;
    const weekSeconds = oneDaySeconds * 7;
    
    // Cycle Settings: 28 Weeks Interval
    const startWeek = 28;
    const endWeek = 32;
    
    // Projection 1
    const p1Start = lastLowTime + (startWeek * weekSeconds);
    const p1End = lastLowTime + (endWeek * weekSeconds);
    const p1StartDate = new Date(p1Start * 1000);
    const p1EndDate = new Date(p1End * 1000);

    ranges.push({
        name: 'Next WCL',
        start: p1Start as Time,
        end: p1End as Time,
        color: 'rgba(147, 51, 234, 0.15)', // Purple for predicted
        borderColor: '#9333ea',
        label: `${p1StartDate.toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})} - ${p1EndDate.toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}`,
        isProjection: true
    });

    // Projection 2 (Next cycle)
    const p2Start = p1Start + (startWeek * weekSeconds);
    const p2End = p2Start + ((endWeek - startWeek + 2) * weekSeconds);
    const p2StartDate = new Date(p2Start * 1000);

    ranges.push({
        name: 'WCL +1',
        start: p2Start as Time,
        end: p2End as Time,
        color: 'rgba(147, 51, 234, 0.1)',
        borderColor: '#9333ea',
        label: `${p2StartDate.toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})} (Est.)`,
        isProjection: true
    });

    return ranges;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const rangeLabel = activeYearRange ? `${activeYearRange.start}-${activeYearRange.end}` : 'All Time';
      console.log(`Fetching data... Mode: ${mode}, Range: ${rangeLabel}`);
      const response = await fetch(`/api/crypto?t=${Date.now()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.error && !result.data) {
        throw new Error(result.message || 'API error');
      }
      
      let allData: CandlestickData[] = result.data;
      
      const today = Math.floor(Date.now() / 1000);
      const realDataOnlyFull = allData.filter((d: CandlestickData) => (d.time as number) <= today);
      
      let combinedRanges: DateRange[] = [];

      if (mode === 'wcl') {
        // --- WCL Logic ---
        // Use FULL history for detection, not just selected year
        const majorLow = findRecentMajorLow(realDataOnlyFull);
        let dynamicRanges: DateRange[] = [];
        
        if (majorLow) {
            setWclInfo({
                lastLowDate: new Date((majorLow.time as number) * 1000).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                }),
                lastLowPrice: majorLow.low
            });
            dynamicRanges = calculateProjectedRanges(majorLow.time as number);
        } else {
            setWclInfo(null);
        }

        // Theoretical WCL
        const theoreticalRaw = generateTheoreticalWCL();
        const theoreticalRanges: DateRange[] = theoreticalRaw.map(t => ({
            name: t.label,
            start: Math.floor(t.start.getTime() / 1000) as Time,
            end: Math.floor(t.end.getTime() / 1000) as Time,
            color: 'rgba(234, 179, 8, 0.15)', // Gold for WCL
            borderColor: '#eab308',
            label: t.label
        }));
        
        combinedRanges = [...STATIC_RANGES, ...dynamicRanges, ...theoreticalRanges];

      } else {
        // --- DCL Logic ---
        setWclInfo(null);
        const theoreticalRaw = generateTheoreticalDCL();
        const theoreticalRanges: DateRange[] = theoreticalRaw.map(t => ({
            name: t.label,
            start: Math.floor(t.start.getTime() / 1000) as Time,
            end: Math.floor(t.end.getTime() / 1000) as Time,
            color: 'rgba(156, 163, 175, 0.15)', // Grey for DCL
            borderColor: '#9ca3af',
            label: t.label
        }));
        
        combinedRanges = [...theoreticalRanges];
      }

      // --- Filter Data & Ranges by Year Range (Display Only) ---
      let filteredData = allData;

      if (activeYearRange) {
          const startTimestamp = Math.floor(new Date(`${activeYearRange.start}-01-01`).getTime() / 1000);
          const endTimestamp = Math.floor(new Date(`${activeYearRange.end}-12-31`).getTime() / 1000);
          
          // Data Buffer: 1 month
          const dataBuffer = 30 * 86400; 
          filteredData = allData.filter(d => (d.time as number) >= (startTimestamp - dataBuffer) && (d.time as number) <= (endTimestamp + dataBuffer));

          // Range Buffer: 60 days
          const rangeBuffer = 60 * 86400;
          combinedRanges = combinedRanges.filter(r => 
              (r.start as number) < (endTimestamp + rangeBuffer) && (r.end as number) > (startTimestamp - rangeBuffer)
          );
      } else {
          // Default: Recent data
          const startRecent = Math.floor(new Date('2023-01-01').getTime() / 1000);
          filteredData = allData.filter(d => (d.time as number) >= startRecent);
      }

      setActiveRanges(combinedRanges);
      setData(filteredData);
      
      // Stats
      if (allData.length > 0) {
        const latest = allData[allData.length - 1];
        const previous = allData.length > 1 ? allData[allData.length - 2] : null;
        
        setStats({
            currentPrice: latest.close,
            change24h: previous ? ((latest.close - previous.close) / previous.close) * 100 : 0,
            dataPoints: allData.length,
            source: result.source || 'CryptoCompare'
        });
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error in fetchData:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Dispose old chart
    if (chartRef.current) {
      try {
        chartRef.current.remove();
        chartRef.current = null;
      } catch (error) {
        console.warn('Chart disposal warning:', error);
      }
    }

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

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      });

      candlestickSeries.setData(data);

      const today = Math.floor(Date.now() / 1000);
      
      // Force TimeScale to Active Year Range if available
      if (activeYearRange) {
          const startTimestamp = Math.floor(new Date(`${activeYearRange.start}-01-01`).getTime() / 1000) as Time;
          const endTimestamp = Math.floor(new Date(`${activeYearRange.end}-12-31`).getTime() / 1000) as Time;
          chart.timeScale().setVisibleRange({
              from: startTimestamp,
              to: endTimestamp,
          });
      }

      activeRanges.forEach((range) => {
        const rangeData = data.filter(d => (d.time as number) >= (range.start as number) && (d.time as number) <= (range.end as number));
        
        let minPrice = 0;
        let maxPrice = 0;

        if (rangeData.length > 0) {
            minPrice = Math.min(...rangeData.map(d => d.low));
            maxPrice = Math.max(...rangeData.map(d => d.high));
        } else {
             // Fallback
             if (data.length > 0) {
                 const lastData = data[data.length - 1];
                 minPrice = lastData.low;
                 maxPrice = lastData.high;
             } else {
                 // Completely empty data (Future years 2027+)
                 // Use a default range for visualization
                 minPrice = 60000;
                 maxPrice = 140000; 
             }
        }

        const margin = (maxPrice - minPrice) * 0.15 || 2000;

        const topValue = maxPrice + margin;
        const bottomValue = minPrice - margin;
        
        const isTheoretical = range.name.includes('Theoretical') || range.name.includes('DCL');
        const isFutureRange = (range.start as number) > today || range.isProjection;

        // Draw background
        if (!isFutureRange || isTheoretical) { 
          if (!isFutureRange || isTheoretical) {
            const backgroundSeries = chart.addAreaSeries({
                topColor: range.color,
                bottomColor: range.color.replace('0.15', '0.05'),
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
        }

        const borderStyle = (isFutureRange && !isTheoretical) ? 2 : 0; 

        const topBorder = chart.addLineSeries({
          color: range.borderColor,
          lineWidth: isTheoretical ? 1 : 2 as any,
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
          lineWidth: isTheoretical ? 1 : 2 as any,
          lineStyle: borderStyle,
          priceLineVisible: false,
          lastValueVisible: false,
          crosshairMarkerVisible: false,
        });
        bottomBorder.setData([
          { time: range.start, value: bottomValue },
          { time: range.end, value: bottomValue },
        ]);
      });

      chart.timeScale().fitContent();

      const handleResize = () => {
        if (chartContainerRef.current && chartRef.current) {
          try {
            chartRef.current.applyOptions({ 
              width: chartContainerRef.current.clientWidth 
            });
          } catch (error) { }
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (chartRef.current) {
          try {
            chartRef.current.remove();
            chartRef.current = null;
          } catch (error) { }
        }
      };
    }, 10);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [data, activeRanges, activeYearRange]); // Add activeYearRange to dependencies


  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-500/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-300 font-medium">Loading {mode === 'dcl' ? 'DCL' : 'WCL'} Data {selectedYear}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-500/20">
        <div className="text-red-400 text-center">
          <h3 className="font-bold text-lg mb-2">Error</h3>
          <p>{error}</p>
          <button onClick={fetchData} className="mt-4 px-4 py-2 bg-red-600 rounded-lg text-white">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-purple-500/20">
        <div ref={chartContainerRef} className="w-full" />
        
        {/* WCL Info Info - Only show for WCL mode */}
        {mode === 'wcl' && wclInfo && (
            <div className="mt-4 mb-4 bg-purple-900/20 border border-purple-500/30 rounded-lg p-3 text-center">
                <p className="text-purple-200 text-sm">
                    <strong>Last Major Low Detected:</strong> {wclInfo.lastLowDate} @ ${wclInfo.lastLowPrice.toLocaleString()} 
                    <span className="mx-2">•</span>
                    Projection Base: 28 weeks
                </p>
            </div>
        )}

        <div className="flex flex-wrap gap-4 md:gap-6 justify-center mt-6 pt-6 border-t border-purple-500/20">
          {activeRanges.map((range, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-slate-700/50 px-4 md:px-6 py-3 rounded-xl shadow-sm border border-purple-500/10">
              <div 
                className="w-10 h-7 rounded-md border-2" 
                style={{ 
                  background: range.color, 
                  borderColor: range.borderColor,
                  borderStyle: (range.isProjection && !range.name.includes('Theoretical')) ? 'dashed' : 'solid'
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
           {mode === 'wcl' ? (
               <>
                <p>📌 Box <strong className="text-yellow-400">Emas</strong> = Theoretical WCL (196 hari)</p>
                <p>📌 Box <strong className="text-purple-400">Putus-putus</strong> = Dynamic Projection</p>
               </>
           ) : (
                <p>📌 Box <strong className="text-gray-400">Abu-abu</strong> = Theoretical DCL (60 hari)</p>
           )}
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6 text-white shadow-xl">
          <h3 className="text-xs uppercase opacity-90 mb-2 font-semibold">Current Price</h3>
          <p className="text-2xl font-bold">${stats.currentPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-xl">
          <h3 className="text-xs uppercase opacity-90 mb-2 font-semibold">24h Change</h3>
          <p className={`text-2xl font-bold ${stats.change24h >= 0 ? 'text-green-300' : 'text-red-300'}`}>
            {stats.change24h >= 0 ? '+' : ''}{stats.change24h.toFixed(2)}%
          </p>
        </div>
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl p-6 text-white shadow-xl">
            <h3 className="text-xs uppercase opacity-90 mb-2 font-semibold">Mode</h3>
            <p className="text-2xl font-bold">{mode.toUpperCase()}</p>
        </div>
         <div className="bg-gradient-to-br from-violet-600 to-violet-800 rounded-xl p-6 text-white shadow-xl">
            <h3 className="text-xs uppercase opacity-90 mb-2 font-semibold">Active Year</h3>
            <p className="text-lg font-bold leading-tight">
                {selectedYear || 'All Time'}
            </p>
        </div>
      </div>
    </div>
  );
}