export enum UrgencyLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export enum ReportStatus {
  PENDING = 'Pending',
  VERIFIED = 'Verified',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done'
}

export type UserRole = 'admin' | 'staff' | null;

export interface CitizenReport {
  id: string;
  senderPhone: string;
  originalMessage: string;
  timestamp: Date;
  // AI Parsed Fields
  category: string;
  location: string; // Dusun/RW
  urgency: UrgencyLevel;
  summary: string;
  status: ReportStatus;
  responseMessage?: string;
}

export interface EmployeePerformance {
  id: string;
  name: string;
  role: string;
  attendanceScore: number; // 30%
  outputScore: number; // 40%
  behaviorScore: number; // 30%
  totalScore: number;
  lastLocation?: { lat: number; lng: number };
  status: 'In Office' | 'Field Work' | 'Absent';
}

export interface EmployeeActivityLog {
  id: string;
  employeeId: string;
  employeeName: string;
  role: string;
  activity: string;
  location: string;
  timestamp: Date;
  hasPhoto: boolean;
  status: 'Pending' | 'Verified' | 'Rejected';
}

export interface VillageStats {
  attendanceRate: number;
  pendingLetters: number;
  budgetRealization: number; // Percentage
  population: number;
}