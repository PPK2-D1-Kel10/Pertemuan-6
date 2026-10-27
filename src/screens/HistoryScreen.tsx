import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Button, Card, Screen, StatusBadge } from '@/components/UI';
import { useDemo } from '@/context/DemoContext';
import { ds } from '@/styles/dashboard';

export default function HistoryScreen() {
  const { state } = useDemo();
  const assistant = state.role === 'Asisten';
  const mine = state.attendance.filter((record) => record.studentId === state.username);
  return <Screen title={assistant ? 'Rekap kehadiran' : 'Riwayat & status presensi'} subtitle={assistant ? 'Jumlah peserta hadir dan detail catatan untuk setiap sesi.' : 'Periksa kehadiranmu pada setiap sesi praktikum.'}>
    <View style={ds.stats}><View style={ds.stat}><Text style={ds.statNumber}>{assistant ? state.attendance.length : mine.length}</Text><Text style={ds.statLabel}>{assistant ? 'Total catatan kehadiran' : 'Sesi yang dihadiri'}</Text></View><View style={ds.stat}><Text style={ds.statNumber}>{state.sessions.length}</Text><Text style={ds.statLabel}>Total sesi praktikum</Text></View></View>
    {state.sessions.map((session) => {
      const records = state.attendance.filter((record) => record.sessionId === session.id);
      const record = mine.find((item) => item.sessionId === session.id);
      return <Card key={session.id}>
        <Text style={ds.cardTitle}>{session.practicalName}</Text><Text style={ds.small}>{session.date} / {session.className}</Text>
        <StatusBadge status={assistant ? session.status : record ? 'Hadir' : session.status === 'Selesai' ? 'Tidak presensi' : 'Belum presensi'} />
        <Text style={ds.subtitle}>{assistant ? `${records.length} peserta sudah melakukan presensi.` : record ? `Tercatat pukul ${record.attendanceTime} WIB` : session.status === 'Berlangsung' ? 'Sesi sedang dibuka. Kamu masih dapat melakukan presensi.' : session.status === 'Selesai' ? 'Tidak ada catatan kehadiranmu pada sesi ini.' : 'Sesi belum dibuka oleh asisten.'}</Text>
        <Button label={assistant ? 'Lihat peserta' : 'Lihat detail'} variant="secondary" onPress={() => router.push({ pathname: '/detail', params: { id: session.id } })} />
      </Card>;
    })}
    {assistant && <Text style={ds.small}>Rekap menghitung presensi yang tercatat. Daftar peserta terdaftar belum tersedia untuk menghitung ketidakhadiran.</Text>}
  </Screen>;
}
