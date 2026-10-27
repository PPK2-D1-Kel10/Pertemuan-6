import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Button, Card, EmptyState, Icon, Screen, SessionCard } from '@/components/UI';
import { useDemo } from '@/context/DemoContext';
import { ds } from '@/styles/dashboard';

export default function HomeScreen() {
  const { state } = useDemo();
  const assistant = state.role === 'Asisten';
  const live = state.sessions.filter((session) => session.status === 'Berlangsung');
  const mine = state.attendance.filter((record) => record.studentId === state.username);
  const completed = state.sessions.filter((session) => session.status === 'Selesai').length;
  const stats = [
    { label: 'Total sesi', count: state.sessions.length, icon: 'calendar-outline' as const },
    { label: 'Sesi berlangsung', count: live.length, icon: 'radio-outline' as const },
    { label: assistant ? 'Presensi tercatat' : 'Kehadiran saya', count: assistant ? state.attendance.length : mine.length, icon: 'checkmark-circle-outline' as const },
    { label: 'Sesi selesai', count: completed, icon: 'flag-outline' as const },
  ];
  return <Screen title="Dashboard" subtitle="Semua aktivitas praktikum, dalam satu tempat.">
    <View style={ds.hero}>
      <Text style={ds.eyebrow}>RUANG {assistant ? 'ASISTEN' : 'PRAKTIKAN'}</Text>
      <Text style={ds.heroTitle}>Halo, {state.username}!</Text>
      <Text style={ds.heroText}>{assistant ? 'Siapkan sesi, pantau peserta yang hadir, dan kelola kegiatan praktikum dengan lebih teratur.' : 'Siap untuk praktikum? Cek jadwal, catat kehadiranmu, dan pantau perjalanan belajarmu di sini.'}</Text>
      <View style={ds.wrap}><Button label={assistant ? 'Kelola sesi praktikum' : 'Lihat jadwal praktikum'} onPress={() => router.push('/schedule')} /><StatusBadgeNote count={live.length} /></View>
    </View>
    <View style={ds.stats}>{stats.map((stat) => <View style={ds.stat} key={stat.label}><Icon name={stat.icon} /><Text style={ds.statNumber}>{stat.count}</Text><Text style={ds.statLabel}>{stat.label}</Text></View>)}</View>
    <Text style={ds.sectionTitle}>Akses cepat</Text>
    <View style={ds.actions}>
      <Pressable accessibilityRole="button" style={ds.action} onPress={() => router.push('/schedule')}><Icon name="calendar-outline" size={28} /><Text style={ds.cardTitle}>{assistant ? 'Buka & tutup sesi' : 'Jadwal & presensi'}</Text><Text style={ds.small}>{assistant ? 'Atur sesi yang tersedia untuk presensi.' : 'Lihat detail dan lakukan presensi pada sesi aktif.'}</Text></Pressable>
      <Pressable accessibilityRole="button" style={ds.action} onPress={() => router.push('/history')}><Icon name="bar-chart-outline" size={28} /><Text style={ds.cardTitle}>{assistant ? 'Rekap kehadiran' : 'Riwayat kehadiran'}</Text><Text style={ds.small}>{assistant ? 'Pantau kehadiran peserta per sesi.' : 'Periksa status dan waktu presensi kamu.'}</Text></Pressable>
    </View>
    <Text style={ds.sectionTitle}>Sedang berlangsung</Text>
    {live.length ? live.map((session) => <SessionCard key={session.id} session={session} onPress={() => router.push({ pathname: '/detail', params: { id: session.id } })} />) : <EmptyState message="Tidak ada sesi aktif. Lihat jadwal untuk sesi berikutnya." />}
    {!assistant && <Card><Text style={ds.cardTitle}>Progres presensi</Text><Text style={ds.subtitle}>{mine.length} dari {state.sessions.length} sesi praktikum sudah kamu hadiri.</Text><View style={ds.progressTrack}><View style={[ds.progressFill, { width: `${state.sessions.length ? Math.min(100, mine.length / state.sessions.length * 100) : 0}%` }]} /></View><Text style={ds.small}>Dihitung dari seluruh sesi praktikum, termasuk sesi yang belum dibuka.</Text></Card>}
  </Screen>;
}
function StatusBadgeNote({ count }: { count: number }) { return <View style={{ justifyContent: 'center' }}><Text style={ds.heroText}>{count} sesi aktif saat ini</Text></View>; }
