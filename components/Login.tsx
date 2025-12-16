import React from 'react';
import { ShieldCheck, UserCog, Map, Moon, Sun } from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, isDarkMode, toggleDarkMode }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 font-sans transition-colors duration-300 relative">
      
      {/* Absolute Toggle Button for Login Screen */}
      <button 
        onClick={toggleDarkMode}
        className="absolute top-6 right-6 p-3 rounded-full bg-white dark:bg-slate-800 shadow-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
      >
         {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
      </button>

      <div className="mb-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/30 mb-6 hover:rotate-3 transition-transform duration-500">
           <Map size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">SI-KAPAS</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Sistem Integrasi Kinerja & Pelayanan Desa Kapas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Admin Card */}
        <button 
          onClick={() => onLogin('admin')}
          className="group relative bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:-translate-y-2 transition-all duration-300 text-left animate-in zoom-in-95 delay-100"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="w-14 h-14 bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-sm">
            <ShieldCheck size={28} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Masuk sebagai Admin</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
            Akses dashboard eksekutif, monitoring kinerja perangkat, persetujuan surat, dan manajemen laporan warga.
          </p>
          <div className="mt-6 flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            Login Kepala Desa &rarr;
          </div>
        </button>

        {/* Staff Card */}
        <button 
          onClick={() => onLogin('staff')}
          className="group relative bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-2xl border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500 hover:-translate-y-2 transition-all duration-300 text-left animate-in zoom-in-95 delay-200"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="w-14 h-14 bg-emerald-50 dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-sm">
            <UserCog size={28} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Masuk sebagai Staff</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
            Akses mandiri untuk presensi geofencing, input laporan kinerja harian (LKH), dan upload bukti kegiatan.
          </p>
          <div className="mt-6 flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            Login Perangkat Desa &rarr;
          </div>
        </button>
      </div>

      <div className="mt-12 text-center text-xs text-slate-400 dark:text-slate-500">
        &copy; 2025 Pemerintah Desa Kapas, Kabupaten Bojonegoro. Dilindungi Hak Cipta.
      </div>
    </div>
  );
};