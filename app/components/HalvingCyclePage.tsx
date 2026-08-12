'use client';

import { Rocket, AlertTriangle, TrendingDown, TrendingUp, Clock, Zap, Calendar, Info, Activity, AlertCircle, History, BarChart2 } from 'lucide-react';

interface HalvingPhase {
  id: number;
  phase: string;
  timeframe: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  details: string[];
  alert?: string;
}

const HALVING_PHASES: HalvingPhase[] = [
  {
    id: 1,
    phase: 'Pre-Halving Rally',
    timeframe: 'November (Tahun Sebelumnya) - Beberapa Minggu Sebelum Halving',
    icon: TrendingUp,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/40',
    description: 'Harga mulai merangkak naik karena antisipasi pasar terhadap berkurangnya supply baru. Hype halving mulai terbangun di kalangan investor.',
    details: [
      'Biasa dimulai sekitar bulan November tahun sebelum halving.',
      'Narasi "Halving is coming" mulai ramai dibicarakan di media sosial.',
      'Banyak investor mulai melakukan akumulasi karena takut ketinggalan (FOMO awal).'
    ],
  },
  {
    id: 2,
    phase: 'Pre-Halving Retrace (Koreksi)',
    timeframe: 'H-1 Minggu hingga Sekitar Waktu Halving',
    icon: TrendingDown,
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/40',
    description: 'Harga tiba-tiba anjlok saat mendekati hari H. Ini sering menjadi jebakan (bear trap) bagi retail yang FOMO di pucuk menjelang halving.',
    details: [
      'Terjadi fenomena klasik "Buy the rumor, sell the news".',
      'Koreksi bisa mencapai -15% hingga -30% dari titik tertinggi lokal.',
      'Banyak yang panik dan mengira bull market sudah berakhir.'
    ],
    alert: 'Awas! Jangan panik jual saat harga drop drastis tepat sebelum atau saat minggu-minggu halving.'
  },
  {
    id: 3,
    phase: 'Re-Accumulation (Konsolidasi)',
    timeframe: '1 - 5 Bulan Setelah Halving (Misal: Mei - September)',
    icon: Activity,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/40',
    description: 'Fase membosankan di mana harga bergerak sideways atau cenderung turun perlahan. Sering terasa seperti "bear market" mini (Summer Lull).',
    details: [
      'Banyak investor retail kehilangan kesabaran dan keluar dari market (Shakeout).',
      'Miner (penambang) besar menyesuaikan operasi mereka dengan block reward yang baru.',
      'Ini adalah zona akumulasi terakhir institusi sebelum harga benar-benar terbang.'
    ],
    alert: 'Fase ini sangat menguji mental. Harga terlihat lesu, tapi ini sering kali jadi kesempatan beli terbaik sebelum ledakan harga.'
  },
  {
    id: 4,
    phase: 'Parabolic Uptrend (Bull Run)',
    timeframe: 'Mulai Oktober / November Setelah Halving',
    icon: Rocket,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/40',
    description: 'Dampak nyata dari supply shock (berkurangnya aliran Bitcoin baru) akhirnya memicu ledakan harga yang luar biasa (Price Discovery).',
    details: [
      'Bitcoin menembus resisten kuat dan mencetak ATH (All Time High) sebelumnya.',
      'Media mainstream mulai memberitakan Bitcoin secara masif di mana-mana.',
      'Retail FOMO besar-besaran masuk ke market mendorong harga naik vertikal.'
    ],
    alert: 'Saat harga sudah naik vertikal dan orang-orang biasa mulai membicarakan kripto, mulailah rencanakan strategi take profit.'
  }
];

const HALVING_HISTORY = [
  { era: '1st Halving', date: '28 Nov 2012', reward: '25 BTC', block: '210,000' },
  { era: '2nd Halving', date: '9 Jul 2016', reward: '12.5 BTC', block: '420,000' },
  { era: '3rd Halving', date: '11 Mei 2020', reward: '6.25 BTC', block: '630,000' },
  { era: '4th Halving', date: '20 Apr 2024', reward: '3.125 BTC', block: '840,000' },
  { era: '5th Halving', date: 'Est. 2028', reward: '1.562 BTC', block: '1,050,000', isFuture: true },
];

