export type SessionStatus = 'Belum Dibuka' | 'Berlangsung' | 'Selesai';

export type PracticalSession = {
  id: string;
  practicalName: string;
  className: string;
  date: string;
  startTime: string;
  endTime: string;
  status: SessionStatus;
};

export type AttendanceRecord = {
  id: string;
  sessionId: string;
  studentId: string;
  studentName: string;
  attendanceTime: string;
};

export type UserRole = 'Asisten' | 'Praktikan' | null;