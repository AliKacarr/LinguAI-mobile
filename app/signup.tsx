import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../contexts/AuthContext';

export default function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { signUp, signIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user, router]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!username.trim()) {
      newErrors.username = 'Kullanıcı adı gerekli';
    } else if (username.length < 3) {
      newErrors.username = 'Kullanıcı adı en az 3 karakter olmalı';
    }

    if (!email.trim()) {
      newErrors.email = 'E-posta gerekli';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }

    if (!password) {
      newErrors.password = 'Şifre gerekli';
    } else if (password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalı';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { error } = await signUp(email, password, username);
      if (error) {
        Alert.alert('Hata', error.message || 'Kayıt olurken bir hata oluştu');
      } else {
        // Kayıt başarılıysa otomatik giriş yap
        const { error: signInError } = await signIn(email, password);
        if (signInError) {
          Alert.alert('Hata', signInError.message || 'Otomatik giriş yapılamadı');
        }
        // Yönlendirme useEffect ile olacak
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Hesap Oluştur</Text>
          <Text style={styles.subtitle}>Yeni hesabınızı oluşturun</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Kullanıcı Adı"
            value={username}
            onChangeText={setUsername}
            placeholder="Kullanıcı adınızı girin"
            error={errors.username}
            autoCapitalize="none"
          />

          <Input
            label="E-posta"
            value={email}
            onChangeText={setEmail}
            placeholder="E-posta adresinizi girin"
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Şifre"
            value={password}
            onChangeText={setPassword}
            placeholder="Şifrenizi girin"
            secureTextEntry
            error={errors.password}
          />

          <Input
            label="Şifre Tekrar"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Şifrenizi tekrar girin"
            secureTextEntry
            error={errors.confirmPassword}
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Kayıt Ol"
              onPress={handleSignUp}
              loading={loading}
            />
            <View style={styles.buttonSpacer} />
            <Button
              title="Geri Dön"
              onPress={() => router.back()}
              variant="outline"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    alignItems: 'center', // Ortala
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    marginTop: 30,
    maxWidth: 480,         // Maksimum genişlik
    width: '100%',         // Responsive
    marginHorizontal: 'auto', // Ortala (web için)
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  form: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 24,
    gap: 12,
  },
  buttonSpacer: {
    height: 8,
  },
}); 