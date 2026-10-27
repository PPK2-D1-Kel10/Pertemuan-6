import { PracticalSession, AttendanceRecord } from '../types';

export const initialSessions: PracticalSession[] = [
  {
    id: 'S001',
    practicalName: 'Praktikum Pemrograman Bergerak',
    className: 'Informatika - A',
    date: '2026-10-25',
    startTime: '08:00',
    endTime: '10:00',
    status: 'Belum Dibuka',
  },
  {
    id: 'S002',
    practicalName: 'Praktikum Basis Data',
    className: 'Informatika - B',
    date: '2026-10-25',
    startTime: '10:15',
    endTime: '12:15',
    status: 'Berlangsung',
  },
  {
    id: 'S003',
    practicalName: 'Praktikum Jaringan Komputer',
    className: 'Informatika - C',
    date: '2026-10-24',
    startTime: '13:00',
    endTime: '15:00',
    status: 'Selesai',
  },
];

export const initialAttendanceRecords: AttendanceRecord[] = [
  {
    id: 'A001',
    sessionId: 'S002',
    studentId: '24060124140201',
    studentName: 'Cindy Kurniawan',
    attendanceTime: '10:20:15',
  },
];