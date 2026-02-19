'use client';

import { useState } from 'react';
import CryptoChart from '../components/CryptoChart';

export default function WCLPage() {
  const currentYear = new Date().getFullYear();
  const [selectedRange, setSelectedRange] = useState(`${currentYear}`);
  const startYear = 2018;
  const endYear = 2030;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  const getYearRange = (val) => {
    if (val.includes('-')) {
      const [start, end] = val.split('-').map(Number);
      return { start, end };
    }
    return { start: Number(val), end: Number(val) };
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg">
            📈 Weekly Cycle Low Chart
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Bitcoin Price dengan Range Box Tanggal Penting
          </p>
          <p className="text-sm md:text-base text-white/70 mt-2">
            Data real-time dari CryptoCompare API
          </p>
        </div>

        {/* Year Filter */}
        <div className="flex justify-center mb-6">
          <div className="bg-slate-800/80 backdrop-blur rounded-lg p-2 border border-purple-500/30">
            <label className="text-purple-200 mr-2 font-medium">Filter Tahun:</label>
            <select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="bg-slate-700 text-white rounded px-3 py-1 border border-purple-500/50 focus:outline-none focus:border-purple-400"
            >
              {years.map(year => (
                <optgroup key={year} label={`${year}`}>
                  <option value={`${year}`}>{year}</option>
                  {year < endYear && (
                    <option value={`${year}-${year + 1}`}>{year}-{year + 1}</option>
                  )}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 md:mt-6 bg-purple-900/20 border border-purple-500/30 rounded-xl p-3 md:p-4 mb-6">
          <p className="text-purple-200 text-xs md:text-sm text-center">
            ✨ <strong>New Feature:</strong> Prediksi WCL sekarang <strong>Otomatis & Dinamis</strong>! Sistem akan mendeteksi Major Low terakhir dan memproyeksikan window 28 minggu ke depan.
            <br className="hidden md:block" />
            <span className="opacity-70 mt-1 inline-block">DCL & YCL masih dalam tahap pengembangan.</span>
          </p>
        </div>

        <CryptoChart mode="wcl" yearRange={getYearRange(selectedRange)} />

        {/* Explanation Section */}
        <div className="mt-12 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-purple-500/20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Cara Membaca Chart WCL
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-2">
                  📦 Range Box dengan Border Solid
                </h3>
                <p className="text-gray-300">
                  Menunjukkan periode dengan data historis real. Area ini menandakan window penting
                  berdasarkan cycle theory untuk monitoring pergerakan harga.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-2">
                  📦 Range Box dengan Border Putus-putus
                </h3>
                <p className="text-gray-300">
                  Menunjukkan periode masa depan (future projection). Ini adalah window prediksi
                  berdasarkan cycle theory untuk antisipasi pergerakan harga.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-2">
                  🎯 Periode WCL (28 minggu)
                </h3>
                <p className="text-gray-300">
                  Weekly Cycle Low muncul setiap 28 minggu (196 hari). Perhatikan area range box untuk
                  mengidentifikasi potential entry/exit points berdasarkan teori siklus.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-2">
                  ⚠️ Aturan Penting
                </h3>
                <p className="text-gray-300">
                  Tidak boleh ada weekly candle yang close di bawah WCL. Jika terjadi,
                  ini bisa menjadi indikasi perubahan trend atau dimulainya bear market.
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-8 md:mt-12 text-center text-white/70 text-sm">
          <p>Real-time Bitcoin price data powered by CryptoCompare</p>
          <p className="mt-1">© 2026 Crypto Cycle Analyzer</p>
        </footer>
      </div>
    </main>
  );
}