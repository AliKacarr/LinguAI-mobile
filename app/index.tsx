import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Platform, StatusBar as RNStatusBar, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = 'Hoş Geldiniz';
    }
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      {user && (
        <View style={styles.headerBar}>
          <Text style={styles.headerUsername}>{user.username}</Text>
          <Button
            title="Profil"
            onPress={() => router.push('/profile')}
            variant="primary"
          />
        </View>
      )}
      <View style={styles.content}>
        {user ? (
          <>
            <Text style={styles.levelsDescription}>
              Çalışmak için bir seviye seçin
            </Text>
            <View style={styles.levelsContainer}>
              {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((level, idx) => {
                const boxColors = [
                  styles.levelBoxA1,
                  styles.levelBoxA2,
                  styles.levelBoxB1,
                  styles.levelBoxB2,
                  styles.levelBoxC1,
                  styles.levelBoxC2,
                ];
                return (
                  <TouchableOpacity
                    key={level}
                    style={[styles.levelBox, boxColors[idx]]}
                    onPress={() => router.push({ pathname: '/level/[level]', params: { level } })}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.levelButtonText}>{level}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        ) : (
          <View style={styles.header}>
            <Text style={styles.title}>LinguAI</Text>
            <Text style={styles.subtitle}>
              Hesabınıza giriş yapın veya yeni hesap oluşturun
            </Text>
            <View style={styles.buttonRow}>
              <Button
                title="Giriş Yap"
                onPress={() => router.push('/signin')}
                variant="primary"
              />
              <View style={styles.buttonSpacerHorizontal} />
              <Button
                title="Kayıt Ol"
                onPress={() => router.push('/signup')}
                variant="outline"
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    maxWidth: 480,         // Eklendi: Maksimum genişlik
    width: '100%',         // Eklendi: Responsive
    marginHorizontal: 'auto', // Eklendi: Ortala (web için)
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 16,
  },
  buttonSpacer: {
    height: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  headerBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight || 24 : 12,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    zIndex: 10,
  },
  headerUsername: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  headerProfileButton: {
    minWidth: 64,
    minHeight: 36,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-end',
  },
  levelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginTop: 32,
    marginBottom: 24,
  },
  levelBox: {
    width: 90,
    height: 90,
    borderRadius: 16,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  levelBoxA1: { backgroundColor: '#FF5252' }, // canlı kırmızı
  levelBoxA2: { backgroundColor: '#FFB300' }, // canlı turuncu
  levelBoxB1: { backgroundColor: '#00C853' }, // canlı yeşil
  levelBoxB2: { backgroundColor: '#2979FF' }, // canlı mavi
  levelBoxC1: { backgroundColor: '#FFD600' }, // canlı sarı
  levelBoxC2: { backgroundColor: '#7C4DFF' }, // canlı mor
  levelButton: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  levelsDescription: {
    fontSize: 18,
    color: '#444',
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 2,
    fontWeight: '500',
  },
  levelButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    gap: 16,
  },
  buttonSpacerHorizontal: {
    width: 16,
  },
}); 