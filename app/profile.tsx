import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/');
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.errorText}>Kullanıcı bilgileri yüklenemedi</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Profil</Text>
          <Text style={styles.subtitle}>Hesap bilgileriniz</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.username.charAt(0).toUpperCase()}
            </Text>
          </View>

          <View style={styles.userInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Kullanıcı Adı:</Text>
              <Text style={styles.infoValue}>{user.username}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>E-posta:</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>

            {user.created_at && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Kayıt Tarihi:</Text>
                <Text style={styles.infoValue}>
                  {new Date(user.created_at).toLocaleDateString('tr-TR')}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Çıkış Yap"
            onPress={handleSignOut}
            variant="outline"
          />
          <View style={styles.buttonSpacer} />
          <Button
            title="Ana Sayfaya Dön"
            onPress={() => router.back()}
            variant="secondary"
          />
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
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userInfo: {
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
  },
  infoValue: {
    fontSize: 16,
    color: '#1C1C1E',
    flex: 1,
    textAlign: 'right',
  },
  buttonContainer: {
    gap: 12,
  },
  buttonSpacer: {
    height: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
  },
}); 