'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, Calendar, Info, Zap } from 'lucide-react';

interface CyclePhase {
  no: number;
  from: string;
  to: string;
  duration: number;
  date: string;
  type: 'ATH' | 'ATL';
  description: string;
  year: number;
}

const CYCLE_DATA: CyclePhase[] = [
  { no: 1, from: 'ATL 2015', to: 'ATH 2017', duration: 1064, date: '17 Des 2017', type: 'ATH', description: 'Puncak bull run 2017', year: 2017 },
  { no: 2, from: 'ATH 2017', to: 'ATL 2018', duration: 364, date: '16 Des 2018', type: 'ATL', description: 'Bear market selesai', year: 2018 },
  { no: 3, from: 'ATL 2018', to: 'ATH 2021', duration: 1064, date: '10 Nov 2021', type: 'ATH', description: 'Puncak bull run 2021', year: 2021 },
  { no: 4, from: 'ATH 2021', to: 'ATL 2022', duration: 364, date: '9 Nov 2022', type: 'ATL', description: 'Bear phase 2022', year: 2022 },
  { no: 5, from: 'ATL 2022', to: 'ATH 2025', duration: 1064, date: '6 Okt 2025', type: 'ATH', description: 'Prediksi puncak siklus saat ini', year: 2025 },
  { no: 6, from: 'ATH 2025', to: 'ATL 2026', duration: 364, date: '4 Okt 2026', type: 'ATL', description: 'Bear market berikutnya', year: 2026 },
  { no: 7, from: 'ATL 2026', to: 'ATH 2029', duration: 1064, date: '3 Okt 2029', type: 'ATH', description: 'Bull run baru', year: 2029 },
  { no: 8, from: 'ATH 2029', to: 'ATL 2030', duration: 364, date: '2 Okt 2030', type: 'ATL', description: 'Koreksi besar', year: 2030 },
  { no: 9, from: 'ATL 2030', to: 'ATH 2033', duration: 1064, date: '1 Okt 2033', type: 'ATH', description: 'Siklus bull selanjutnya', year: 2033 },
  { no: 10, from: 'ATH 2033', to: 'ATL 2034', duration: 364, date: '30 Sep 2034', type: 'ATL', description: 'Bear singkat', year: 2034 },
  { no: 11, from: 'ATL 2034', to: 'ATH 2037', duration: 1064, date: '29 Sep 2037', type: 'ATH', description: 'Bull run kuat', year: 2037 },
  { no: 12, from: 'ATH 2037', to: 'ATL 2038', duration: 364, date: '27 Sep 2038', type: 'ATL', description: 'Koreksi', year: 2038 },
  { no: 13, from: 'ATL 2038', to: 'ATH 2041', duration: 1064, date: '26 Sep 2041', type: 'ATH', description: 'Bull market', year: 2041 },
  { no: 14, from: 'ATH 2041', to: 'ATL 2042', duration: 364, date: '25 Sep 2042', type: 'ATL', description: 'Bear market', year: 2042 },
  { no: 15, from: 'ATL 2042', to: 'ATH 2045', duration: 1064, date: '24 Sep 2045', type: 'ATH', description: 'Bull run berikutnya', year: 2045 },
  { no: 16, from: 'ATH 2045', to: 'ATL 2046', duration: 364, date: '23 Sep 2046', type: 'ATL', description: 'Koreksi', year: 2046 },
  { no: 17, from: 'ATL 2046', to: 'ATH 2049', duration: 1064, date: '22 Sep 2049', type: 'ATH', description: 'Bull market', year: 2049 },
  { no: 18, from: 'ATH 2049', to: 'ATL 2050', duration: 364, date: '21 Sep 2050', type: 'ATL', description: 'Bear phase', year: 2050 },
];

