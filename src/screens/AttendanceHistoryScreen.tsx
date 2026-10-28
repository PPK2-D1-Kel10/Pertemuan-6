import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Button, Card, EmptyState, Screen, StatusBadge } from '@/components/UI';
import { useDemo } from '@/context/DemoContext';
import { ds } from '@/styles/dashboard';

export default function AttendanceHistoryScreen() {
  const { state } = useDemo();
  const mine = state.attendance.filter((record) => record.studentId === state.username);
  return <Screen title="Riwayat & status presensi" subtitle="Periksa kehadiranmu pada setiap sesi praktikum.">
    <View style={ds.stats}>
      <View style={ds.stat}><Text style={ds.statNumber}>{mine.length}</Text><Text style={ds.statLabel}>Sesi yang dihadiri</Text></View>
      <View style={ds.stat}><Text style={ds.statNumber}>{state.sessions.length}</Text><Text style={ds.statLabel}>Total sesi praktikum</Text></View>
    </View>
    {!mine.length && <EmptyState message="Belum ada catatan kehadiranmu. Buka jadwal dan lakukan presensi pada sesi yang sedang berlangsung." />}
    {state.sessions.map((session) => {
      const record = mine.find((item) => item.sessionId === session.id);
      return <Card key={session.id}>
        <Text style={ds.cardTitle}>{session.practicalName}</Text>
        <Text style={ds.small}>Tanggal sesi: {session.date} / {session.className}</Text>
        <StatusBadge status={record ? 'Hadir' : session.status === 'Selesai' ? 'Tidak presensi' : 'Belum presensi'} />
        <Text style={ds.subtitle}>{record ? `Tercatat pukul ${record.attendanceTime} WIB` : session.status === 'Berlangsung' ? 'Sesi sedang dibuka. Kamu masih dapat melakukan presensi.' : session.status === 'Selesai' ? 'Tidak ada catatan kehadiranmu pada sesi ini.' : 'Sesi belum dibuka oleh asisten.'}</Text>
        <Button label="Lihat detail" variant="secondary" onPress={() => router.push({ pathname: '/detail', params: { id: session.id } })} />
      </Card>;
    })}
  </Screen>;
}
