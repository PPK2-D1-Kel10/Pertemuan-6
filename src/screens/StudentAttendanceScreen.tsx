import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Card, EmptyState, StatusBadge } from '@/components/UI';
import { useDemo } from '@/context/DemoContext';
import { ds } from '@/styles/dashboard';
import { glassTheme } from '@/styles/theme';
import { formatAttendanceTime, validateAttendance } from '@/utils/attendanceValidation';

// Embedded in DetailScreen so the existing route and session card stay shared.
export default function StudentAttendanceScreen({ sessionId }: { sessionId: string }) {
  const { state, dispatch } = useDemo();
  const [confirming, setConfirming] = useState(false);
  const session = state.sessions.find((item) => item.id === sessionId);
  const mine = state.attendance.find((record) => record.sessionId === sessionId && record.studentId === state.username);
  const validation = validateAttendance({ studentId: state.username, role: state.role, session, attendance: state.attendance });
  if (!session) return <EmptyState message="Sesi praktikum tidak ditemukan." />;

  const close = () => setConfirming(false);
  const confirm = () => {
    if (!confirming || !validation.valid) return;
    dispatch({ type: 'attend', sessionId, time: formatAttendanceTime(new Date()) });
    close();
  };

  return <Card>
    <Text style={ds.cardTitle}>Presensi saya</Text>
    <Text style={ds.small}>NIM {state.username}</Text>
    {mine ? <View style={ds.success} accessibilityLiveRegion="polite">
      <Text style={ds.successText}>Kehadiran berhasil tercatat</Text>
      <Text style={ds.successText}>NIM {mine.studentId} / {mine.attendanceTime} WIB</Text>
    </View> : <>
      <StatusBadge status={session.status === 'Selesai' ? 'Tidak presensi' : 'Belum presensi'} />
      <Text style={ds.subtitle}>{validation.valid ? 'Konfirmasi kehadiranmu satu kali pada sesi ini.' : validation.message}</Text>
    </>}
    <Button label={mine ? 'Sudah presensi' : 'Presensi sekarang'} disabled={!validation.valid} onPress={() => setConfirming(true)} />
    <Modal visible={confirming} transparent animationType="fade" onRequestClose={close}>
      <View style={styles.overlay}>
        <Pressable style={ds.scrim} accessibilityRole="button" accessibilityLabel="Batalkan presensi" onPress={close} />
        <View style={styles.dialog} accessibilityViewIsModal>
          <ScrollView contentContainerStyle={styles.dialogContent}>
            <Text accessibilityRole="header" style={ds.cardTitle}>Konfirmasi presensi</Text>
            <Text style={ds.subtitle}>{session.practicalName} / {session.className}</Text>
            <Text style={ds.small}>NIM {state.username} / Status sesi: {session.status}</Text>
            <Text style={ds.noticeText} accessibilityLiveRegion="polite">{validation.valid ? 'Catat kehadiran sekarang? Waktu presensi dicatat saat kamu mengonfirmasi.' : validation.message}</Text>
            <Button label="Ya, catat kehadiran" disabled={!validation.valid} onPress={confirm} />
            <Button label="Batal" variant="secondary" onPress={close} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  </Card>;
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  dialog: { width: '100%', maxWidth: 440, maxHeight: '90%', backgroundColor: glassTheme.drawer, borderRadius: 28, borderWidth: 1, borderColor: glassTheme.border },
  dialogContent: { padding: 24, gap: 16 },
});
