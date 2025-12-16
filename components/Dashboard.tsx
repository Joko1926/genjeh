import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { AlertTriangle, TrendingUp, Users, FileText, Activity, MapPin, X, Building2, Wallet, UserCheck, ChevronRight } from 'lucide-react';
import { VillageStats } from '../types';

interface DashboardProps {
  stats: VillageStats;
}

// Data Kontekstual Desa Kapas
const budgetTrendData = [
  { name: 'Jan', value: 150 }, // dalam Juta
  { name: 'Feb', value: 320 },
  { name: 'Mar', value: 580 },
  { name: 'Apr', value: 890 },
  { name: 'Mei', value: 1250 }, 
  { name: 'Jun', value: 1450 },
];

const assistanceData = [
  { name: 'BLT Dana Desa', value: 145 },
  { name: 'PKH (Dinsos)', value: 210 },
  { name: 'BPNT Sembako', value: 350 },
  { name: 'Beasiswa Desa', value: 45 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // Render Modal Content Helper
  const renderModalContent = () => {
    switch (selectedCard) {
      case 'attendance':
        return (
          <div className="space-y-5 animate-in slide-in-from-bottom-2 duration-300">
            <h4 className="font-bold text-slate-800 dark:text-white text-lg flex items-center gap-2 border-b dark:border-slate-700 pb-3">
              <UserCheck className="text-blue-600" /> Detail Kehadiran Perangkat
            </h4>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800 flex items-center justify-between">
              <div>
                 <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Absensi Hari Ini</p>
                 <p className="text-xs text-slate-500 dark:text-slate-400">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-blue-700 dark:text-blue-400">{stats.attendanceRate}%</span>
                <p className="text-xs text-blue-600 dark:text-blue-400">On-time</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded transition">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">SD</div>
                   <div>
                     <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Sekretariat Desa</p>
                     <p className="text-xs text-slate-500 dark:text-slate-400">Sekdes, Kaur Keuangan, Kaur Umum</p>
                   </div>
                </div>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-bold">Lengkap</span>
              </div>

              {/* ... other modal items ... */}
              <div className="flex justify-between items-center p-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded transition">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">KW</div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Kewilayahan (Kasun)</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Kasun I, II, III</p>
                    </div>
                 </div>
                 <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded text-xs font-bold">1 Izin</span>
               </div>
            </div>
            
            <div className="pt-3 border-t dark:border-slate-700">
               <button className="w-full py-2 flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-medium hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition">
                 Lihat Log Fingerprint <ChevronRight size={16} />
               </button>
            </div>
          </div>
        );
      
      case 'letters':
        return (
          <div className="space-y-5 animate-in slide-in-from-bottom-2 duration-300">
             <h4 className="font-bold text-slate-800 dark:text-white text-lg flex items-center gap-2 border-b dark:border-slate-700 pb-3">
              <FileText className="text-orange-600" /> Antrean Tanda Tangan (TTE)
            </h4>
            
            <div className="flex gap-2 mb-2">
               <span className="flex-1 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/50 p-2 rounded text-center">
                 <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold">Menunggu</p>
                 <p className="text-lg font-bold text-orange-700 dark:text-orange-500">{stats.pendingLetters}</p>
               </span>
               <span className="flex-1 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/50 p-2 rounded text-center">
                 <p className="text-xs text-green-600 dark:text-green-400 font-semibold">Selesai Hari Ini</p>
                 <p className="text-lg font-bold text-green-700 dark:text-green-500">12</p>
               </span>
            </div>
            
            <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 dark:text-slate-400 uppercase">
                  <tr>
                    <th className="px-3 py-2">Dokumen</th>
                    <th className="px-3 py-2">Warga</th>
                    <th className="px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  <tr className="dark:text-slate-300">
                    <td className="px-3 py-2 font-medium">SKTM (Sekolah)</td>
                    <td className="px-3 py-2">Sujono (RT 02)</td>
                    <td className="px-3 py-2"><span className="text-[10px] bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-1.5 py-0.5 rounded">Paraf Sekdes</span></td>
                  </tr>
                  <tr className="dark:text-slate-300">
                    <td className="px-3 py-2 font-medium">Pengantar SKCK</td>
                    <td className="px-3 py-2">Rina Wati (RT 15)</td>
                    <td className="px-3 py-2"><span className="text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-1.5 py-0.5 rounded">Verif Kasi</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
             <button className="w-full bg-slate-900 dark:bg-slate-700 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-600 transition shadow-lg">
              Buka Dashboard TTE (PrivyID/BSrE)
            </button>
          </div>
        );
      
      // ... Added basic structure for others to save space, assuming pattern matches ...
      default:
        return (
            <div className="p-4 text-center dark:text-slate-300">Detail data tidak tersedia di preview ini.</div>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      
      {/* Modal Backdrop & Content */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in zoom-in-95 duration-200 ring-1 ring-slate-900/5 dark:ring-white/10">
              <button 
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-200 transition z-10"
              >
                <X size={20} />
              </button>
              <div className="p-6">
                {renderModalContent()}
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 px-6 py-4 border-t dark:border-slate-700 flex justify-end">
                <button 
                  onClick={() => setSelectedCard(null)}
                  className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-sm"
                >
                  Tutup
                </button>
              </div>
           </div>
        </div>
      )}

      {/* Header Stats / Panel Kesehatan Desa */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Kehadiran */}
        <div 
          onClick={() => setSelectedCard('attendance')}
          className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">Skor Kehadiran</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stats.attendanceRate}%</h3>
            </div>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <Users size={20} />
            </div>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-medium flex items-center gap-1">
             ↑ 2.5% <span className="text-slate-400 dark:text-slate-500 font-normal">vs bulan lalu</span>
          </p>
        </div>

        {/* Card 2: Antrean Surat */}
        <div 
           onClick={() => setSelectedCard('letters')}
           className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider group-hover:text-orange-600 dark:group-hover:text-orange-400 transition">Layanan (TTE)</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stats.pendingLetters} Surat</h3>
            </div>
            <div className="p-2 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <FileText size={20} />
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">Menunggu Tanda Tangan Kades</p>
        </div>

        {/* Card 3: Anggaran */}
        <div 
           onClick={() => setSelectedCard('budget')}
           className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider group-hover:text-green-600 dark:group-hover:text-green-400 transition">Serapan APBDes</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stats.budgetRealization}%</h3>
            </div>
            <div className="p-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <TrendingUp size={20} />
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">Target TW 2: 75%</p>
        </div>

        {/* Card 4: Populasi */}
        <div 
           onClick={() => setSelectedCard('population')}
           className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">Penduduk Kapas</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stats.population.toLocaleString()}</h3>
            </div>
            <div className="p-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <Activity size={20} />
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">Update: OpenSID Hari Ini</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area - Budget & Assistance */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Tren Keuangan Desa (Juta Rp)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={budgetTrendData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" strokeOpacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  formatter={(value) => [`Rp ${value} Juta`, 'Realisasi']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#fff', color: '#1e293b' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conceptual GIS Map / Command Center Visual */}
        <div className="bg-slate-900 dark:bg-slate-950 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-white overflow-hidden relative group border border-slate-800">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://picsum.photos/400/300')] bg-cover"></div>
          
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <MapPin className="text-red-500" size={18} />
                GIS Desa Kapas
              </h3>
              <span className="text-xs bg-red-600 px-2 py-1 rounded text-white animate-pulse">LIVE</span>
            </div>

            <div className="flex-1 bg-slate-800/50 rounded-lg p-4 backdrop-blur-sm border border-slate-700 flex flex-col gap-3">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">Dusun I (Jalan Poros)</span>
                  <span className="text-yellow-400">Pengaspalan 60%</span>
                </div>
                <div className="w-full bg-slate-700 h-1.5 rounded-full">
                  <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                </div>

                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-slate-300">Dusun III (Bansos)</span>
                  <span className="text-green-400">Tersalurkan 95%</span>
                </div>
                <div className="w-full bg-slate-700 h-1.5 rounded-full">
                  <div className="bg-green-400 h-1.5 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-slate-600">
                <p className="text-xs text-slate-400 mb-2">Sebaran Penerima Manfaat</p>
                <div className="h-32">
                   <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={assistanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={40}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {assistanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{backgroundColor: '#1e293b', border: 'none', color: '#fff', borderRadius: '8px'}} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Center */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="text-orange-500" />
          Pusat Komando & Peringatan Dini (EWS)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg hover:translate-x-1 transition-transform">
             <h4 className="font-semibold text-red-900 dark:text-red-300">Peringatan Irigasi</h4>
             <p className="text-sm text-red-700 dark:text-red-400 mt-1">Debit air saluran sekunder di Dusun Ngalian meningkat. Waspada untuk petani bawang.</p>
             <button className="mt-3 text-xs bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition">
               Broadcast Grup Tani
             </button>
           </div>
           <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg hover:translate-x-1 transition-transform">
             <h4 className="font-semibold text-blue-900 dark:text-blue-300">Jadwal Musdes</h4>
             <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">Musyawarah Desa penetapan RKPDes 2026 dijadwalkan Jumat depan di Balai Desa.</p>
             <button className="mt-3 text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition">
               Lihat Undangan
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};