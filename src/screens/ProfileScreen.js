import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/default-avatar.png')} 
          style={styles.avatar}
          defaultSource={require('../../assets/images/default-avatar.png')}
        />
        <View style={styles.userInfoRow}>
          <Text style={styles.username}>Kullanıcı Adı</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelBadgeText}>Lvl 12</Text>
          </View>
        </View>
        <Text style={styles.level}>Orta Seviye • B1</Text>
      </View>

      {isLoggedIn ? (
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Toplam XP</Text>
            <Text style={styles.statsValue}>2,450</Text>
            <Text style={styles.statsSubtitle}>Sonraki seviye: 550 XP</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: '80%' }]} />
            </View>
          </View>
          <View style={styles.achievementsRow}>
            <View style={styles.achievementCard}>
              <Text style={styles.achievementTitle}>Konuşma Ustası</Text>
              <Text style={styles.achievementDesc}>10 saat konuşma pratiği</Text>
              <Text style={styles.achievementXP}>+500 XP</Text>
            </View>
            <View style={styles.achievementCard}>
              <Text style={styles.achievementTitle}>Kelime Avcısı</Text>
              <Text style={styles.achievementDesc}>500 kelime öğrendin</Text>
              <Text style={styles.achievementXP}>+1000 XP</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => setIsLoggedIn(false)}
          >
            <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.authContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.authTitle}>Hesabınız yok mu?</Text>
            <Text style={styles.authSubtitle}>Giriş yapın veya yeni hesap oluşturun. Profilinizi kişiselleştirin, başarılarınızı takip edin!</Text>
          </View>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Giriş Yap</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.registerButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.buttonText}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  level: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  statsContainer: {
    padding: 20,
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  statsSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
  },
  progress: {
    height: 6,
    backgroundColor: '#4285F4',
    borderRadius: 3,
  },
  authContainer: {
    padding: 20,
    alignItems: 'center',
  },
  authTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  authSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#4285F4',
    borderRadius: 8,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: '#34A853',
    borderRadius: 8,
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#EA4335',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  levelBadge: {
    backgroundColor: '#4285F4',
    borderRadius: 12,
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  levelBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  achievementsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  achievementCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
    elevation: 2,
  },
  achievementTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
    textAlign: 'center',
  },
  achievementXP: {
    color: '#34A853',
    fontWeight: 'bold',
    fontSize: 13,
  },
  infoBox: {
    backgroundColor: '#e3f0ff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default ProfileScreen;