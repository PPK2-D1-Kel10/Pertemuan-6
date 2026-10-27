import { useState } from 'react';
import { router } from 'expo-router';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackgroundDecor, Button, Icon } from '@/components/UI';
import { useDemo } from '@/context/DemoContext';
import { ds } from '@/styles/dashboard';

export default function LoginScreen() {
  const { dispatch, ready } = useDemo();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  function login() {
    if (!username.trim() || !password) { setMessage('Isi NIM dan kata sandi terlebih dahulu.'); return; }
    if (password !== '12345678') { setMessage('Kata sandi salah. Silakan coba lagi.'); return; }
    dispatch({ type: 'login', username });
    setPassword(''); setMessage('');
    router.replace('/role');
  }
  return <SafeAreaView style={ds.loginPage}>
    <BackgroundDecor />
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={ds.loginContent} keyboardShouldPersistTaps="handled">
        <View style={ds.glass}>
          <View style={ds.loginAvatar}><Icon name="person" size={44} color="#1465CF" /></View>
          <View><Text accessibilityRole="header" style={ds.loginTitle}>Selamat datang</Text><Text style={ds.loginSubtitle}>Masuk ke PraktiKu dan kelola aktivitas praktikum dengan mudah.</Text></View>
          <View style={ds.loginField}><Text style={ds.loginLabel}>NIM / Username</Text><View style={ds.passwordRow}>
            <TextInput accessibilityLabel="NIM atau username" style={ds.loginInput} placeholder="Masukkan NIM" placeholderTextColor="#E0E5F4" value={username}
              onChangeText={(value) => { setUsername(value); setMessage(''); }} autoCapitalize="none" autoCorrect={false} autoComplete="username" />
          </View></View>
          <View style={ds.loginField}><Text style={ds.loginLabel}>Kata sandi</Text><View style={ds.passwordRow}>
            <TextInput accessibilityLabel="Kata sandi" style={ds.loginInput} placeholder="Masukkan kata sandi" placeholderTextColor="#E0E5F4" value={password}
              onChangeText={(value) => { setPassword(value); setMessage(''); }} secureTextEntry={!visible} autoCapitalize="none" autoCorrect={false} autoComplete="current-password" returnKeyType="go" onSubmitEditing={() => { if (ready) login(); }} />
            <Pressable accessibilityRole="button" accessibilityLabel={visible ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'} onPress={() => setVisible(!visible)} style={ds.toggle}><Icon name={visible ? 'eye-off-outline' : 'eye-outline'} color="#FFFFFF" size={20} /></Pressable>
          </View></View>
          {message ? <Text accessibilityRole="alert" style={ds.loginError}>{message}</Text> : null}
          <Button label="Masuk" onPress={login} disabled={!ready} />
          <Pressable accessibilityRole="button" onPress={() => setMessage('Hubungi pengelola praktikum untuk bantuan kata sandi.')}><Text style={ds.loginHint}>Lupa kata sandi?</Text></Pressable>
        </View>
        <Text style={[ds.loginHint, { marginTop: 24 }]}>PraktiKu / Hadir, belajar, berkembang.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}
