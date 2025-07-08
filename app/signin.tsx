import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../contexts/AuthContext';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { signIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user, router]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email.trim()) {
      newErrors.email = 'E-posta gerekli';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }

    if (!password) {
      newErrors.password = 'Şifre gerekli';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        Alert.alert('Hata', error.message || 'Giriş yaparken bir hata oluştu');
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
          <Text style={styles.title}>Giriş Yap</Text>
          <Text style={styles.subtitle}>Hesabınıza giriş yapın</Text>
        </View>

        <View style={styles.form}>
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

          <View style={styles.buttonContainer}>
            <Button
              title="Giriş Yap"
              onPress={handleSignIn}
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
    marginTop: 100,
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