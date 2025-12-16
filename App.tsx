import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { CitizenReports } from './components/CitizenReports';
import { Performance } from './components/Performance';
import { Login } from './components/Login';
import { RunningText } from './components/RunningText';
import { VillageStats, CitizenReport, ReportStatus, UrgencyLevel, UserRole, EmployeeActivityLog } from './types';
import { LayoutDashboard, Users, MessageSquare, Menu, Bell, Search, Map, LogOut, FileText, Moon, Sun, Smartphone, X, Copy, Check, Share2 } from 'lucide-react';
import { generateMockReports, generateMockActivities } from './utils/mockData';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'performance' | 'reports'>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Initial State Data for Desa Kapas, Bojonegoro
  const [stats, setStats] = useState<VillageStats>({
    attendanceRate: 96,
    pendingLetters: 8, // Typical daily queue
    budgetRealization: 68, // Mid-year estimation
    population: 5420 // Estimasi Penduduk Desa Kapas (Ibukota Kecamatan)
  });

  // Global Data States
  const [reports, setReports] = useState<CitizenReport[]>([]);
  const [activityLogs, setActivityLogs] = useState<EmployeeActivityLog[]>([]);

  useEffect(() => {
    // Initial data load for both reports and activities
    const mockReports = generateMockReports(120); 
    const mockActivities = generateMockActivities(100);
    setReports(mockReports);
    setActivityLogs(mockActivities);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    // Set default tab based on role
    if (role === 'staff') {
      setActiveTab('performance');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // If not logged in, show Login Screen
  if (!userRole) {
    return <Login onLogin={handleLogin} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />;
  }

  return (
    <div className={`flex h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300`}>
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 dark:bg-slate-900 text-white flex flex-col hidden md:flex shadow-xl z-20 transition-all duration-300 border-r border-slate-800">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Map size={24} className="text-blue-400" />
            SI-KAPAS
          </h1>
          <p className="text-xs text-slate-400 mt-1">Smart Village Desa Kapas</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          
          {/* Admin Menu */}
          {userRole === 'admin' && (
            <>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                <div className={`absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ${activeTab === 'dashboard' ? 'hidden' : ''}`}></div>
                <LayoutDashboard size={20} />
                <span className="font-medium relative z-10">Dashboard</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('performance')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden ${activeTab === 'performance' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                <div className={`absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ${activeTab === 'performance' ? 'hidden' : ''}`}></div>
                <Users size={20} />
                <span className="font-medium relative z-10">Manajemen Kinerja</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('reports')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden ${activeTab === 'reports' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                <div className={`absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ${activeTab === 'reports' ? 'hidden' : ''}`}></div>
                <MessageSquare size={20} />
                <span className="font-medium relative z-10">Layanan Warga</span>
                {reports.filter(r => r.status === ReportStatus.PENDING).length > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">
                    {reports.filter(r => r.status === ReportStatus.PENDING).length}
                  </span>
                )}
              </button>
            </>
          )}

          {/* Staff Menu */}
          {userRole === 'staff' && (
             <button 
                onClick={() => setActiveTab('performance')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'performance' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
             >
               <FileText size={20} />
               <span className="font-medium">Input Kinerja (LKH)</span>
             </button>
          )}

        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg ${userRole === 'admin' ? 'bg-blue-900 text-blue-300' : 'bg-emerald-900 text-emerald-300'}`}>
              {userRole === 'admin' ? 'KD' : 'BS'}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{userRole === 'admin' ? 'Kepala Desa' : 'Budi Santoso'}</p>
              <p className="text-xs text-slate-400 capitalize">{userRole === 'admin' ? 'Administrator' : 'Kasi Kesra'}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-900/80 hover:text-white text-slate-400 py-2 rounded-lg text-xs font-medium transition duration-300"
          >
            <LogOut size={14} /> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* Top Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm z-10 transition-colors duration-300">
          <div className="h-16 flex items-center justify-between px-6">
            <div className="md:hidden">
              <Menu className="text-slate-600 dark:text-slate-300" />
            </div>
            
            {/* Header Title based on Role/Tab */}
            <div className="flex-1 px-4">
              <h2 className="font-bold text-slate-800 dark:text-white text-lg">
                  {userRole === 'admin' && activeTab === 'dashboard' && 'Dashboard Eksekutif'}
                  {userRole === 'admin' && activeTab === 'performance' && 'Rekapitulasi Kinerja Perangkat'}
                  {userRole === 'admin' && activeTab === 'reports' && 'Aspirasi Warga'}
                  {userRole === 'staff' && 'Sistem Kinerja Mandiri'}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5 w-64 border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300">
                  <Search size={16} className="text-slate-400 mr-2" />
                  <input 
                  type="text" 
                  placeholder="Pencarian..." 
                  className="bg-transparent border-none text-xs focus:outline-none w-full text-slate-700 dark:text-slate-200 placeholder-slate-400"
                  />
              </div>

              {/* Share / Mobile Access Button */}
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors"
                title="Akses di HP / Bagikan"
              >
                <Smartphone size={20} />
              </button>

              {/* Dark Mode Toggle */}
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title={isDarkMode ? "Mode Terang" : "Mode Gelap"}
              >
                {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
              </button>

              {/* Notification */}
              <div className="relative cursor-pointer p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <Bell size={20} className="text-slate-600 dark:text-slate-300" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              </div>
            </div>
          </div>

          {/* Running Text Ticker positioned below header content but within header block */}
          <RunningText activities={activityLogs} reports={reports} />
        </header>

        {/* Dynamic Content Scroll Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 scroll-smooth">
          <div className="max-w-7xl mx-auto h-full">
            {userRole === 'admin' ? (
               <>
                {activeTab === 'dashboard' && <Dashboard stats={stats} />}
                {activeTab === 'performance' && <Performance userRole="admin" activityLogs={activityLogs} />}
                {activeTab === 'reports' && <CitizenReports reports={reports} setReports={setReports} />}
               </>
            ) : (
               // Staff only sees Performance View (Input)
               <Performance userRole="staff" activityLogs={activityLogs} />
            )}
          </div>
        </main>
      </div>

      {/* Share / QR Code Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-200 ring-1 ring-slate-900/5 dark:ring-white/10">
            <button 
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-200 transition"
            >
              <X size={20} />
            </button>
            
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mb-3">
                <Share2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Akses Mobile</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Scan QR Code ini untuk membuka aplikasi SI-KAPAS di HP atau perangkat lain.
              </p>
            </div>
            
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white rounded-xl shadow-inner border border-slate-200">
                {/* Dynamically generates QR code for the current URL */}
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}`} 
                  alt="QR Code" 
                  className="w-48 h-48 mix-blend-multiply"
                />
              </div>
            </div>

            <div className="space-y-3">
               <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                  <input 
                    type="text" 
                    readOnly 
                    value={window.location.href}
                    className="bg-transparent border-none text-xs text-slate-600 dark:text-slate-300 focus:outline-none flex-1 truncate"
                  />
                  <button 
                    onClick={handleCopyLink}
                    className="p-1.5 bg-white dark:bg-slate-800 rounded shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                    title="Salin Link"
                  >
                    {isCopied ? <Check size={14} className="text-green-600" /> : <Copy size={14} className="text-slate-500 dark:text-slate-400" />}
                  </button>
               </div>
               <p className="text-[10px] text-center text-slate-400 dark:text-slate-500">
                 Pastikan perangkat terhubung ke jaringan yang sama jika menggunakan Localhost.
               </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;