import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Card, EmptyState, Screen, SessionCard, StatusBadge } from '@/components/UI';
import { useDemo } from '@/context/DemoContext';
import { ds } from '@/styles/dashboard';
import StudentAttendanceScreen from '@/screens/StudentAttendanceScreen';

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { state, dispatch } = useDemo();
  const [confirmClose, setConfirmClose] = useState(false);
  const session = state.sessions.find((item) => item.id === id);
  const records = state.attendance.filter((record) => record.sessionId === id);
  const assistant = state.role === 'Asisten';
  return <Screen title="Detail sesi" subtitle="Informasi praktikum dan status kehadiran.">
    {session ? <>
      <SessionCard session={session} />
      {assistant ? <Card>
        <Text style={ds.cardTitle}>Kontrol sesi</Text>
        <Text style={ds.subtitle}>{session.status === 'Belum Dibuka' ? 'Buka sesi agar praktikan dapat mencatat kehadiran.' : session.status === 'Berlangsung' ? 'Presensi sedang dibuka. Tutup sesi setelah kegiatan selesai.' : 'Sesi sudah ditutup. Rekap kehadiran tetap dapat dilihat.'}</Text>
        {session.status === 'Belum Dibuka' && <Button label="Buka sesi presensi" onPress={() => dispatch({ type: 'open', sessionId: session.id })} />}
        {session.status === 'Berlangsung' && (!confirmClose ? <Button label="Tutup sesi" variant="danger" onPress={() => setConfirmClose(true)} /> : <View style={{ gap: 12 }}><Text style={ds.noticeText}>Tutup sesi sekarang? Praktikan tidak dapat presensi lagi setelah sesi ditutup.</Text><Button label="Ya, tutup sesi" variant="danger" onPress={() => { dispatch({ type: 'close', sessionId: session.id }); setConfirmClose(false); }} /><Button label="Batal" variant="secondary" onPress={() => setConfirmClose(false)} /></View>)}
      </Card> : <StudentAttendanceScreen key={`${session.id}:${state.username}`} sessionId={session.id} />}
      {assistant && <><Text style={ds.sectionTitle}>Peserta hadir ({records.length})</Text>{records.length ? records.map((record) => <Card key={record.id}><View style={ds.row}><View style={ds.grow}><Text style={ds.cardTitle}>{record.studentName}</Text><Text style={ds.small}>NIM {record.studentId}</Text></View><StatusBadge status="Hadir" /></View><Text style={ds.small}>Presensi pukul {record.attendanceTime} WIB</Text></Card>) : <EmptyState message="Belum ada peserta yang melakukan presensi pada sesi ini." />}</>}
    </> : <EmptyState message="Sesi praktikum tidak ditemukan." />}
    <Button label="Kembali ke jadwal" variant="secondary" onPress={() => router.replace('/schedule')} />
  </Screen>;
}
