export const glassTheme = {
  background: '#606B91',
  surface: 'rgba(235,239,255,0.10)',
  surfaceStrong: 'rgba(235,239,255,0.16)',
  border: 'rgba(255,255,255,0.25)',
  text: '#FFFFFF',
  muted: '#F0F2FB',
  icon: '#E4EBFF',
  primary: '#1465CF',
  drawer: '#525E80',
} as const;

export const theme = {
  colors: {
    primary: '#2563EB',
    background: '#F1F5FB',
    surface: '#FFFFFF',
    input: '#F8FAFD',
    text: '#15233B',
    label: '#263650',
    muted: '#62718A',
    placeholder: '#8390A4',
    border: '#CBD5E1',
    borderSoft: '#E1E8F2',
    error: '#B42318',
  },
  spacing: { small: 8, medium: 16, large: 24 },
  radius: { control: 12, card: 24 },
} as const;
