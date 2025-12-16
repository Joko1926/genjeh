import { CitizenReport, ReportStatus, UrgencyLevel, EmployeeActivityLog } from '../types';

const LOCATIONS = [
  'Dusun I (Krajan)', 'Dusun II (Ngalian)', 'Dusun III (Kedaton)', 
  'RT 01 RW 01', 'RT 05 RW 02', 'RT 12 RW 03', 'Pasar Desa Kapas', 
  'Jalan Poros Desa', 'Balai Desa', 'Area Persawahan Blok A'
];

const CATEGORIES = ['Infrastruktur', 'Administrasi', 'Sosial', 'Pertanian', 'Keamanan', 'Kesehatan'];

const CITIZEN_NAMES = [
  'Slamet', 'Widodo', 'Sri', 'Siti', 'Budi', 'Hartono', 'Suprapto', 'Wati', 'Agus', 'Bambang', 
  'Yuni', 'Dewi', 'Rina', 'Joko', 'Eko', 'Dwi', 'Tri', 'Cahyono', 'Lestari', 'Mulyono'
];

const PROBLEMS = [
  'Lampu PJU mati total gelap gulita',
  'Jalan berlubang parah membahayakan motor',
  'Saluran irigasi tersumbat sampah plastik',
  'Mohon info syarat pembuatan KK baru',
  'Kapan BLT DD tahap 3 cair?',
  'Ada pohon tumbang menghalangi jalan',
  'Tumpukan sampah di pinggir kali bau menyengat',
  'Poskamling RT 03 butuh perbaikan atap',
  'Kartu tani saya hilang bagaimana mengurusnya?',
  'Anak balita demam berdarah mohon fogging',
  'Pengajuan surat keterangan tidak mampu',
  'Tiang listrik miring mau roboh'
];

const EMPLOYEES = [
  { id: '1', name: 'Budi Santoso', role: 'Kasi Kesejahteraan' },
  { id: '2', name: 'Siti Aminah', role: 'Kaur Keuangan' },
  { id: '3', name: 'Joko Widodo', role: 'Kadus Selatan' },
  { id: '4', name: 'Rudi Hartono', role: 'Kasi Pemerintahan' },
  { id: '5', name: 'Dewi Sartika', role: 'Kaur Umum' },
  { id: '6', name: 'Agus Priyanto', role: 'Kasi Pelayanan' },
  { id: '7', name: 'Bambang S', role: 'Kadus Utara' }
];

const EMPLOYEE_ACTIONS = [
  'Monitoring pembangunan rabat beton',
  'Verifikasi berkas calon penerima BLT',
  'Rapat koordinasi di Kecamatan Kapas',
  'Pelayanan administrasi kependudukan',
  'Survey lokasi laporan warga',
  'Piket pelayanan kantor desa',
  'Pendampingan kegiatan Posyandu',
  'Monitoring pembagian pupuk subsidi',
  'Mediasi sengketa batas tanah warga'
];

// Generate Citizen Reports
export const generateMockReports = (count: number = 100): CitizenReport[] => {
  return Array.from({ length: count }).map((_, index) => {
    const isRecent = index < 10;
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30)); // Random date within last 30 days
    if (isRecent) date.setHours(date.getHours() - Math.floor(Math.random() * 5));

    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
    const urgency = Math.random() > 0.8 ? UrgencyLevel.HIGH : (Math.random() > 0.5 ? UrgencyLevel.MEDIUM : UrgencyLevel.LOW);
    const problem = PROBLEMS[Math.floor(Math.random() * PROBLEMS.length)];
    const name = CITIZEN_NAMES[Math.floor(Math.random() * CITIZEN_NAMES.length)];
    
    return {
      id: `REP-MOCK-${1000 + index}`,
      senderPhone: `+628${Math.floor(1000000000 + Math.random() * 900000000)}`,
      originalMessage: `Pak, saya ${name} dari ${location}. ${problem}. Mohon dibantu.`,
      timestamp: date,
      category,
      location,
      urgency,
      summary: `${category}: ${problem.substring(0, 20)}...`,
      status: Math.random() > 0.7 ? ReportStatus.DONE : (Math.random() > 0.4 ? ReportStatus.IN_PROGRESS : ReportStatus.PENDING),
      responseMessage: Math.random() > 0.5 ? "Nggih, laporan sampun kami terima dan akan segera ditindaklanjuti." : undefined
    };
  }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Generate Employee Activities
export const generateMockActivities = (count: number = 100): EmployeeActivityLog[] => {
  return Array.from({ length: count }).map((_, index) => {
    const emp = EMPLOYEES[Math.floor(Math.random() * EMPLOYEES.length)];
    const action = EMPLOYEE_ACTIONS[Math.floor(Math.random() * EMPLOYEE_ACTIONS.length)];
    const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
    
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 14)); // Last 2 weeks
    date.setHours(7 + Math.floor(Math.random() * 9)); // Working hours 07:00 - 16:00

    return {
      id: `ACT-${2000 + index}`,
      employeeId: emp.id,
      employeeName: emp.name,
      role: emp.role,
      activity: action,
      location: location,
      timestamp: date,
      hasPhoto: Math.random() > 0.2, // 80% have photos
      status: (Math.random() > 0.9 ? 'Pending' : 'Verified') as 'Pending' | 'Verified' | 'Rejected'
    };
  }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};