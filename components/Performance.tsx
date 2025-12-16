import React, { useState } from 'react';
import { EmployeePerformance, UserRole, EmployeeActivityLog } from '../types';
import { Camera, MapPin, CheckCircle, Smartphone, Calculator, Info, UploadCloud, Send, User, ShieldCheck, UserCog, HelpCircle, X, Search, Filter, History, FileText, Image } from 'lucide-react';

interface PerformanceProps {
  userRole: UserRole;
  activityLogs: EmployeeActivityLog[];
}

export const Performance: React.FC<PerformanceProps> = ({ userRole, activityLogs }) => {
  // Mock Employee Data (Shared State for demo purposes)
  const [employees, setEmployees] = useState<EmployeePerformance[]>([
    { id: '1', name: 'Budi Santoso', role: 'Kasi Kesejahteraan', attendanceScore: 100, outputScore: 85, behaviorScore: 90, totalScore: 91, status: 'Field Work' },
    { id: '2', name: 'Siti Aminah', role: 'Kaur Keuangan', attendanceScore: 95, outputScore: 90, behaviorScore: 95, totalScore: 93, status: 'In Office' },
    { id: '3', name: 'Joko Widodo', role: 'Kadus Selatan', attendanceScore: 80, outputScore: 70, behaviorScore: 85, totalScore: 77.5, status: 'Absent' },
    { id: '4', name: 'Rudi Hartono', role: 'Kasi Pemerintahan', attendanceScore: 100, outputScore: 95, behaviorScore: 92, totalScore: 95.6, status: 'In Office' },
    { id: '5', name: 'Dewi Sartika', role: 'Kaur Umum', attendanceScore: 85, outputScore: 80, behaviorScore: 88, totalScore: 84.4, status: 'In Office' },
  ]);

  const getScoreColorClass = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-blue-400';
    return 'text-red-400';
  };

  // --- STAFF VIEW COMPONENT ---
  const StaffView = () => {
    const [inputActivity, setInputActivity] = useState('');
    const [isLocating, setIsLocating] = useState(false);
    const [currentLocation, setCurrentLocation] = useState<string | null>(null);

    const handleCheckIn = () => {
      setIsLocating(true);
      setTimeout(() => {
        setIsLocating(false);
        setCurrentLocation("-7.155, 111.890 (Balai Desa Kapas)");
        alert("Absensi Berhasil! Lokasi terverifikasi di Kantor Desa.");
      }, 1500);
    };

    const handleReportSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputActivity || !currentLocation) return;
      alert("Laporan Kinerja Harian Terkirim! Menunggu verifikasi Sekdes.");
      setInputActivity('');
      setCurrentLocation(null);
    };

    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
        {/* Profile Header */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-16"></div>
             <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-slate-800 shadow-xl">
                    BS
                </div>
                <div className="text-center md:text-left flex-1">
                    <h2 className="text-2xl font-bold">Budi Santoso</h2>
                    <p className="text-slate-400 font-medium uppercase tracking-wider mb-4">Kasi Kesejahteraan</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                       <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                          <span className="block text-xs text-slate-400">NIPD</span>
                          <span className="font-mono font-bold">19850312 201001 1 002</span>
                       </div>
                       <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                          <span className="block text-xs text-slate-400">Jabatan</span>
                          <span className="font-medium">Pelaksana Teknis</span>
                       </div>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl shadow-lg text-center min-w-[140px]">
                   <span className="text-xs font-medium text-green-100">Skor Bulan Ini</span>
                   <h4 className="text-4xl font-bold text-white mt-1">91.0</h4>
                   <span className="inline-block mt-1 text-[10px] bg-white/20 px-2 py-0.5 rounded-full text-white font-bold">SANGAT BAIK</span>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Check-in Section */}
           <div className="md:col-span-1 space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 p-6">
                 <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <MapPin className="text-red-500" /> Presensi Digital
                 </h3>
                 <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-700 text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Sistem Geofencing Aktif</p>
                    {currentLocation ? (
                       <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 py-4 px-4 rounded-lg text-sm font-bold border border-green-200 dark:border-green-800 flex flex-col items-center gap-2 animate-in zoom-in">
                         <div className="p-2 bg-white dark:bg-slate-800 rounded-full"><CheckCircle size={24} className="text-green-600" /></div>
                         <span>Sudah Absen Masuk</span>
                         <span className="text-xs font-normal opacity-80">07:30 WIB</span>
                       </div>
                    ) : (
                       <button 
                         onClick={handleCheckIn}
                         disabled={isLocating}
                         className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 dark:shadow-blue-900/20 hover:bg-blue-700 hover:shadow-blue-300 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex flex-col items-center gap-2"
                       >
                         {isLocating ? <span className="animate-spin w-6 h-6 border-2 border-white/30 border-t-white rounded-full"></span> : <MapPin size={24} />}
                         {isLocating ? 'Mendeteksi Lokasi...' : 'Absen Sekarang'}
                       </button>
                    )}
                    <p className="text-[10px] text-slate-400 mt-4">
                       Pastikan Anda berada dalam radius 50m dari Kantor Desa atau lokasi tugas.
                    </p>
                 </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 rounded-xl p-5">
                 <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2 text-sm">Target Minggu Ini</h4>
                 <ul className="text-sm space-y-2 text-blue-800 dark:text-blue-400">
                    <li className="flex gap-2"><CheckCircle size={16} className="text-blue-500" /> Distribusi BLT Dusun 1</li>
                    <li className="flex gap-2"><div className="w-4 h-4 border-2 border-blue-300 rounded-full"></div> Laporan Realisasi ADD</li>
                 </ul>
              </div>
           </div>

           {/* Activity Input Section */}
           <div className="md:col-span-2">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700 p-6 h-full">
                 <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
                    <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                       <Smartphone className="text-blue-600" /> Input Laporan Kinerja Harian (LKH)
                    </h3>
                    <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded">Draft</span>
                 </div>

                 <form onSubmit={handleReportSubmit} className="space-y-5">
                    <div>
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">Deskripsi Kegiatan</label>
                      <textarea 
                        value={inputActivity}
                        onChange={(e) => setInputActivity(e.target.value)}
                        className="w-full border border-slate-300 dark:border-slate-600 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition resize-none bg-slate-50 dark:bg-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800"
                        placeholder="Jelaskan secara rinci kegiatan yang Anda lakukan hari ini..."
                        rows={6}
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">Bukti Dukung (Foto/Dokumen)</label>
                      <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:border-blue-400 dark:hover:border-blue-400 transition cursor-pointer group">
                        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-3 group-hover:scale-110 transition shadow-sm border border-slate-200 dark:border-slate-600 group-hover:bg-white dark:group-hover:bg-slate-600">
                            <UploadCloud size={32} className="text-blue-500" />
                        </div>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Klik untuk upload atau drag foto ke sini</span>
                        <span className="text-xs mt-1 text-slate-400">JPG, PNG, PDF (Max 5MB)</span>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                       <button 
                         type="submit"
                         className="bg-slate-900 dark:bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-blue-700 transition flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200"
                       >
                         <Send size={18} />
                         Kirim Laporan
                       </button>
                    </div>
                 </form>
              </div>
           </div>
        </div>
      </div>
    );
  };

  // --- ADMIN VIEW COMPONENT ---
  const AdminView = () => {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
        {/* Admin Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                    <User size={24} />
                </div>
                <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">Total Perangkat</p>
                    <p className="text-xl font-bold text-slate-800 dark:text-white">12 Orang</p>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
                <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                    <CheckCircle size={24} />
                </div>
                <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">Hadir Hari Ini</p>
                    <p className="text-xl font-bold text-slate-800 dark:text-white">11 Orang</p>
                </div>
            </div>
             <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
                <div className="p-3 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
                    <Calculator size={24} />
                </div>
                <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">Rata-rata Skor</p>
                    <p className="text-xl font-bold text-slate-800 dark:text-white">88.5</p>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                    <ShieldCheck size={24} />
                </div>
                <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">Laporan Pending</p>
                    <p className="text-xl font-bold text-slate-800 dark:text-white">5 LKH</p>
                </div>
            </div>
        </div>

        {/* Main Table Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg transition-all border border-slate-200 dark:border-slate-700 flex flex-col">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
               <div>
                 <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                   <ShieldCheck className="text-blue-600" size={24}/>
                   Rekapitulasi Kinerja & Siltap
                 </h2>
                 <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Periode: Maret 2025</p>
               </div>
               
               <div className="flex gap-3 w-full md:w-auto">
                   <div className="relative flex-1 md:flex-none">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                       <input 
                         type="text" 
                         placeholder="Cari nama..." 
                         className="pl-9 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
                       />
                   </div>
                   <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition">
                       <Filter size={16} /> Filter
                   </button>
                   <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm">
                       Export XLS
                   </button>
               </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/10 px-6 py-3 border-b border-blue-100 dark:border-blue-800/30 flex items-center gap-2 text-xs text-blue-800 dark:text-blue-300">
               <Info size={14} />
               <span>Formula Skor: (30% Absensi) + (40% Output Kinerja) + (30% Perilaku/Disiplin). Merujuk Perbup No. 45/2021.</span>
            </div>

            <div className="overflow-x-auto"> 
              <table className="w-full text-sm text-left border-collapse">
                <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">Nama Perangkat</th>
                    <th className="px-6 py-4 text-center">Absensi (30%)</th>
                    <th className="px-6 py-4 text-center">Output (40%)</th>
                    <th className="px-6 py-4 text-center">Perilaku (30%)</th>
                    <th className="px-6 py-4 text-center">Total Skor</th>
                    <th className="px-6 py-4 text-center">Status Kehadiran</th>
                    <th className="px-6 py-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {employees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition relative group z-0 hover:z-10 dark:text-slate-300">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs">
                                {emp.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <p className="font-bold text-slate-800 dark:text-slate-200">{emp.name}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{emp.role}</p>
                            </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                          <span className={`font-mono ${getScoreColorClass(emp.attendanceScore)}`}>{emp.attendanceScore}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                          <span className={`font-mono ${getScoreColorClass(emp.outputScore)}`}>{emp.outputScore}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                          <span className={`font-mono ${getScoreColorClass(emp.behaviorScore)}`}>{emp.behaviorScore}</span>
                      </td>
                      <td className="px-6 py-4 text-center relative">
                        <div className="relative group/tooltip inline-block">
                             <span className={`font-bold px-3 py-1.5 rounded cursor-help transition-transform hover:scale-105 inline-flex items-center gap-1 ${
                                emp.totalScore > 90 ? 'text-green-700 bg-green-50 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' : 
                                emp.totalScore > 75 ? 'text-blue-700 bg-blue-50 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' : 
                                'text-red-700 bg-red-50 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
                            }`}>
                                {emp.totalScore}
                            </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                         <span className={`text-xs px-2 py-1 rounded-full border font-medium ${
                           emp.status === 'In Office' ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' :
                           emp.status === 'Field Work' ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' :
                           'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
                         }`}>
                           {emp.status}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                          <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-bold hover:underline">Detail</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>

        {/* Activity Log Section (Added for 200 items request) */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg transition-all border border-slate-200 dark:border-slate-700 flex flex-col h-[500px]">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700">
               <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                 <History className="text-slate-600 dark:text-slate-400" size={20}/>
                 Log Aktivitas Harian Perangkat (Real-time)
               </h2>
               <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Rekapitulasi laporan kegiatan yang masuk hari ini.</p>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {activityLogs.length === 0 ? (
                 <div className="flex items-center justify-center h-full text-slate-400 text-sm">Loading logs...</div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                  {activityLogs.map((log) => (
                    <div key={log.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition flex items-start gap-4">
                       <div className="mt-1 min-w-[3rem] text-xs font-mono text-slate-500 dark:text-slate-400 text-right">
                          {log.timestamp.toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}
                       </div>
                       <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                             <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{log.employeeName} <span className="font-normal text-slate-500 dark:text-slate-400 text-xs">- {log.role}</span></p>
                             <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                               log.status === 'Verified' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600'
                             }`}>
                               {log.status}
                             </span>
                          </div>
                          <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">{log.activity}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                             <span className="flex items-center gap-1"><MapPin size={12}/> {log.location}</span>
                             {log.hasPhoto && <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400"><Image size={12}/> Lampiran Foto</span>}
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
             <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 rounded-b-xl text-center">
                <button className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline">Lihat Semua Riwayat</button>
            </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {userRole === 'admin' ? <AdminView /> : <StaffView />}
    </>
  );
};