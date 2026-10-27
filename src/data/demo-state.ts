import type { AttendanceRecord, PracticalSession, UserRole } from '@/types';

export type DemoState = {
  username: string;
  role: UserRole;
  sessions: PracticalSession[];
  attendance: AttendanceRecord[];
};

export type DemoAction =
  | { type: 'login'; username: string }
  | { type: 'role'; role: NonNullable<UserRole> }
  | { type: 'logout' }
  | { type: 'open' | 'close'; sessionId: string }
  | { type: 'attend'; sessionId: string; time: string }
  | { type: 'restore'; state: DemoState };

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'restore': return action.state;
    case 'login': return { ...state, username: action.username.trim(), role: null };
    case 'logout': return { ...state, username: '', role: null };
    case 'role': return state.username ? { ...state, role: action.role } : state;
    case 'open':
    case 'close': {
      if (!state.username || state.role !== 'Asisten') return state;
      const expected = action.type === 'open' ? 'Belum Dibuka' : 'Berlangsung';
      const status = action.type === 'open' ? 'Berlangsung' : 'Selesai';
      return {
        ...state,
        sessions: state.sessions.map((session) => session.id === action.sessionId && session.status === expected
          ? { ...session, status } : session),
      };
    }
    case 'attend': {
      if (!state.username || state.role !== 'Praktikan') return state;
      if (!state.sessions.some((session) => session.id === action.sessionId && session.status === 'Berlangsung')) return state;
      if (state.attendance.some((record) => record.sessionId === action.sessionId && record.studentId === state.username)) return state;
      return {
        ...state,
        attendance: [...state.attendance, {
          id: `${action.sessionId}:${state.username}`,
          sessionId: action.sessionId,
          studentId: state.username,
          studentName: state.username,
          attendanceTime: action.time,
        }],
      };
    }
  }
}

export function isDemoState(value: unknown): value is DemoState {
  if (!value || typeof value !== 'object') return false;
  const state = value as Partial<DemoState>;
  return typeof state.username === 'string'
    && (state.role === null || state.role === 'Asisten' || state.role === 'Praktikan')
    && Array.isArray(state.sessions) && state.sessions.every((s) =>
      s && ['id', 'practicalName', 'className', 'date', 'startTime', 'endTime'].every((key) => typeof s[key as keyof PracticalSession] === 'string')
      && ['Belum Dibuka', 'Berlangsung', 'Selesai'].includes(s.status))
    && Array.isArray(state.attendance) && state.attendance.every((r) =>
      r && ['id', 'sessionId', 'studentId', 'studentName', 'attendanceTime'].every((key) => typeof r[key as keyof AttendanceRecord] === 'string'));
}
