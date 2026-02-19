'use client';

import { useState } from 'react';
import CryptoChart from '../components/CryptoChart';

export default function DCLPage() {
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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg">
            📉 Daily Cycle Low (DCL)
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Bitcoin Price dengan Range Box Harian (60 Hari)
          </p>
          <p className="text-sm md:text-base text-gray-500 mt-2">
            Data real-time dari CryptoCompare API
          </p>
        </div>

        {/* Year Filter */}
        <div className="flex justify-center mb-6">
          <div className="bg-slate-800/80 backdrop-blur rounded-lg p-2 border border-gray-600">
            <label className="text-gray-400 mr-2 font-medium">Filter Tahun:</label>
            <select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="bg-slate-700 text-white rounded px-3 py-1 border border-gray-500 focus:outline-none focus:border-gray-300"
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

        <div className="mt-4 md:mt-6 bg-gray-800/40 border border-gray-500/30 rounded-xl p-3 md:p-4 mb-6">
          <p className="text-gray-300 text-xs md:text-sm text-center">
            ℹ️ <strong>Info:</strong> DCL (Daily Cycle Low) muncul setiap <strong>±60 hari</strong>.
            Chart ini menampilkan proyeksi teoretis DCL (Abu-abu) untuk membantu identifikasi waktu beli jangka pendek.
            <br className="hidden md:block" />
            <span className="opacity-70 mt-1 inline-block">Gunakan filter tahun untuk melihat siklus di masa lalu atau masa depan.</span>
          </p>
        </div>

        <CryptoChart mode="dcl" yearRange={getYearRange(selectedRange)} />

        {/* Explanation Section */}
        <div className="mt-12 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-500/20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Cara Membaca Chart DCL
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  📦 Range Box Abu-abu
                </h3>
                <p className="text-gray-300">
                  Menunjukkan area waktu teoretis dimana Daily Cycle Low (DCL) diprediksi terjadi.
                  Interval antar box adalah sekitar 60 hari.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  🎯 Strategi DCL
                </h3>
                <p className="text-gray-300">
                  DCL adalah titik terendah dalam siklus harian. Biasanya digunakan untuk mencari
                  entry point jangka pendek atau menambah posisi (DCA) saat trend sedang bullish.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  ⏰ Waktu Siklus
                </h3>
                <p className="text-gray-300">
                  Siklus DCL berjalan lebih cepat daripada WCL. DCL seringkali terjadi di dalam
                  tengah perjalanan menuju WCL.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  ⚠️ Konfirmasi
                </h3>
                <p className="text-gray-300">
                  Selalu tunggu konfirmasi candle harian (Daily Close) yang kuat atau pola reversal
                  di dalam area box abu-abu sebelum mengambil keputusan.
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-8 md:mt-12 text-center text-white/50 text-sm">
          <p>Real-time Bitcoin price data powered by CryptoCompare</p>
          <p className="mt-1">© 2026 Crypto Cycle Analyzer</p>
        </footer>
      </div>
    </main>
  );
}
