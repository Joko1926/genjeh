import React, { useState } from 'react';
import { CitizenReport, ReportStatus, UrgencyLevel } from '../types';
import { parseCitizenMessage } from '../services/geminiService';
import { MessageSquare, Send, CheckCircle, Clock, MapPin, Search, AlertCircle } from 'lucide-react';

interface ReportsProps {
  reports: CitizenReport[];
  setReports: React.Dispatch<React.SetStateAction<CitizenReport[]>>;
}

export const CitizenReports: React.FC<ReportsProps> = ({ reports, setReports }) => {
  const [simulatedInput, setSimulatedInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSimulateIncomingMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!simulatedInput.trim()) return;

    setIsProcessing(true);
    try {
      // 1. Simulate receiving text from WhatsApp
      // 2. Call Gemini for NLP analysis
      const analysis = await parseCitizenMessage(simulatedInput);
      
      const newReport: CitizenReport = {
        id: `REP-${Date.now()}`,
        senderPhone: `+62812${Math.floor(Math.random() * 90000000)}`, // Mock phone
        originalMessage: simulatedInput,
        timestamp: new Date(),
        category: analysis.category,
        location: analysis.location,
        urgency: analysis.urgency as UrgencyLevel,
        summary: analysis.summary,
        status: ReportStatus.PENDING,
        responseMessage: analysis.suggestedResponse
      };

      setReports(prev => [newReport, ...prev]);
      setSimulatedInput('');
    } catch (error) {
      console.error("Failed to process message", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case ReportStatus.PENDING: return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case ReportStatus.VERIFIED: return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case ReportStatus.DONE: return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-200 dark:border-green-800';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300';
    }
  };

  const getUrgencyColor = (urgency: UrgencyLevel) => {
    switch (urgency) {
      case UrgencyLevel.CRITICAL: return 'text-red-600 dark:text-red-400 font-bold';
      case UrgencyLevel.HIGH: return 'text-orange-600 dark:text-orange-400 font-semibold';
      case UrgencyLevel.MEDIUM: return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-slate-500 dark:text-slate-400';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
      {/* Left: WhatsApp Simulator (Integration Demo) */}
      <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg transition-all border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden">
        <div className="p-4 bg-green-600 text-white flex justify-between items-center shadow-md z-10">
          <div className="flex items-center gap-2">
            <MessageSquare size={20} />
            <h3 className="font-semibold">Simulasi WhatsApp Gateway</h3>
          </div>
          <span className="text-xs bg-green-700 px-2 py-1 rounded shadow-inner">API Active</span>
        </div>
        
        <div className="flex-1 p-4 bg-slate-100 dark:bg-slate-900 overflow-y-auto space-y-4">
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg rounded-tl-none shadow-sm max-w-[90%] text-sm dark:text-slate-200 border border-slate-200 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Bot Desa Kapas</p>
            <p>Halo Warga Desa Kapas! Silakan lapor keluhan dengan format bebas. Contoh: "Pak, ada jalan berlubang di Dusun A."</p>
          </div>
          
          {reports.slice(0, 3).map(report => (
             <div key={report.id} className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
                <div className="bg-green-100 dark:bg-green-900/40 p-3 rounded-lg rounded-tr-none shadow-sm max-w-[90%] ml-auto text-sm text-slate-800 dark:text-slate-100 border border-green-200 dark:border-green-800">
                  <p className="text-green-700 dark:text-green-400 text-xs mb-1 font-mono">{report.senderPhone}</p>
                  <p>{report.originalMessage}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg rounded-tl-none shadow-sm max-w-[90%] text-sm dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                   <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Bot Desa Kapas (AI Reply)</p>
                   <p>{report.responseMessage}</p>
                </div>
             </div>
          ))}
        </div>

        <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
          <form onSubmit={handleSimulateIncomingMessage} className="flex gap-2">
            <input 
              type="text" 
              value={simulatedInput}
              onChange={(e) => setSimulatedInput(e.target.value)}
              placeholder="Ketik laporan warga di sini..."
              className="flex-1 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              disabled={isProcessing}
            />
            <button 
              type="submit" 
              disabled={isProcessing}
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition shadow-md hover:scale-105 active:scale-95"
            >
              <Send size={18} />
            </button>
          </form>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 text-center">
            *Mensimulasikan Webhook WhatsApp Business API
          </p>
        </div>
      </div>

      {/* Right: Report Management System */}
      <div className="lg:col-span-2 flex flex-col gap-4">
         {/* Stats Row */}
         <div className="grid grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <span className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold">Total Laporan</span>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{reports.length}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <span className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold">Belum Diverifikasi</span>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-500">
                {reports.filter(r => r.status === ReportStatus.PENDING).length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <span className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold">Kritikal</span>
              <p className="text-2xl font-bold text-red-600 dark:text-red-500">
                {reports.filter(r => r.urgency === UrgencyLevel.CRITICAL).length}
              </p>
            </div>
         </div>

         {/* Report List Table */}
         <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg transition-all border border-slate-200 dark:border-slate-700 flex-1 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
               <h3 className="font-bold text-slate-800 dark:text-white">Daftar Laporan Masuk</h3>
               <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium hover:underline">Lihat Semua</button>
            </div>
            
            <div className="overflow-y-auto flex-1">
              {reports.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-slate-400 dark:text-slate-500">
                  <Search size={48} className="mb-2 opacity-20" />
                  <p>Belum ada laporan masuk.</p>
                </div>
              ) : (
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-900/50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3">Waktu</th>
                      <th className="px-6 py-3">Kategori & Lokasi</th>
                      <th className="px-6 py-3">Ringkasan Masalah</th>
                      <th className="px-6 py-3">Urgensi</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {reports.map((report) => (
                      <tr key={report.id} className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                        <td className="px-6 py-4 font-mono text-xs dark:text-slate-300">
                          {report.timestamp.toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{report.category}</p>
                          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 gap-1 mt-1">
                            <MapPin size={12} />
                            {report.location}
                          </div>
                        </td>
                        <td className="px-6 py-4 max-w-xs truncate">
                          <span title={report.summary} className="dark:text-slate-300">{report.summary}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`flex items-center gap-1 ${getUrgencyColor(report.urgency)}`}>
                            <AlertCircle size={14} />
                            {report.urgency}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                           <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800 px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition">
                             Detail
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
         </div>
      </div>
    </div>
  );
};