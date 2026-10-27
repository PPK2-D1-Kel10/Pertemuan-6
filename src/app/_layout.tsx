import { Stack } from 'expo-router';
import { DemoProvider } from '@/context/DemoContext';

export default function RootLayout() {
  return (
    <DemoProvider><Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Login | Presensi Praktikum' }} />
    </Stack></DemoProvider>
  );
}
