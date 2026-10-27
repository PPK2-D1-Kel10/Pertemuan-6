import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';
import { theme } from './theme';

export const screenStyles = StyleSheet.create<{
  content: ViewStyle;
  column: ViewStyle;
  card: ViewStyle;
}>({
  content: { flexGrow: 1, alignItems: 'center', padding: theme.spacing.large },
  column: { width: '100%', maxWidth: 720, gap: theme.spacing.medium },
  card: {
    padding: theme.spacing.large,
    gap: theme.spacing.small,
    borderRadius: theme.radius.card,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
  },
});

export const loginStyles = StyleSheet.create<{
  page: ViewStyle; content: ViewStyle; card: ViewStyle; mark: ViewStyle;
  markText: TextStyle; eyebrow: TextStyle; title: TextStyle; subtitle: TextStyle;
  form: ViewStyle; field: ViewStyle; label: TextStyle; input: TextStyle;
  passwordRow: ViewStyle; passwordInput: TextStyle; toggle: ViewStyle; toggleText: TextStyle;
  message: TextStyle; button: ViewStyle; pressed: ViewStyle; buttonText: TextStyle;
  footer: TextStyle; caption: TextStyle;
}>({
  page: { flex: 1, backgroundColor: theme.colors.background },
  content: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 24 },
  card: { width: '100%', maxWidth: 440, backgroundColor: theme.colors.surface, borderRadius: 24, padding: 28, borderWidth: 1, borderColor: theme.colors.borderSoft },
  mark: { width: 52, height: 52, borderRadius: 16, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  markText: { color: theme.colors.surface, fontSize: 28, fontWeight: '700' },
  eyebrow: { color: theme.colors.primary, fontSize: 11, fontWeight: '700', letterSpacing: 2, marginBottom: 10 },
  title: { color: theme.colors.text, fontSize: 28, fontWeight: '700', marginBottom: 10 },
  subtitle: { color: theme.colors.muted, fontSize: 14, lineHeight: 22 },
  form: { marginTop: 28, gap: 20 },
  field: { gap: 8 },
  label: { color: theme.colors.label, fontSize: 14, fontWeight: '600' },
  input: { minHeight: 50, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, color: theme.colors.text, fontSize: 14, backgroundColor: theme.colors.input },
  passwordRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: theme.colors.border, borderRadius: 12, backgroundColor: theme.colors.input },
  passwordInput: { flex: 1, minWidth: 0, minHeight: 50, paddingHorizontal: 14, paddingVertical: 12, color: theme.colors.text, fontSize: 14 },
  toggle: { minHeight: 48, justifyContent: 'center', paddingHorizontal: 12 },
  toggleText: { color: theme.colors.primary, fontSize: 12, fontWeight: '600' },
  message: { color: theme.colors.error, fontSize: 13, lineHeight: 20 },
  button: { minHeight: 50, borderRadius: 12, backgroundColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center' },
  pressed: { opacity: 0.8 },
  buttonText: { color: theme.colors.surface, fontSize: 15, fontWeight: '700' },
  footer: { color: theme.colors.muted, fontSize: 12, lineHeight: 19, textAlign: 'center', marginTop: 24 },
  caption: { color: theme.colors.muted, fontSize: 12 },
});

