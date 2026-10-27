import { Text, View } from 'react-native';
import { ds } from '@/styles/dashboard';
import type { SessionStatus } from '@/types';

export type SessionStatusBadgeProps = {
  status: SessionStatus;
};

export function SessionStatusBadge({ status }: SessionStatusBadgeProps) {
  const live = status === 'Berlangsung';
  const done = status === 'Selesai';

  return (
    <View
      accessible
      accessibilityLabel={'Status sesi: ' + status}
      accessibilityLiveRegion="polite"
      style={[ds.badge, live ? ds.liveBadge : done ? ds.doneBadge : ds.pendingBadge]}
    >
      <Text style={[ds.badgeText, live && ds.liveText, done && ds.doneText]}>{status}</Text>
    </View>
  );
}

export default SessionStatusBadge;
