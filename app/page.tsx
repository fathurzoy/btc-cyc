import { TrendingUp, TrendingDown, Calendar, Moon, Sun, Target, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Crypto Cycle Theory
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Memahami Siklus Pasar Cryptocurrency untuk Strategi Investasi yang Lebih Baik
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/wcl"
                className="px-8 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/50 flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-5 h-5" />
                Lihat WCL Chart
              </Link>
              <Link
                href="/moon"
                className="px-8 py-4 bg-slate-700 text-white rounded-xl font-semibold hover:bg-slate-600 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Moon className="w-5 h-5" />
                Moon Phase Predictor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 md:py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Apa itu Cycle Theory?
          </h2>
          <div className="prose prose-invert prose-lg max-w-4xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Cycle Theory adalah pendekatan analisis pasar yang mengidentifikasi pola berulang dalam pergerakan harga cryptocurrency. 
              Teori ini membantu trader dan investor memahami kapan waktu terbaik untuk masuk atau keluar dari pasar.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Bitcoin dan cryptocurrency lainnya mengikuti siklus yang dapat diprediksi berdasarkan berbagai timeframe: 
              yearly, weekly, dan daily cycles. Dengan memahami siklus-siklus ini, kita dapat membuat keputusan investasi yang lebih informed.
            </p>
          </div>
        </div>
      </section>

      {/* Cycle Types */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Jenis-Jenis Cycle
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Yearly Cycle */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all">
              <div className="w-16 h-16 bg-purple-600/20 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Yearly Cycle Low (YCL)</h3>
              <p className="text-gray-300 mb-4">
                Siklus tahunan yang menjadi dasar dari semua siklus lainnya. YCL terakhir terjadi pada 21 November 2022 di harga ~$15,787.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Periode: 1 tahun</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Teori 4-year cycle: 2.5 tahun naik, 1.5 tahun turun</span>
                </li>
              </ul>
            </div>

            {/* Weekly Cycle */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all">
              <div className="w-16 h-16 bg-blue-600/20 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Weekly Cycle Low (WCL)</h3>
              <p className="text-gray-300 mb-4">
                Titik terendah dalam siklus mingguan yang muncul setiap 28-32 minggu pada grafik harga Bitcoin.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Periode: 28-32 minggu</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Tidak boleh ada candle close di bawah WCL</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Indikator utama perubahan tren</span>
                </li>
              </ul>
            </div>

            {/* Daily Cycle */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all">
              <div className="w-16 h-16 bg-indigo-600/20 rounded-xl flex items-center justify-center mb-6">
                <Sun className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Daily Cycle Low (DCL)</h3>
              <p className="text-gray-300 mb-4">
                Titik terendah di timeframe harian dengan periode 60 hari ± 1 minggu (53-67 hari).
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">•</span>
                  <span>Periode: 60 hari ± 1 minggu</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">•</span>
                  <span>Candle tidak boleh close di bawah DCL</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">•</span>
                  <span>Memperkuat signal bersama WCL</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Strategies */}
      <section className="py-16 md:py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Strategi Investasi Berdasarkan Cycle
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 90-10 Rule */}
            <div className="bg-gradient-to-br from-purple-900/50 to-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Aturan 90-10</h3>
              </div>
              <p className="text-gray-300 mb-4 text-lg">
                90% waktu untuk menunggu dan observasi, hanya 10% untuk entry dengan high conviction.
              </p>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-purple-500/20">
                <p className="text-purple-300 font-semibold">Key Points:</p>
                <ul className="mt-2 space-y-2 text-gray-400">
                  <li>• Sabar menunggu setup yang tepat</li>
                  <li>• Entry hanya saat sinyal kuat</li>
                  <li>• Avoid FOMO dan overtrading</li>
                </ul>
              </div>
            </div>

            {/* Bitcoin Dominance */}
            <div className="bg-gradient-to-br from-blue-900/50 to-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
                  <TrendingDown className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Bitcoin Dominance</h3>
              </div>
              <p className="text-gray-300 mb-4 text-lg">
                Persentase market cap BTC dari seluruh pasar crypto. Penurunan dominance = altcoin season.
              </p>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-blue-500/20">
                <p className="text-blue-300 font-semibold">Target Altcoin Season:</p>
                <ul className="mt-2 space-y-2 text-gray-400">
                  <li>• Ideal: Dominance turun ke 40%</li>
                  <li>• Minimal: Turun ke 54.5%</li>
                  <li>• Sinyal: ETH dan Solana mulai rally</li>
                </ul>
              </div>
            </div>

            {/* Risk Management */}
            <div className="bg-gradient-to-br from-red-900/50 to-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-red-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Risk Management</h3>
              </div>
              <p className="text-gray-300 mb-4 text-lg">
                Cut loss rule: Semakin besar rugi, semakin sulit recovery.
              </p>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-red-500/20">
                <p className="text-red-300 font-semibold">Recovery Difficulty:</p>
                <ul className="mt-2 space-y-2 text-gray-400">
                  <li>• Rugi 10% → Butuh gain 11%</li>
                  <li>• Rugi 25% → Butuh gain 33%</li>
                  <li>• Rugi 50% → Butuh gain 100%</li>
                </ul>
              </div>
            </div>

            {/* Moon Phase Strategy */}
            <div className="bg-gradient-to-br from-yellow-900/50 to-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-yellow-600 rounded-xl flex items-center justify-center">
                  <Moon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Moon Phase Analysis</h3>
              </div>
              <p className="text-gray-300 mb-4 text-lg">
                Prediksi pergerakan crypto berdasarkan fase bulan (correlation theory).
              </p>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-yellow-500/20">
                <p className="text-yellow-300 font-semibold">Pattern:</p>
                <ul className="mt-2 space-y-2 text-gray-400">
                  <li>• Full Moon: Peak bullish sentiment</li>
                  <li>• New Moon: Accumulation phase</li>
                  <li>• Check Moon Phase Predictor →</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Tanggal Penting dalam Chart
          </h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Range box pada WCL Chart menunjukkan periode-periode kritis berdasarkan cycle theory
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border-l-4 border-orange-500">
              <h4 className="text-xl font-bold text-white mb-2">Range 1: 1 Okt 2025 - 29 Okt 2025</h4>
              <p className="text-gray-400">Window retest period pertama</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border-l-4 border-orange-500">
              <h4 className="text-xl font-bold text-white mb-2">Range 2: 1 Apr 2026 - 1 Jun 2026</h4>
              <p className="text-gray-400">Periode WCL #4 expected</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border-l-4 border-orange-500">
              <h4 className="text-xl font-bold text-white mb-2">Range 3: 1 Okt 2026 - 31 Des 2026</h4>
              <p className="text-gray-400">Potential altcoin season window</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border-l-4 border-orange-500">
              <h4 className="text-xl font-bold text-white mb-2">Range 4: 1 Mar 2027 - 31 Mei 2027</h4>
              <p className="text-gray-400">Extended cycle monitoring period</p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-yellow-400 font-bold text-lg mb-2">⚠️ Disclaimer</h3>
                <p className="text-yellow-200 text-sm leading-relaxed">
                  Informasi yang disajikan di website ini hanya untuk tujuan edukasi dan hiburan. 
                  Bukan merupakan saran investasi atau financial advice. Cryptocurrency adalah aset berisiko tinggi. 
                  Selalu lakukan riset sendiri (DYOR) dan konsultasikan dengan financial advisor sebelum melakukan investasi. 
                  Past performance does not guarantee future results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}