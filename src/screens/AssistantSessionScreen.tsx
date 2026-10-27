import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SessionStatusBadge } from '@/components/SessionStatusBadge';
import { Button, Card, EmptyState, Icon, Screen } from '@/components/UI';
import { useDemo } from '@/context/DemoContext';
import { ds } from '@/styles/dashboard';
import type { SessionStatus } from '@/types';

const filters: ('Semua' | SessionStatus)[] = ['Semua', 'Belum Dibuka', 'Berlangsung', 'Selesai'];

export default function AssistantSessionScreen() {
  const { state, dispatch } = useDemo();
  const [filter, setFilter] = useState<(typeof filters)[number]>('Semua');
  const [closingSessionId, setClosingSessionId] = useState<string | null>(null);
  const sessions = state.sessions.filter((session) => filter === 'Semua' || session.status === filter);

  return (
    <Screen title="Kelola sesi" subtitle="Buka presensi, pantau peserta, dan tutup sesi praktikum.">
      {state.role !== 'Asisten' ? (
        <EmptyState message="Kontrol sesi hanya tersedia untuk asisten." />
      ) : (
        <>
          <View style={ds.stats}>
            <View style={ds.stat}>
              <Text style={ds.statNumber}>{state.sessions.length}</Text>
              <Text style={ds.statLabel}>Total sesi praktikum</Text>
            </View>
            <View style={ds.stat}>
              <Text style={ds.statNumber}>{state.sessions.filter((session) => session.status === 'Berlangsung').length}</Text>
              <Text style={ds.statLabel}>Sesi presensi dibuka</Text>
            </View>
          </View>
          <View style={ds.filters}>
            {filters.map((item) => (
              <Pressable
                key={item}
                accessibilityRole="button"
                accessibilityState={{ selected: filter === item }}
                onPress={() => { setFilter(item); setClosingSessionId(null); }}
                style={[ds.filter, filter === item && ds.filterActive]}
              >
                <Text style={[ds.filterText, filter === item && ds.filterActiveText]}>{item}</Text>
              </Pressable>
            ))}
          </View>
          {sessions.length ? sessions.map((session) => {
            const attendanceCount = state.attendance.filter((record) => record.sessionId === session.id).length;
            return (
              <Card key={session.id}>
                <View style={ds.sessionHeader}>
                  <View style={ds.iconButton}><Icon name="calendar-outline" /></View>
                  <View style={ds.grow}>
                    <Text style={ds.cardTitle}>{session.practicalName}</Text>
                    <Text style={ds.small}>{session.className}</Text>
                  </View>
                </View>
                <SessionStatusBadge status={session.status} />
                <Text style={ds.small}>{session.date} / {session.startTime} - {session.endTime} WIB</Text>
                <Text style={ds.subtitle}>{attendanceCount} peserta sudah melakukan presensi.</Text>
                {session.status === 'Belum Dibuka' && (
                  <>
                    <Text style={ds.small}>Buka sesi agar praktikan dapat mencatat kehadiran.</Text>
                    <Button label="Buka sesi presensi" onPress={() => {
                      dispatch({ type: 'open', sessionId: session.id });
                      setClosingSessionId(null);
                    }} />
                  </>
                )}
                {session.status === 'Berlangsung' && (
                  closingSessionId === session.id ? (
                    <View style={ds.notice} accessibilityLiveRegion="polite">
                      <Text style={ds.noticeText}>Tutup sesi {session.practicalName}? Praktikan tidak dapat presensi lagi dan sesi tidak dapat dibuka kembali.</Text>
                      <View style={ds.column}>
                        <Button label="Ya, tutup sesi" variant="danger" onPress={() => {
                          dispatch({ type: 'close', sessionId: session.id });
                          setClosingSessionId(null);
                        }} />
                        <Button label="Batal" variant="secondary" onPress={() => setClosingSessionId(null)} />
                      </View>
                    </View>
                  ) : (
                    <Button label="Tutup sesi" variant="danger" onPress={() => setClosingSessionId(session.id)} />
                  )
                )}
                {session.status === 'Selesai' && <Text style={ds.small}>Sesi sudah ditutup. Catatan kehadiran tetap tersedia di rekap.</Text>}
                <Button label="Lihat rekap kehadiran" variant="secondary" onPress={() => router.push({
                  pathname: '/history', params: { id: session.id },
                })} />
              </Card>
            );
          }) : <EmptyState message="Tidak ada sesi dengan status ini." />}
        </>
      )}
    </Screen>
  );
}
