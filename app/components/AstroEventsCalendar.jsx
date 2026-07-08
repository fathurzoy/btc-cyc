'use client';

import React, { useState, useMemo } from 'react';
import { Star, Eclipse, Sun, Moon, Info } from 'lucide-react';
import astronomyData from '../data/astronomy-events.json';

const getMarketSignal = (type) => {
  if (type.includes('Solar Eclipse')) {
    return {
      bias: 'Bearish',
      action: 'Jual / kurangi risiko',
      confidence: 'Medium',
      description: 'Bias defensif: solar eclipse dipakai sebagai area volatilitas tinggi dan potensi tekanan turun. Cari konfirmasi breakdown sebelum entry sell.',
    };
  }

  if (type.includes('Lunar Eclipse')) {
    return {
      bias: 'Reversal',
      action: 'Tunggu konfirmasi',
      confidence: 'Low–Medium',
      description: 'Bias pembalikan: lunar eclipse lebih cocok sebagai zona reversal. Buy jika harga membentuk higher-low/support; sell jika gagal di resistance.',
    };
  }

  if (type.includes('Vernal Equinox') || type.includes('Winter Solstice')) {
    return {
      bias: 'Bullish',
      action: 'Beli bertahap',
      confidence: 'Low',
      description: 'Bias akumulasi/risk-on musiman. Lebih aman dipakai sebagai window buy bertahap setelah ada konfirmasi struktur naik.',
    };
  }

  if (type.includes('Summer Solstice') || type.includes('Autumnal Equinox')) {
    return {
      bias: 'Bearish',
      action: 'Jual / take profit',
      confidence: 'Low',
      description: 'Bias distribusi/risk-off musiman. Lebih aman dipakai sebagai window take profit atau sell setelah ada konfirmasi pelemahan.',
    };
  }

  return {
    bias: 'Neutral',
    action: 'Observasi',
    confidence: 'Low',
    description: 'Tidak ada bias market eksplisit. Gunakan hanya sebagai penanda waktu riset.',
  };
};

const astroData = astronomyData.events.map(event => {
  const date = new Date(event.at);
  const signal = getMarketSignal(event.type);

  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth(),
    day: date.getUTCDate(),
    time: date.toISOString().slice(11, 16),
    type: event.type,
    description: signal.description,
    bias: signal.bias,
    action: signal.action,
    confidence: signal.confidence,
    impact: signal.bias,
  };
});

const AstroEventsCalendar = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 7 }, (_, i) => 2024 + i);

  const getEventIcon = (type) => {
    if (type.includes('Solar')) return <Sun className="w-5 h-5 text-yellow-400" />;
    if (type.includes('Lunar')) return <Moon className="w-5 h-5 text-gray-300" />;
    return <Star className="w-5 h-5 text-purple-400" />;
  };

  const getEventColor = (impact) => {
    switch (impact) {
      case 'Bullish': return 'text-green-400';
      case 'Bearish': return 'text-red-400';
      case 'Reversal': return 'text-yellow-400';
      default: return 'text-blue-400';
    }
  };

  const getEventBg = (impact) => {
    switch (impact) {
      case 'Bullish': return 'bg-green-900/30 border-green-500/50';
      case 'Bearish': return 'bg-red-900/30 border-red-500/50';
      case 'Reversal': return 'bg-yellow-900/30 border-yellow-500/50';
      default: return 'bg-blue-900/30 border-blue-500/50';
    }
  };

  const calendarDays = useMemo(() => {
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const currentEvents = astroData.filter(
      d => d.year === selectedYear && d.month === selectedMonth
    );

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const eventsForDay = currentEvents.filter(e => e.day === day);
      days.push({
        day,
        events: eventsForDay.length > 0 ? eventsForDay : null
      });
    }

    return days;
  }, [selectedYear, selectedMonth]);

  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  const today = new Date();
  const isCurrentMonth = selectedYear === today.getFullYear() && selectedMonth === today.getMonth();
  const currentDay = today.getDate();

  const activeEvents = astroData.filter(d => d.year === selectedYear && d.month === selectedMonth).sort((a, b) => a.day - b.day);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
            <Eclipse className="w-8 h-8 md:w-10 md:h-10 text-purple-400" />
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Financial Astrology Calendar
            </h1>
            <Eclipse className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />
          </div>
          <p className="text-gray-300 text-sm md:text-lg px-4">
            Kalender gerhana, equinox, dan solstice berbasis ephemeris UTC (2024–2030) + bias bullish/bearish
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-xl p-4 md:p-6 mb-4 md:mb-6 border border-purple-500/30">
          <h3 className="text-lg md:text-xl font-bold text-purple-300 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 md:w-6 md:h-6" />
            Data Astronomi dan Interpretasi Market
          </h3>
          <div className="space-y-3 text-gray-300 text-sm md:text-base grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-4">
              <p className="font-semibold text-yellow-300 mb-2 flex items-center gap-2">
                <Sun className="w-4 h-4" /> Gerhana (Eclipses)
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-yellow-100/80">
                <li><strong>Solar Eclipse:</strong> bias bearish/defensif — jual atau kurangi risiko jika harga ikut breakdown.</li>
                <li><strong>Lunar Eclipse:</strong> bias reversal — buy di support atau sell di resistance, wajib tunggu konfirmasi harga.</li>
              </ul>
            </div>

            <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4">
              <p className="font-semibold text-red-300 mb-2">Batas Interpretasi</p>
              <p className="text-sm text-red-100/80">
                Sinyal ini adalah bias timing, bukan kepastian harga. Jangan entry hanya karena event astronomi; cocokkan dengan trend, support/resistance, dan candle confirmation.
              </p>
            </div>

            <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 md:col-span-2">
              <p className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                <Star className="w-4 h-4" /> Solar Seasons & Equinoxes
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-blue-100/80">
                <li><strong>Vernal Equinox & Winter Solstice:</strong> bias bullish — buy bertahap setelah struktur harga menguat.</li>
                <li><strong>Summer Solstice & Autumnal Equinox:</strong> bias bearish — jual/take profit setelah struktur harga melemah.</li>
                <li className="text-purple-300 mt-2 list-none">💡 <em>Gunakan sebagai filter waktu. Trigger tetap dari chart, bukan dari astrologi saja.</em></li>
              </ul>
            </div>
          </div>
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

        {activeEvents.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6 mb-4 md:mb-6 border border-purple-500/20">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
              <span className="text-sm md:text-2xl">Daftar Event - {months[selectedMonth]} {selectedYear}</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-purple-500/30">
                    <th className="text-left text-gray-300 py-3 px-4">Tanggal</th>
                    <th className="text-left text-gray-300 py-3 px-4">Event</th>
                    <th className="text-left text-gray-300 py-3 px-4">Bias</th>
                    <th className="text-left text-gray-300 py-3 px-4">Aksi</th>
                    <th className="text-left text-gray-300 py-3 px-4 hidden md:table-cell">Deskripsi & Prediksi Efek</th>
                  </tr>
                </thead>
                <tbody>
                  {activeEvents.map((event, idx) => (
                    <tr key={idx} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                      <td className="py-4 px-4 whitespace-nowrap text-white">
                        {event.day} {months[selectedMonth]} · {event.time} UTC
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {getEventIcon(event.type)}
                          <span className={`font-semibold ${getEventColor(event.impact)}`}>{event.type}</span>
                        </div>
                      </td>
                      <td className={`py-4 px-4 whitespace-nowrap font-bold ${getEventColor(event.impact)}`}>
                        {event.bias}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-white">
                        <div>{event.action}</div>
                        <div className="text-xs text-gray-400">Confidence: {event.confidence}</div>
                      </td>
                      <td className="py-4 px-4 text-gray-300 text-sm hidden md:table-cell">
                        {event.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

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
              {week.map((dayObj, dayIndex) => {
                if (!dayObj) return <div key={dayIndex} className="aspect-square" />;

                const hasEvents = dayObj.events && dayObj.events.length > 0;
                const topEvent = hasEvents ? dayObj.events[0] : null;
                const isToday = isCurrentMonth && dayObj.day === currentDay;

                return (
                  <div
                    key={dayIndex}
                    className={`aspect-square rounded-lg p-1 md:p-2 flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer relative ${hasEvents
                        ? `border-2 ${getEventBg(topEvent.impact)}`
                        : 'bg-slate-700/50 border border-slate-600'
                      } ${isToday ? 'ring-2 ring-blue-400' : ''}`}
                    title={hasEvents ? dayObj.events.map(e => `${e.type}: ${e.bias} — ${e.action}. ${e.description}`).join(' | ') : ''}
                  >
                    <div className={`font-medium text-xs md:text-sm mb-0.5 ${hasEvents ? getEventColor(topEvent.impact) : 'text-white'
                      }`}>
                      {dayObj.day}
                    </div>
                    {hasEvents && (
                      <div className="flex flex-col items-center gap-0.5">
                        {getEventIcon(topEvent.type)}
                        <div className={`text-[8px] md:text-[10px] text-center leading-tight hidden md:block ${getEventColor(topEvent.impact)}`}>
                          {topEvent.type.includes('Eclipse') ? 'Eclipse' : topEvent.type.includes('Retro') ? 'Retro' : 'Season'}
                        </div>
                      </div>
                    )}
                    {isToday && (
                      <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AstroEventsCalendar;
