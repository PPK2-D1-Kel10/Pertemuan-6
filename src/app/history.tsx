import { useDemo } from '@/context/DemoContext';
import AttendanceRecapScreen from '@/screens/AttendanceRecapScreen';
import HistoryScreen from '@/screens/HistoryScreen';

export default function HistoryRoute() {
  const { state } = useDemo();
  return state.role === 'Asisten' ? <AttendanceRecapScreen /> : <HistoryScreen />;
}
