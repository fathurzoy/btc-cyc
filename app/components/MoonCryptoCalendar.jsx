'use client';
import React, { useState, useEffect } from 'react';
import { Moon, Sun, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const MoonCryptoCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [moonPhases, setMoonPhases] = useState([]);
  const [predictions, setPredictions] = useState({});
  const [calendar, setCalendar] = useState([]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 15 }, (_, i) => 2016 + i);

  const calculateMoonPhase = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    
    let c, e, jd, b;
    
    if (month < 3) {
      year--;
      month += 12;
    }
    
    ++month;
    c = 365.25 * year;
    e = 30.6 * month;
    jd = c + e + day - 694039.09;
    jd /= 29.5305882;
    b = parseInt(jd);
    jd -= b;
    b = Math.round(jd * 8);
    
    if (b >= 8) b = 0;
    
    return b;
  };

  const getMoonPhaseName = (phase) => {
    const phases = [
      'New Moon',
      'Waxing Crescent',
      'First Quarter',
      'Waxing Gibbous',
      'Full Moon',
      'Waning Gibbous',
      'Last Quarter',
      'Waning Crescent'
    ];
    return phases[phase];
  };

  const getMoonEmoji = (phase) => {
    const emojis = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
    return emojis[phase];
  };

  const getCryptoPrediction = (phaseName) => {
    const predictions = {
      'New Moon': {
        trend: 'bearish',
        confidence: 'high',
        description: 'New cycle begins. Historically shows price correction and accumulation.',
        icon: TrendingDown,
        color: 'text-red-500'
      },
      'Waxing Crescent': {
        trend: 'neutral',
        confidence: 'medium',
        description: 'Recovery phase. Market starts building momentum.',
        icon: Minus,
        color: 'text-yellow-400'
      },
      'First Quarter': {
        trend: 'bullish',
        confidence: 'medium',
        description: 'Growing bullish sentiment. Buying pressure increases.',
        icon: TrendingUp,
        color: 'text-green-400'
      },
      'Waxing Gibbous': {
        trend: 'bullish',
        confidence: 'high',
        description: 'Strong upward momentum. Approaching peak cycle.',
        icon: TrendingUp,
        color: 'text-green-500'
      },
      'Full Moon': {
        trend: 'bullish',
        confidence: 'high',
        description: 'Peak energy! Historically shows maximum bullish sentiment and price surge.',
        icon: TrendingUp,
        color: 'text-green-600'
      },
      'Waning Gibbous': {
        trend: 'neutral',
        confidence: 'medium',
        description: 'Post-peak consolidation. Prepare for potential reversal.',
        icon: Minus,
        color: 'text-yellow-500'
      },
      'Last Quarter': {
        trend: 'bearish',
        confidence: 'medium',
        description: 'Correction phase begins. Selling pressure increases.',
        icon: TrendingDown,
        color: 'text-red-400'
      },
      'Waning Crescent': {
        trend: 'bearish',
        confidence: 'high',
        description: 'Final correction phase. Bottom formation before new cycle.',
        icon: TrendingDown,
        color: 'text-red-600'
      }
    };
    return predictions[phaseName];
  };

  useEffect(() => {
    const generateCalendar = () => {
      const firstDay = new Date(selectedYear, selectedMonth, 1);
      const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();
      
      const calendarData = [];
      const phases = [];
      const preds = {};
      
      for (let i = 0; i < startingDayOfWeek; i++) {
        calendarData.push(null);
      }
      
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(selectedYear, selectedMonth, day);
        const phase = calculateMoonPhase(date);
        const phaseName = getMoonPhaseName(phase);
        
        calendarData.push({
          day,
          date,
          phase,
          phaseName,
          emoji: getMoonEmoji(phase)
        });
        
        if (phase === 0 || phase === 4) {
          phases.push({
            date: day,
            phaseName,
            emoji: getMoonEmoji(phase),
            prediction: getCryptoPrediction(phaseName)
          });
        }
        
        preds[day] = getCryptoPrediction(phaseName);
      }
      
      setMoonPhases(phases);
      setPredictions(preds);
      setCalendar(calendarData);
    };

    generateCalendar();
  }, [selectedMonth, selectedYear]);

  const weeks = [];
  for (let i = 0; i < calendar.length; i += 7) {
    weeks.push(calendar.slice(i, i + 7));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
            <Moon className="w-8 h-8 md:w-10 md:h-10 text-purple-400" />
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Moon Phase Crypto Predictor
            </h1>
            <Sun className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />
          </div>
          <p className="text-gray-300 text-sm md:text-lg px-4">
            Prediksi pergerakan cryptocurrency berdasarkan fase bulan
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6 mb-4 md:mb-6 border border-purple-500/20">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center justify-center">
            <div className="flex items-center gap-2">
              <label className="text-white font-medium text-sm md:text-base whitespace-nowrap">Bulan:</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="bg-slate-700 text-white px-3 md:px-4 py-2 rounded-lg border border-purple-500/30 focus:border-purple-500 focus:outline-none w-full sm:w-auto text-sm md:text-base"
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-white font-medium text-sm md:text-base whitespace-nowrap">Tahun:</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="bg-slate-700 text-white px-3 md:px-4 py-2 rounded-lg border border-purple-500/30 focus:border-purple-500 focus:outline-none w-full sm:w-auto text-sm md:text-base"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6 mb-4 md:mb-6 border border-purple-500/20">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Moon className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
            <span className="text-sm md:text-2xl">Key Moon Phases - {months[selectedMonth]} {selectedYear}</span>
          </h2>
          
          {moonPhases.length > 0 ? (
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-purple-500/30">
                        <th className="text-left text-gray-300 py-2 md:py-3 px-2 md:px-4 text-xs md:text-base">Tanggal</th>
                        <th className="text-left text-gray-300 py-2 md:py-3 px-2 md:px-4 text-xs md:text-base">Fase</th>
                        <th className="text-left text-gray-300 py-2 md:py-3 px-2 md:px-4 text-xs md:text-base">Prediksi</th>
                        <th className="text-left text-gray-300 py-2 md:py-3 px-2 md:px-4 text-xs md:text-base hidden lg:table-cell">Confidence</th>
                        <th className="text-left text-gray-300 py-2 md:py-3 px-2 md:px-4 text-xs md:text-base hidden xl:table-cell">Deskripsi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {moonPhases.map((phase, index) => {
                        const Icon = phase.prediction.icon;
                        return (
                          <tr key={index} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                            <td className="py-3 md:py-4 px-2 md:px-4">
                              <span className="text-white font-medium text-xs md:text-base whitespace-nowrap">
                                {months[selectedMonth]} {phase.date}
                              </span>
                            </td>
                            <td className="py-3 md:py-4 px-2 md:px-4">
                              <div className="flex items-center gap-1 md:gap-2">
                                <span className="text-2xl md:text-3xl">{phase.emoji}</span>
                                <span className="text-gray-300 text-xs md:text-base hidden sm:inline">{phase.phaseName}</span>
                              </div>
                            </td>
                            <td className="py-3 md:py-4 px-2 md:px-4">
                              <div className="flex items-center gap-1 md:gap-2">
                                <Icon className={`w-4 h-4 md:w-5 md:h-5 ${phase.prediction.color}`} />
                                <span className={`font-medium capitalize ${phase.prediction.color} text-xs md:text-base`}>
                                  {phase.prediction.trend}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 md:py-4 px-2 md:px-4 hidden lg:table-cell">
                              <span className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
                                phase.prediction.confidence === 'high' ? 'bg-green-500/20 text-green-400' :
                                phase.prediction.confidence === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                {phase.prediction.confidence}
                              </span>
                            </td>
                            <td className="py-3 md:py-4 px-2 md:px-4 text-gray-400 text-xs md:text-base hidden xl:table-cell max-w-xs">
                              {phase.prediction.description}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4 text-sm md:text-base">
              Tidak ada New Moon atau Full Moon di bulan ini
            </p>
          )}
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 md:p-6 border border-purple-500/20">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-center">
            {months[selectedMonth]} {selectedYear}
          </h2>
          
          <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-gray-400 font-medium py-1 md:py-2 text-xs md:text-base">
                <span className="hidden sm:inline">{day}</span>
                <span className="sm:hidden">{day.charAt(0)}</span>
              </div>
            ))}
          </div>
          
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-1 md:gap-2 mb-1 md:mb-2">
              {week.map((day, dayIndex) => {
                if (!day) {
                  return <div key={dayIndex} className="aspect-square" />;
                }
                
                const prediction = predictions[day.day];
                const Icon = prediction?.icon;
                const isSpecialPhase = day.phase === 0 || day.phase === 4;
                
                return (
                  <div
                    key={dayIndex}
                    className={`aspect-square rounded-lg p-1 md:p-2 flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer ${
                      isSpecialPhase 
                        ? 'bg-purple-600/30 border-2 border-purple-400' 
                        : 'bg-slate-700/50 border border-slate-600'
                    }`}
                  >
                    <div className="text-white font-medium text-xs md:text-sm mb-0.5 md:mb-1">
                      {day.day}
                    </div>
                    <div className="text-lg md:text-2xl mb-0.5 md:mb-1">
                      {day.emoji}
                    </div>
                    {Icon && (
                      <Icon className={`w-3 h-3 md:w-4 md:h-4 ${prediction.color}`} />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-4 md:mt-6 bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-purple-500/20">
          <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">Legend</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-300 text-sm md:text-base">Bullish Trend</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 md:w-5 md:h-5 text-red-500 flex-shrink-0" />
              <span className="text-gray-300 text-sm md:text-base">Bearish Trend</span>
            </div>
            <div className="flex items-center gap-2">
              <Minus className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 flex-shrink-0" />
              <span className="text-gray-300 text-sm md:text-base">Neutral/Consolidation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-purple-400 rounded flex-shrink-0" />
              <span className="text-gray-300 text-sm md:text-base">New/Full Moon</span>
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-6 bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-3 md:p-4">
          <p className="text-yellow-200 text-xs md:text-sm text-center">
            ⚠️ Disclaimer: Prediksi ini hanya untuk tujuan edukasi dan hiburan. 
            Selalu lakukan riset sendiri (DYOR) sebelum melakukan investasi cryptocurrency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoonCryptoCalendar;