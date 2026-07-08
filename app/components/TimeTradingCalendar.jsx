'use client';

import React, { useState, useEffect } from 'react';
import { Star, TrendingUp, TrendingDown, Calendar, Info } from 'lucide-react';
import astronomyData from '../data/astronomy-events.json';

const TimeTradingCalendar = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [apogeeData, setApogeeData] = useState([]);
  const [calendar, setCalendar] = useState([]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 17 }, (_, i) => 2024 + i);

  useEffect(() => {
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const allData = astronomyData.apsides
      .map(event => ({ event, date: new Date(event.at) }))
      .filter(({ date }) => date.getUTCFullYear() === selectedYear && date.getUTCMonth() === selectedMonth)
      .map(({ event, date }) => ({
        year: selectedYear,
        month: selectedMonth,
        day: date.getUTCDate(),
        type: event.kind === 'apogee' ? 'Apogee' : 'Perigee',
        description: event.kind === 'apogee'
          ? 'Jarak Bulan maksimum dari pusat Bumi (peristiwa astronomi)'
          : 'Jarak Bulan minimum dari pusat Bumi (peristiwa astronomi)',
        confidence: 'ephemeris',
        distance: `${event.distanceKm.toLocaleString('en-US')} km`,
        verified: true,
      }));

    setApogeeData(allData.sort((a, b) => a.day - b.day));

    const calendarData = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarData.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const event = allData.find(d => d.day === day);
      calendarData.push({
        day,
        date: new Date(selectedYear, selectedMonth, day),
        event
      });
    }

    setCalendar(calendarData);
  }, [selectedMonth, selectedYear]);

  const getEventColor = (type) => {
    if (type?.includes('Apogee') || type?.includes('Bottom') || type?.includes('Support')) {
      return 'text-green-400';
    } else if (type?.includes('Perigee') || type?.includes('Top') || type?.includes('High')) {
      return 'text-red-400';
    }
    return 'text-yellow-400';
  };

  const getEventBg = (type) => {
    if (type?.includes('Apogee') || type?.includes('Bottom') || type?.includes('Support')) {
      return 'bg-green-900/30 border-green-500/50';
    } else if (type?.includes('Perigee') || type?.includes('Top') || type?.includes('High')) {
      return 'bg-red-900/30 border-red-500/50';
    }
    return 'bg-yellow-900/30 border-yellow-500/50';
  };

  const getEventIcon = (type) => {
    if (type?.includes('Apogee') || type?.includes('Bottom') || type?.includes('Support')) {
      return <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-400" />;
    } else if (type?.includes('Perigee') || type?.includes('Top') || type?.includes('High')) {
      return <TrendingDown className="w-4 h-4 md:w-5 md:h-5 text-red-400" />;
    }
    return <Star className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />;
  };

  const weeks = [];
  for (let i = 0; i < calendar.length; i += 7) {
    weeks.push(calendar.slice(i, i + 7));
  }

  const today = new Date();
  const isCurrentMonth = selectedYear === today.getFullYear() && selectedMonth === today.getMonth();
  const currentDay = today.getDate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
            <Star className="w-8 h-8 md:w-10 md:h-10 text-purple-400" />
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Time Trading Calendar - Astronacci
            </h1>
            <Calendar className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />
          </div>
          <p className="text-gray-300 text-sm md:text-lg px-4">
            Kalender ephemeris Apogee–Perigee Bulan (UTC) — 2024–2040
          </p>
        </div>

        <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 backdrop-blur-sm rounded-xl p-4 md:p-6 mb-4 md:mb-6 border border-yellow-500/30">
          <h3 className="text-lg md:text-xl font-bold text-yellow-300 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 md:w-6 md:h-6" />
            Data Astronomi dan Hipotesis Time Trading
          </h3>
          <div className="space-y-3 text-gray-300 text-sm md:text-base">
            <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-3">
              <p className="font-semibold text-green-300 mb-1">
                📍 APOGEE (Bulan Jauh dari Bumi)
              </p>
              <p className="text-sm">
                Jarak maksimum Bulan dari pusat Bumi, dihitung dari ephemeris.
              </p>
              <p className="text-sm">
                <strong>Hipotesis market:</strong> sebagian trader memantau area ini sebagai kandidat swing low; bukan sinyal beli otomatis.
              </p>
              <p className="text-sm">
                Wajib diuji terhadap data harga dan dikonfirmasi dengan price action.
              </p>
              <p className="text-xs text-green-300 mt-2">
                Nilai jarak aktual ditampilkan untuk setiap kejadian.
              </p>
            </div>

            <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-3">
              <p className="font-semibold text-red-300 mb-1">
                📍 PERIGEE (Bulan Dekat dengan Bumi)
              </p>
              <p className="text-sm">
                Jarak minimum Bulan dari pusat Bumi, dihitung dari ephemeris.
              </p>
              <p className="text-sm">
                <strong>Hipotesis market:</strong> sebagian trader memantau area ini sebagai kandidat swing high; bukan sinyal jual otomatis.
              </p>
              <p className="text-sm">
                Arah pasar tidak diturunkan dari posisi Bulan oleh algoritma ini.
              </p>
            </div>

            <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-3">
              <p className="font-semibold text-purple-300 mb-1">⚠️ Catatan Penting:</p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• <strong>Badge Ephemeris:</strong> tanggal, waktu, dan jarak dihitung oleh Astronomy Engine.</li>
                <li>• <strong>Timezone:</strong> tanggal kalender menggunakan UTC agar konsisten di semua perangkat.</li>
                <li>• <strong>Presisi:</strong> tidak memakai interval rata-rata 27,55 hari atau anchor manual.</li>
                <li>• <strong>Konfirmasi Price Action:</strong> Harus ada candlestick pattern (pin bar, inside bar, ekor panjang)</li>
                <li>• <strong>Fungsi:</strong> event astronomi adalah data; pengaruh terhadap market masih hipotesis yang perlu backtest.</li>
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

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6 mb-4 md:mb-6 border border-purple-500/20">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
            <span className="text-sm md:text-2xl">Apogee-Perigee Points - {months[selectedMonth]} {selectedYear}</span>
          </h2>

          {apogeeData.length > 0 ? (
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-purple-500/30">
                        <th className="text-left text-gray-300 py-2 md:py-3 px-2 md:px-4 text-xs md:text-base">Tanggal</th>
                        <th className="text-left text-gray-300 py-2 md:py-3 px-2 md:px-4 text-xs md:text-base">Jenis</th>
                        <th className="text-left text-gray-300 py-2 md:py-3 px-2 md:px-4 text-xs md:text-base hidden lg:table-cell">Jarak Bulan</th>
                        <th className="text-left text-gray-300 py-2 md:py-3 px-2 md:px-4 text-xs md:text-base hidden lg:table-cell">Confidence</th>
                        <th className="text-left text-gray-300 py-2 md:py-3 px-2 md:px-4 text-xs md:text-base hidden xl:table-cell">Deskripsi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apogeeData.map((event, index) => (
                        <tr key={index} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                          <td className="py-3 md:py-4 px-2 md:px-4">
                            <span className="text-white font-medium text-xs md:text-base whitespace-nowrap">
                              {months[selectedMonth]} {event.day}
                              {event.verified && (
                                <span className="ml-2 text-[10px] bg-yellow-600/30 text-yellow-300 px-2 py-0.5 rounded-full">
                                  Ephemeris
                                </span>
                              )}
                            </span>
                          </td>
                          <td className="py-3 md:py-4 px-2 md:px-4">
                            <div className="flex items-center gap-1 md:gap-2">
                              {getEventIcon(event.type)}
                              <span className={`font-medium ${getEventColor(event.type)} text-xs md:text-base`}>
                                {event.type}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 md:py-4 px-2 md:px-4 hidden lg:table-cell">
                            <span className={`text-xs md:text-sm font-semibold ${event.type === 'Apogee' ? 'text-green-400' : 'text-red-400'
                              }`}>
                              {event.distance}
                            </span>
                          </td>
                          <td className="py-3 md:py-4 px-2 md:px-4 hidden lg:table-cell">
                            <span className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${event.confidence === 'high' ? 'bg-green-500/20 text-green-400' :
                                event.confidence === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-gray-500/20 text-gray-400'
                              }`}>
                              {event.confidence}
                            </span>
                          </td>
                          <td className="py-3 md:py-4 px-2 md:px-4 text-gray-400 text-xs md:text-base hidden xl:table-cell max-w-xs">
                            {event.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4 text-sm md:text-base">
              Tidak ada Apogee/Perigee point di bulan ini
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

                const hasEvent = day.event;
                const isToday = isCurrentMonth && day.day === currentDay;

                return (
                  <div
                    key={dayIndex}
                    className={`aspect-square rounded-lg p-1 md:p-2 flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer relative ${hasEvent
                        ? `border-2 ${getEventBg(day.event.type)}`
                        : 'bg-slate-700/50 border border-slate-600'
                      } ${isToday ? 'ring-2 ring-blue-400' : ''}`}
                    title={hasEvent ? `${day.event.type}: ${day.event.description}` : ''}
                  >
                    <div className={`font-medium text-xs md:text-sm mb-0.5 ${hasEvent ? getEventColor(day.event.type) : 'text-white'
                      }`}>
                      {day.day}
                    </div>
                    {hasEvent && (
                      <div className="flex flex-col items-center gap-0.5">
                        {getEventIcon(day.event.type)}
                        <div className={`text-[8px] md:text-[10px] text-center leading-tight ${getEventColor(day.event.type)}`}>
                              {hasEvent.type}
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

        <div className="mt-4 md:mt-6 bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-purple-500/20">
          <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">Legend</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-300 text-sm md:text-base">Apogee — jarak maksimum Bulan</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 md:w-5 md:h-5 text-red-500 flex-shrink-0" />
              <span className="text-gray-300 text-sm md:text-base">Perigee — jarak minimum Bulan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-blue-400 rounded-full flex-shrink-0" />
              <span className="text-gray-300 text-sm md:text-base">Today</span>
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-6 bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-3 md:p-4">
          <p className="text-yellow-200 text-xs md:text-sm text-center">
            Data astronomi dihitung menggunakan Astronomy Engine 2.1.19 dan disimpan sebagai ephemeris UTC.
            Korelasi dengan harga bukan hubungan sebab-akibat dan bukan rekomendasi transaksi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimeTradingCalendar;
