import type { AttendanceRecord, PracticalSession, UserRole } from '../types';

type AttendanceInput = {
  studentId: string;
  role: UserRole;
  session: PracticalSession | undefined;
  attendance: readonly AttendanceRecord[];
};

export type AttendanceValidationResult =
  | { valid: true }
  | { valid: false; code: 'identity' | 'role' | 'session' | 'duplicate' | 'unopened' | 'closed'; message: string };

// Shared by the UI and reducer; the reducer always checks the latest state.
export function validateAttendance({ studentId, role, session, attendance }: AttendanceInput): AttendanceValidationResult {
  if (!studentId.trim()) return { valid: false, code: 'identity', message: 'Identitas Praktikan tidak valid. Silakan login kembali.' };
  if (role !== 'Praktikan') return { valid: false, code: 'role', message: 'Presensi hanya tersedia untuk Praktikan.' };
  if (!session) return { valid: false, code: 'session', message: 'Sesi praktikum tidak ditemukan.' };
  if (attendance.some((record) => record.sessionId === session.id && record.studentId === studentId)) {
    return { valid: false, code: 'duplicate', message: 'Kehadiranmu sudah tercatat untuk sesi ini.' };
  }
  if (session.status === 'Belum Dibuka') return { valid: false, code: 'unopened', message: 'Tunggu asisten membuka sesi presensi.' };
  if (session.status !== 'Berlangsung') return { valid: false, code: 'closed', message: 'Sesi sudah ditutup. Hubungi asisten jika ada kendala presensi.' };
  return { valid: true };
}

export function formatAttendanceTime(date: Date): string {
  return date.toLocaleTimeString('id-ID', {
    timeZone: 'Asia/Jakarta', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).replaceAll('.', ':');
}
