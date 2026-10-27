import { useDemo } from '@/context/DemoContext';
import AssistantSessionScreen from '@/screens/AssistantSessionScreen';
import ScheduleScreen from '@/screens/ScheduleScreen';

export default function ScheduleRoute() {
  const { state } = useDemo();
  return state.role === 'Asisten' ? <AssistantSessionScreen /> : <ScheduleScreen />;
}
