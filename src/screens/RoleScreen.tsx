import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Button, Icon, Screen } from '@/components/UI';
import { useDemo } from '@/context/DemoContext';
import { ds } from '@/styles/dashboard';
import type { UserRole } from '@/types';

export default function RoleScreen() {
  const { dispatch } = useDemo();
  function select(role: NonNullable<UserRole>) { dispatch({ type: 'role', role }); router.replace('/home'); }
  return <Screen title="Masuk sebagai siapa?" subtitle="Pilih ruang kerja yang sesuai dengan aktivitasmu." requireRole={false}>
    <View style={ds.wrap}>
      <View style={ds.roleCard}><Icon name="school-outline" size={38} /><Text style={ds.title}>Praktikan</Text><Text style={ds.subtitle}>Lihat jadwal, pelajari detail sesi, lakukan presensi, dan pantau riwayat serta status kehadiran.</Text><Button label="Lanjut sebagai Praktikan" onPress={() => select('Praktikan')} /></View>
      <View style={ds.roleCard}><Icon name="people-outline" size={38} /><Text style={ds.title}>Asisten</Text><Text style={ds.subtitle}>Buka dan tutup sesi praktikum, pantau presensi peserta, serta lihat rekap kehadiran.</Text><Button label="Lanjut sebagai Asisten" onPress={() => select('Asisten')} /></View>
    </View>
  </Screen>;
}
