import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

const practiceItems = [
  {
    id: '1',
    title: 'Kelime Eşleştirme',
    description: 'Kelimeleri doğru çevirileriyle eşleştir',
    icon: 'link-outline' as const,
    duration: '5dk',
    xp: 20,
    lastUsed: '2 saat önce',
  },
  {
    id: '2',
    title: 'Dinleme Alıştırması',
    description: 'Ses kaydını dinle ve soruları yanıtla',
    icon: 'headset-outline' as const,
    duration: '10dk',
    xp: 30,
    lastUsed: 'Dün',
  },
  {
    id: '3',
    title: 'Konuşma Pratiği',
    description: 'Yapay zeka ile konuşma pratiği yap',
    icon: 'mic-outline' as const,
    duration: '15dk',
    xp: 50,
    lastUsed: '3 gün önce',
  },
];

export default function PracticeScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Pratik Yap</ThemedText>
        <ThemedText type="subtitle">Becerilerini geliştir</ThemedText>
      </ThemedView>

      <ThemedView style={styles.statsContainer}>
        <ThemedView style={styles.statCard}>
          <ThemedText type="defaultSemiBold">Toplam Pratik</ThemedText>
          <ThemedText type="title">12 saat</ThemedText>
          <ThemedText style={styles.statSubtext}>Bu ay</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statCard}>
          <ThemedText type="defaultSemiBold">Konuşma Süresi</ThemedText>
          <ThemedText type="title">45 dk</ThemedText>
          <ThemedText style={styles.statSubtext}>Bu hafta</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.practiceContainer}>
        {practiceItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.practiceCard}>
            <View style={styles.practiceHeader}>
              <View style={styles.practiceInfo}>
                <Ionicons name={item.icon} size={24} color="#007AFF" />
                <View>
                  <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
                  <ThemedText style={styles.descriptionText}>{item.description}</ThemedText>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#007AFF" />
            </View>

            <View style={styles.divider} />

            <View style={styles.practiceFooter}>
              <View style={styles.footerInfo}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <ThemedText style={styles.footerText}>{item.duration}</ThemedText>
              </View>
              <View style={styles.footerInfo}>
                <Ionicons name="star-outline" size={16} color="#666" />
                <ThemedText style={styles.footerText}>+{item.xp} XP</ThemedText>
              </View>
              <View style={styles.footerInfo}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <ThemedText style={styles.footerText}>{item.lastUsed}</ThemedText>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ThemedView>

      <ThemedView style={styles.achievementContainer}>
        <ThemedText type="subtitle">Son Başarılar</ThemedText>
        <ThemedView style={styles.achievementCard}>
          <View style={styles.achievementIcon}>
            <Ionicons name="trophy" size={24} color="#FFD700" />
          </View>
          <View style={styles.achievementInfo}>
            <ThemedText type="defaultSemiBold">Konuşma Ustası</ThemedText>
            <ThemedText style={styles.achievementText}>10 saat konuşma pratiği yaptın!</ThemedText>
          </View>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  statSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  practiceContainer: {
    padding: 20,
    gap: 15,
  },
  practiceCard: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    gap: 15,
  },
  practiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  practiceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  descriptionText: {
    fontSize: 12,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  practiceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  },
  achievementContainer: {
    padding: 20,
    gap: 10,
  },
  achievementCard: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    gap: 15,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF8E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementText: {
    fontSize: 12,
    color: '#666',
  },
}); 