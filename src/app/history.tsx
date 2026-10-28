import { useDemo } from '@/context/DemoContext';
import AttendanceRecapScreen from '@/screens/AttendanceRecapScreen';
import AttendanceHistoryScreen from '@/screens/AttendanceHistoryScreen';

export default function HistoryRoute() {
  const { state } = useDemo();
  return state.role === 'Asisten' ? <AttendanceRecapScreen /> : <AttendanceHistoryScreen />;
}
