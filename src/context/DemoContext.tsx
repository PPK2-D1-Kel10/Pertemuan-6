import { createContext, useContext, useEffect, useReducer, useState, type Dispatch, type PropsWithChildren } from 'react';
import { Platform } from 'react-native';
import { initialAttendanceRecords, initialSessions } from '@/data/dummy';
import { demoReducer, isDemoState, type DemoAction, type DemoState } from '@/data/demo-state';

const STORAGE_KEY = 'presensi-praktikum-demo-v1';
const initialState: DemoState = { username: '', role: null, sessions: initialSessions, attendance: initialAttendanceRecords };
const DemoContext = createContext<{ state: DemoState; dispatch: Dispatch<DemoAction>; ready: boolean; storageError: boolean } | null>(null);

export function DemoProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(demoReducer, initialState);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    let active = true;
    void Promise.resolve().then(() => {
      if (!active) return;
      try {
        if (Platform.OS === 'web') {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            const parsed: unknown = JSON.parse(stored);
            if (isDemoState(parsed)) dispatch({ type: 'restore', state: parsed });
          }
        }
      } catch { setStorageError(true); }
      setReady(true);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!ready || Platform.OS !== 'web') return;
    let active = true;
    void Promise.resolve().then(() => {
      if (!active) return;
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
      catch { setStorageError(true); }
    });
    return () => { active = false; };
  }, [ready, state]);

  return <DemoContext.Provider value={{ state, dispatch, ready, storageError }}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error('useDemo harus digunakan di dalam DemoProvider.');
  return value;
}
