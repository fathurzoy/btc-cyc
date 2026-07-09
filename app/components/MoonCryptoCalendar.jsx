'use client';
import React, { useState, useMemo } from 'react';
import { Moon, Sun, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import astronomyData from '../data/astronomy-events.json';

const phaseMeta = {
  'New Moon': {
    emoji: '🌑',
    phaseType: 'New Moon',
    trend: 'bearish',
    action: 'Wait / akumulasi kecil',
    confidence: 'medium',
    description: 'New Moon: awal siklus bulan. Bias market dibuat defensif/akumulasi karena sering dibaca sebagai fase reset sebelum momentum baru terbentuk.',
    icon: TrendingDown,
    color: 'text-red-400',
  },
  'Waxing Crescent': {
    emoji: '🌒',
    phaseType: 'Moon Phase',
    trend: 'neutral',
    action: 'Pantau recovery',
    confidence: 'low',
    description: 'Moon phase transisi setelah New Moon. Bias mulai recovery, tapi belum cukup kuat untuk sinyal buy agresif.',
    icon: Minus,
    color: 'text-yellow-400',
  },
  'First Quarter': {
    emoji: '🌓',
    phaseType: 'Half Moon / First Quarter',
    trend: 'bullish',
    action: 'Buy breakout / hold',
    confidence: 'medium',
    description: 'Half Moon / First Quarter: separuh bulan terang. Bias bullish continuation jika harga berhasil breakout atau membentuk higher-high.',
    icon: TrendingUp,
    color: 'text-green-400',
  },
  'Waxing Gibbous': {
    emoji: '🌔',
    phaseType: 'Moon Phase',
    trend: 'bullish',
    action: 'Hold / ikut momentum',
    confidence: 'low',
    description: 'Moon phase menjelang Full Moon. Bias masih naik karena momentum menuju fase puncak, tapi jangan FOMO dekat resistance.',
    icon: TrendingUp,
    color: 'text-green-500',
  },
  'Full Moon': {
    emoji: '🌕',
    phaseType: 'Full Moon',
    trend: 'bullish',
    action: 'Hold / take profit bertahap',
    confidence: 'medium',
    description: 'Full Moon: bulan penuh. Bias bullish/peak energy; cocok untuk ikut momentum, tapi mulai siapkan take profit karena risiko puncak lokal meningkat.',
    icon: TrendingUp,
    color: 'text-green-500',
  },
  'Waning Gibbous': {
    emoji: '🌖',
    phaseType: 'Moon Phase',
    trend: 'neutral',
    action: 'Take profit / wait',
    confidence: 'low',
    description: 'Moon phase setelah Full Moon. Bias mulai konsolidasi; momentum naik bisa melemah, jadi lebih aman kurangi risiko bertahap.',
    icon: Minus,
    color: 'text-yellow-500',
  },
  'Last Quarter': {
    emoji: '🌗',
    phaseType: 'Half Moon / Last Quarter',
    trend: 'bearish',
    action: 'Sell bounce / wait',
    confidence: 'medium',
    description: 'Half Moon / Last Quarter: separuh bulan terang di fase turun. Bias bearish/correction sampai market membentuk support baru.',
    icon: TrendingDown,
    color: 'text-red-400',
  },
  'Waning Crescent': {
    emoji: '🌘',
    phaseType: 'Moon Phase',
    trend: 'bearish',
    action: 'Wait / cari bottom',
    confidence: 'low',
    description: 'Moon phase akhir sebelum New Moon. Bias bearish melemah; mulai pantau bottom, tapi belum otomatis buy.',
    icon: TrendingDown,
    color: 'text-red-500',
  },
};

const moonQuarterEvents = astronomyData.moonPhases.map(event => {
  const date = new Date(event.at);

  return {
    ...event,
    date,
    year: date.getUTCFullYear(),
    month: date.getUTCMonth(),
    day: date.getUTCDate(),
    time: date.toISOString().slice(11, 16),
  };
});

const phaseBetweenQuarters = (quarter) => {
  switch (quarter) {
    case 0: return 'Waxing Crescent';
    case 1: return 'Waxing Gibbous';
    case 2: return 'Waning Gibbous';
    case 3: return 'Waning Crescent';
    default: return 'Waning Crescent';
  }
};

const getDailyPhaseName = (date, eventForDay) => {
  if (eventForDay) return eventForDay.phase;

  const utcNoon = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 12);
  const previousEvent = moonQuarterEvents
    .filter(event => event.date.getTime() <= utcNoon)
    .at(-1);

  return phaseBetweenQuarters(previousEvent?.quarter ?? 3);
};

const MoonCryptoCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 25 }, (_, i) => 2016 + i);

  const moonPhases = useMemo(() => (
    moonQuarterEvents
      .filter(event => event.year === selectedYear && event.month === selectedMonth)
      .map(event => ({
        date: event.day,
        time: event.time,
        phaseName: event.phase,
        emoji: phaseMeta[event.phase].emoji,
        prediction: phaseMeta[event.phase],
        phaseType: phaseMeta[event.phase].phaseType,
      }))
  ), [selectedMonth, selectedYear]);

  const calendar = useMemo(() => {
    const firstDay = new Date(Date.UTC(selectedYear, selectedMonth, 1));
    const lastDay = new Date(Date.UTC(selectedYear, selectedMonth + 1, 0));
    const daysInMonth = lastDay.getUTCDate();
    const startingDayOfWeek = firstDay.getUTCDay();
    const calendarData = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarData.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(Date.UTC(selectedYear, selectedMonth, day, 12));
      const eventForDay = moonQuarterEvents.find(
        event => event.year === selectedYear && event.month === selectedMonth && event.day === day
      );
      const phaseName = getDailyPhaseName(date, eventForDay);

      calendarData.push({
        day,
        date,
        phaseName,
        isKeyPhase: Boolean(eventForDay),
        time: eventForDay?.time,
        prediction: phaseMeta[phaseName],
        phaseType: phaseMeta[phaseName].phaseType,
      });
    }

    return calendarData;
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
            Kalender fase bulan berbasis ephemeris UTC + bias trading lunar
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
                        <th className="text-left text-gray-300 py-2 md:py-3 px-2 md:px-4 text-xs md:text-base hidden md:table-cell">Tipe Fase</th>
                        <th className="text-left text-gray-300 py-2 md:py-3 px-2 md:px-4 text-xs md:text-base">Prediksi</th>
                        <th className="text-left text-gray-300 py-2 md:py-3 px-2 md:px-4 text-xs md:text-base">Aksi</th>
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
                                {months[selectedMonth]} {phase.date} · {phase.time} UTC
                              </span>
                            </td>
                            <td className="py-3 md:py-4 px-2 md:px-4">
                              <div className="flex items-center gap-1 md:gap-2">
                                <span className="text-2xl md:text-3xl">{phase.emoji}</span>
                                <span className="text-gray-300 text-xs md:text-base hidden sm:inline">{phase.phaseName}</span>
                              </div>
                            </td>
                            <td className="py-3 md:py-4 px-2 md:px-4 hidden md:table-cell">
                              <span className="px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-purple-500/20 text-purple-300 whitespace-nowrap">
                                {phase.phaseType}
                              </span>
                            </td>
                            <td className="py-3 md:py-4 px-2 md:px-4">
                              <div className="flex items-center gap-1 md:gap-2">
                                <Icon className={`w-4 h-4 md:w-5 md:h-5 ${phase.prediction.color}`} />
                                <span className={`font-medium capitalize ${phase.prediction.color} text-xs md:text-base`}>
                                  {phase.prediction.trend}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 md:py-4 px-2 md:px-4 text-white text-xs md:text-base whitespace-nowrap">
                              {phase.prediction.action}
                            </td>
                            <td className="py-3 md:py-4 px-2 md:px-4 hidden lg:table-cell">
                              <span className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
                                phase.prediction.confidence === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-blue-500/20 text-blue-400'
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
              Tidak ada quarter moon event di bulan ini
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
                
                const prediction = day.prediction;
                const Icon = prediction.icon;
                
                return (
                  <div
                    key={dayIndex}
                    className={`aspect-square rounded-lg p-1 md:p-2 flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer ${
                      day.isKeyPhase 
                        ? 'bg-purple-600/30 border-2 border-purple-400' 
                        : 'bg-slate-700/50 border border-slate-600'
                    }`}
                    title={`${day.phaseType}: ${day.phaseName}${day.time ? ` · ${day.time} UTC` : ''}. ${prediction.trend} — ${prediction.action}`}
                  >
                    <div className="text-white font-medium text-xs md:text-sm mb-0.5 md:mb-1">
                      {day.day}
                    </div>
                    <div className="text-lg md:text-2xl mb-0.5 md:mb-1">
                      {prediction.emoji}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4">
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
              <span className="text-gray-300 text-sm md:text-base">Quarter Moon Event</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="bg-slate-700/40 rounded-lg p-3 border border-slate-600">
              <p className="text-purple-300 font-semibold mb-1">New Moon / Full Moon</p>
              <p className="text-gray-300">Fase utama: bulan baru dan bulan penuh. Dipakai sebagai titik siklus paling kuat.</p>
            </div>
            <div className="bg-slate-700/40 rounded-lg p-3 border border-slate-600">
              <p className="text-purple-300 font-semibold mb-1">Half Moon / Quarter</p>
              <p className="text-gray-300">First Quarter dan Last Quarter. Secara visual bulan terlihat setengah.</p>
            </div>
            <div className="bg-slate-700/40 rounded-lg p-3 border border-slate-600">
              <p className="text-purple-300 font-semibold mb-1">Moon Phase</p>
              <p className="text-gray-300">Fase transisi seperti crescent dan gibbous, biasanya lebih rendah confidence-nya.</p>
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-6 bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-3 md:p-4">
          <p className="text-yellow-200 text-xs md:text-sm text-center">
            ⚠️ Disclaimer: Sinyal fase bulan adalah bias timing, bukan kepastian arah harga. 
            Entry tetap perlu konfirmasi chart, risk management, dan DYOR.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoonCryptoCalendar;
