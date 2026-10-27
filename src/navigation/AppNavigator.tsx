import React from 'react';
import { View, Text, StyleSheet, type TextStyle, type ViewStyle } from 'react-native';

export default function AppNavigator() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplikasi Presensi Praktikum</Text>
      <Text style={styles.subtitle}>Kerangka Dasar Siap Digunakan</Text>
    </View>
  );
}

const styles = StyleSheet.create<{
  container: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
}>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});