export default function HalvingCyclePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-10 h-10 md:w-12 md:h-12 text-yellow-400" />
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 drop-shadow-sm">
              Bitcoin Halving Cycle
            </h1>
            <Zap className="w-10 h-10 md:w-12 md:h-12 text-yellow-400" />
          </div>
          <p className="text-lg md:text-xl text-gray-300 mb-2 font-medium">
            Pola Historis Harga Bitcoin Menjelang & Sesudah Halving
          </p>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
            Menganalisis fase-fase penting yang sering berulang setiap siklus halving berdasarkan siklus-siklus sebelumnya (2016, 2020).
          </p>
        </div>

        {/* Intro Card */}
        <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-10 border border-slate-700/50 shadow-xl">
          <div className="flex items-start gap-4">
            <Info className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Anatomi Siklus Halving</h2>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                Sejarah menunjukkan bahwa pergerakan harga Bitcoin di sekitar event halving cenderung membentuk <strong>pola psikologis yang berulang</strong>. Mulai dari reli antisipasi di akhir tahun sebelumnya, koreksi tajam ("shakeout") menjelang hari H, fase konsolidasi yang sangat membosankan selama beberapa bulan, hingga akhirnya meledak secara parabolik menembus ATH baru di sekitar bulan Oktober/November.
              </p>
            </div>
          </div>
        </div>

        {/* Halving History Dates */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
            <History className="w-7 h-7 text-blue-400" />
            Sejarah Tanggal Halving
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {HALVING_HISTORY.map((item, idx) => (
              <div key={idx} className={`bg-slate-800/40 backdrop-blur-md rounded-2xl p-4 md:p-5 border ${item.isFuture ? 'border-purple-500/50 bg-purple-900/10' : 'border-slate-700/50'} shadow-lg hover:-translate-y-1 transition-transform`}>
                <div className="text-xs font-bold text-gray-400 mb-1">{item.era}</div>
                <div className={`text-base md:text-lg font-bold mb-3 ${item.isFuture ? 'text-purple-400' : 'text-blue-400'}`}>{item.date}</div>
                <div className="space-y-1.5 text-xs md:text-sm">
                  <div className="flex flex-col xl:flex-row xl:justify-between text-gray-300 gap-1">
                    <span>Block:</span>
                    <span className="font-medium text-white">{item.block}</span>
                  </div>
                  <div className="flex flex-col xl:flex-row xl:justify-between text-gray-300 gap-1">
                    <span>Reward:</span>
                    <span className="font-medium text-green-400">{item.reward}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Cycle Statistics */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
            <BarChart2 className="w-8 h-8 text-green-400" />
            Statistik Rata-Rata Multi-Siklus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-slate-700/50 hover:bg-slate-800/60 transition-colors shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <TrendingDown className="w-6 h-6 text-red-400" />
                <h3 className="text-lg font-bold text-white">Koreksi Bear Market</h3>
              </div>
              <p className="text-4xl font-extrabold text-red-400 mb-2">-80%</p>
              <p className="text-sm text-gray-400 mb-5 leading-relaxed">Rata-rata penurunan terdalam dari pucuk ATH menuju dasar bear market.</p>
              <ul className="text-sm text-gray-300 space-y-3 bg-slate-900/50 p-4 rounded-xl">
                <li className="flex justify-between"><span>Siklus 2014:</span> <span className="text-red-400 font-semibold">-86% <span className="text-gray-500 text-xs">(410 hari)</span></span></li>
                <li className="flex justify-between"><span>Siklus 2018:</span> <span className="text-red-400 font-semibold">-84% <span className="text-gray-500 text-xs">(362 hari)</span></span></li>
                <li className="flex justify-between"><span>Siklus 2022:</span> <span className="text-red-400 font-semibold">-77% <span className="text-gray-500 text-xs">(376 hari)</span></span></li>
              </ul>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-slate-700/50 hover:bg-slate-800/60 transition-colors shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg font-bold text-white">Bottom → Halving</h3>
              </div>
              <p className="text-4xl font-extrabold text-yellow-400 mb-2">~515 Hari</p>
              <p className="text-sm text-gray-400 mb-5 leading-relaxed">Waktu dari dasar Bear Market hingga hari Halving (Fase Pemulihan & Akumulasi).</p>
              <ul className="text-sm text-gray-300 space-y-3 bg-slate-900/50 p-4 rounded-xl">
                <li className="flex justify-between"><span>Siklus 2016:</span> <span className="text-yellow-400 font-semibold">542 hari</span></li>
                <li className="flex justify-between"><span>Siklus 2020:</span> <span className="text-yellow-400 font-semibold">514 hari</span></li>
                <li className="flex justify-between"><span>Siklus 2024:</span> <span className="text-yellow-400 font-semibold">~520 hari</span></li>
              </ul>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-slate-700/50 hover:bg-slate-800/60 transition-colors shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Rocket className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-bold text-white">Halving → ATH</h3>
              </div>
              <p className="text-4xl font-extrabold text-purple-400 mb-2">~481 Hari</p>
              <p className="text-sm text-gray-400 mb-5 leading-relaxed">Waktu dari hari Halving menuju Puncak Siklus (All Time High / Price Discovery).</p>
              <ul className="text-sm text-gray-300 space-y-3 bg-slate-900/50 p-4 rounded-xl">
                <li className="flex justify-between"><span>Siklus 2013:</span> <span className="text-purple-400 font-semibold">371 hari</span></li>
                <li className="flex justify-between"><span>Siklus 2017:</span> <span className="text-purple-400 font-semibold">525 hari</span></li>
                <li className="flex justify-between"><span>Siklus 2021:</span> <span className="text-purple-400 font-semibold">549 hari</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-4 md:p-6 lg:p-10 mb-10 border border-slate-700/50 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center flex items-center justify-center gap-3">
            <Clock className="w-8 h-8 text-yellow-400" />
            4 Fase Utama Siklus Halving
          </h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-yellow-500 to-purple-500 rounded-full opacity-50"></div>
            
            {/* Timeline Events */}
            <div className="space-y-8 md:space-y-12">
              {HALVING_PHASES.map((phase) => {
                const Icon = phase.icon;
                
                return (
                  <div key={phase.id} className="relative pl-12 md:pl-24">
                    {/* Timeline Dot */}
                    <div className={`absolute left-[0.6rem] md:left-[2.1rem] top-6 w-4 h-4 md:w-6 md:h-6 rounded-full border-4 bg-slate-900 ${phase.borderColor} shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10`}></div>
                    
                    {/* Event Card */}
                    <div className={`bg-gradient-to-br from-slate-900 to-slate-800 border ${phase.borderColor} rounded-2xl p-5 md:p-7 transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur-sm group`}>
                      
                      <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
                        {/* Icon Box */}
                        <div className={`p-4 md:p-5 rounded-2xl ${phase.bgColor} ${phase.borderColor} border flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`w-8 h-8 md:w-10 md:h-10 ${phase.color}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 w-full">
                          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 mb-4">
                            <h3 className={`text-xl md:text-2xl lg:text-3xl font-bold ${phase.color}`}>
                              Fase {phase.id}: {phase.phase}
                            </h3>
                            <span className="flex items-center gap-2 text-xs md:text-sm bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-700 text-gray-300 font-semibold w-fit">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              {phase.timeframe}
                            </span>
                          </div>
                          
                          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-5 font-medium">
                            {phase.description}
                          </p>

                          <ul className="space-y-3 mb-6 bg-slate-900/50 p-4 md:p-5 rounded-xl border border-slate-800">
                            {phase.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-gray-400">
                                <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 bg-current ${phase.color}`} />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>

                          {phase.alert && (
                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-start gap-3">
                              <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                              <p className="text-yellow-200 text-sm md:text-base font-medium">
                                {phase.alert}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Summary Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
           <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 md:p-8 hover:bg-slate-800/60 transition-colors">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-purple-400" />
              Mengapa Oktober / November?
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Secara historis, <strong>Q4 (Kuartal 4)</strong> terutama Oktober ("Uptober") dan November sering menjadi bulan terbaik untuk siklus Bitcoin. Setelah berbulan-bulan konsolidasi pasca halving, <em>supply shock</em> akhirnya terasa secara riil di order book exchanges. Sentimen membaik drastis dan memicu efek bola salju FOMO menuju rekor ATH baru.
            </p>
           </div>
           
           <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 md:p-8 hover:bg-slate-800/60 transition-colors">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              Peringatan "Black Swan"
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Meskipun pola ini sering berulang, selalu ada potensi event <em>"Black Swan"</em> (kejadian makroekonomi tak terduga) seperti crash Maret 2020 yang bisa memperburuk pre-halving retrace atau mengubah timeline sementara. Selalu siapkan <em>dry powder</em> (uang tunai) untuk mengantisipasi diskon harga ekstrim.
            </p>
           </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-slate-900/50 border border-gray-700 rounded-xl p-5">
          <p className="text-gray-400 text-xs md:text-sm text-center">
            ⚠️ <strong>Disclaimer:</strong> Analisis timeline ini didasarkan pada siklus masa lalu dan karakteristik psikologi pasar kripto. Ini bukan saran investasi dan tidak menjamin hasil masa depan. Sejarah sering berima, tetapi tidak selalu berulang persis. Selalu lakukan riset sendiri (DYOR).
          </p>
        </div>
      </div>
    </div>
  );
}