export default function ATHATLCyclePage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const currentYear = 2026;

  // Get unique years for ATH and ATL
  const athYears = CYCLE_DATA.filter(c => c.type === 'ATH').map(c => c.year);
  const atlYears = CYCLE_DATA.filter(c => c.type === 'ATL').map(c => c.year);

  // Filter data based on selected year
  const filteredData = selectedYear 
    ? CYCLE_DATA.filter(c => c.year === selectedYear)
    : CYCLE_DATA;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-10 h-10 md:w-12 md:h-12 text-yellow-400" />
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
              ATH-ATL Bitcoin Cycle
            </h1>
            <Zap className="w-10 h-10 md:w-12 md:h-12 text-yellow-400" />
          </div>
          <p className="text-lg md:text-xl text-gray-300 mb-2">
            Pola Siklus Bitcoin 2015 - 2050
          </p>
          <p className="text-sm md:text-base text-gray-400">
            Berdasarkan pola historis: ATL → ATH (1064 hari) | ATH → ATL (364 hari)
          </p>
        </div>

        {/* Pattern Info Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8 border border-purple-500/20">
          <div className="flex items-start gap-4 mb-6">
            <Info className="w-8 h-8 text-purple-400 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Pola Waktu Berdasarkan Data Historis</h2>
              <p className="text-gray-300 mb-4">
                Analisis pola siklus Bitcoin menunjukkan konsistensi timing yang mengikuti pola matematis:
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-8 h-8 text-green-400" />
                <h3 className="text-xl font-bold text-green-300">ATL → ATH (Bull Run)</h3>
              </div>
              <div className="space-y-2 text-gray-300">
                <p className="text-3xl font-bold text-green-400">1064 hari</p>
                <p className="text-lg">≈ 2.9 tahun</p>
                <div className="mt-4 space-y-1 text-sm">
                  <p>✓ ATL 2015 → ATH 2017 = 1064d</p>
                  <p>✓ ATL 2018 → ATH 2021 = 1064d</p>
                  <p>✓ ATL 2022 → ATH 2025 = 1064d</p>
                </div>
              </div>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <TrendingDown className="w-8 h-8 text-red-400" />
                <h3 className="text-xl font-bold text-red-300">ATH → ATL (Bear Market)</h3>
              </div>
              <div className="space-y-2 text-gray-300">
                <p className="text-3xl font-bold text-red-400">364 hari</p>
                <p className="text-lg">≈ 1 tahun</p>
                <div className="mt-4 space-y-1 text-sm">
                  <p>✓ ATH 2017 → ATL 2018 = 364d</p>
                  <p>✓ ATH 2021 → ATL 2022 = 364d</p>
                  <p>✓ ATH 2025 → ATL 2026 = 364d (prediksi)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-purple-900/20 border border-purple-500/30 rounded-xl p-4">
            <p className="text-purple-200 text-sm text-center">
              <strong>Total Siklus:</strong> 1064 + 364 = 1428 hari ≈ <strong>4 tahun</strong> 
              (3 tahun naik + 1 tahun turun)
            </p>
          </div>
        </div>

        {/* Filter by Year */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 md:p-4 mb-6 border border-purple-500/20">
          <div className="flex flex-wrap gap-2 items-center justify-center">
            <button
              onClick={() => setSelectedYear(null)}
              className={`px-3 py-2 text-sm md:text-base md:px-4 rounded-lg font-medium transition-all ${
                selectedYear === null
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              Semua
            </button>
            {[...new Set(CYCLE_DATA.map(c => c.year))].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-2 text-sm md:text-base md:px-4 rounded-lg font-medium transition-all ${
                  selectedYear === year
                    ? 'bg-purple-600 text-white shadow-lg'
                    : year <= currentYear
                    ? 'bg-blue-900/50 text-blue-200 hover:bg-blue-800/50'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 mb-8 border border-purple-500/20">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6 text-center">
            Timeline Siklus Bitcoin
          </h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-green-500 via-purple-500 to-red-500"></div>
            
            {/* Timeline Events */}
            <div className="space-y-4 md:space-y-6">
              {filteredData.map((cycle, index) => {
                const isATH = cycle.type === 'ATH';
                const isPast = cycle.year <= currentYear;
                const isCurrent = cycle.year === currentYear;
                
                return (
                  <div key={cycle.no} className="relative pl-12 md:pl-20">
                    {/* Timeline Dot */}
                    <div className={`absolute left-2.5 md:left-6 top-4 md:top-6 w-3 h-3 md:w-5 md:h-5 rounded-full border-2 md:border-4 ${
                      isATH 
                        ? 'bg-green-400 border-green-600' 
                        : 'bg-red-400 border-red-600'
                    } ${isCurrent ? 'ring-2 md:ring-4 ring-yellow-400 animate-pulse' : ''}`}></div>
                    
                    {/* Event Card */}
                    <div className={`bg-gradient-to-r ${
                      isATH
                        ? 'from-green-900/30 to-green-800/20 border-green-500/30'
                        : 'from-red-900/30 to-red-800/20 border-red-500/30'
                    } border rounded-xl p-3 md:p-4 lg:p-6 transition-all hover:scale-[1.01] md:hover:scale-[1.02] ${
                      isCurrent ? 'ring-1 md:ring-2 ring-yellow-400 shadow-xl shadow-yellow-400/20' : ''
                    } ${!isPast ? 'opacity-70' : ''}`}>
                      <div className="flex flex-col gap-3 md:gap-4">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              {isATH ? (
                                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-400 flex-shrink-0" />
                              ) : (
                                <TrendingDown className="w-5 h-5 md:w-6 md:h-6 text-red-400 flex-shrink-0" />
                              )}
                              <h3 className={`text-base md:text-xl lg:text-2xl font-bold ${
                                isATH ? 'text-green-300' : 'text-red-300'
                              }`}>
                                {cycle.from} → {cycle.to}
                              </h3>
                            </div>
                            <div className="flex gap-2">
                              {isCurrent && (
                                <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded inline-block">
                                  SEKARANG
                                </span>
                              )}
                              {!isPast && (
                                <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded inline-block">
                                  PREDIKSI
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-sm md:text-base text-gray-300 mb-2">{cycle.description}</p>
                          <div className="flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm">
                            <span className="flex items-center gap-1 text-gray-400">
                              <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                              {cycle.date}
                            </span>
                            <span className="text-purple-300 font-semibold">
                              {cycle.duration} hari ({(cycle.duration / 365).toFixed(1)} tahun)
                            </span>
                          </div>
                        </div>
                        <div className={`text-center px-4 py-2 md:px-6 md:py-3 rounded-lg ${
                          isATH
                            ? 'bg-green-500/20 border border-green-500/40'
                            : 'bg-red-500/20 border border-red-500/40'
                        }`}>
                          <div className="text-xs text-gray-400 mb-1">Tahun</div>
                          <div className={`text-2xl md:text-3xl font-bold ${
                            isATH ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {cycle.year}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <h3 className="text-xl font-bold text-white">Total ATH</h3>
            </div>
            <p className="text-4xl font-bold text-green-400 mb-2">{athYears.length}</p>
            <p className="text-sm text-gray-300">Puncak bull run (2015-2050)</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {athYears.map(year => (
                <span key={year} className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded">
                  {year}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900/50 to-red-800/30 border border-red-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <TrendingDown className="w-8 h-8 text-red-400" />
              <h3 className="text-xl font-bold text-white">Total ATL</h3>
            </div>
            <p className="text-4xl font-bold text-red-400 mb-2">{atlYears.length}</p>
            <p className="text-sm text-gray-300">Dasar bear market (2015-2050)</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {atlYears.map(year => (
                <span key={year} className="bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded">
                  {year}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-8 h-8 text-purple-400" />
              <h3 className="text-xl font-bold text-white">Total Siklus</h3>
            </div>
            <p className="text-4xl font-bold text-purple-400 mb-2">9</p>
            <p className="text-sm text-gray-300">Siklus lengkap (≈4 tahun/siklus)</p>
            <div className="mt-3">
              <p className="text-xs text-gray-400">2015-2018, 2018-2022, 2022-2026, 2026-2030, 2030-2034, 2034-2038, 2038-2042, 2042-2046, 2046-2050</p>
            </div>
          </div>
        </div>

        {/* Quote from Image */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-purple-500/20 mb-8">
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-purple-300 mb-4 italic">
              "The pattern would print this cycle's ATH on the 6th of October 2025."
            </p>
            <p className="text-lg text-gray-300">
              People want to believe otherwise but the simulation will repeat itself.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              - Analisis pola siklus berdasarkan data historis
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4">
          <p className="text-yellow-200 text-xs md:text-sm text-center">
            ⚠️ <strong>Disclaimer:</strong> Prediksi ini berdasarkan pola historis dan tidak menjamin hasil masa depan. 
            Past performance does not guarantee future results. Cryptocurrency adalah investasi berisiko tinggi. 
            Selalu lakukan riset sendiri (DYOR) sebelum membuat keputusan investasi.
          </p>
        </div>
      </div>
    </div>
  );
}