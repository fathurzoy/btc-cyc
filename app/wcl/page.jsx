import CryptoChart from '../components/CryptoChart';

export default function WCLPage() {
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


        <div className="mt-4 md:mt-6 bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-3 md:p-4">
          <p className="text-yellow-200 text-xs md:text-sm text-center">
            ⚠️ Disclaimer: Masih dalam pengembangan, belum tau range pasti ketika WCL akan muncul, DCL belum ditambahkan, YCL belum ditambahkan. Saya perlu dcl wcl ycl minimal 4 data range yang udh kejadian dan 1 range data dimasadepan, Kalau ingin membantu saya, silahkan hubungi saya telegram di <a href="https://t.me/ozanoz007" className="underline font-semibold">@ozanoz007</a>
          </p>
        </div>
        
        <CryptoChart />

        
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
                  🎯 Periode WCL (28-32 minggu)
                </h3>
                <p className="text-gray-300">
                  Weekly Cycle Low muncul setiap 28-32 minggu. Perhatikan area range box untuk 
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