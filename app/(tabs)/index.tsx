import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HomeScreen() {
  const progress = 75; // Yüzdelik ilerleme

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">LinguAI</ThemedText>
        <ThemedText type="subtitle">Dil öğrenmeyi kolaylaştırıyoruz</ThemedText>
      </ThemedView>

      <ThemedView style={styles.progressContainer}>
        <ThemedView style={styles.progressInfo}>
          <ThemedText type="defaultSemiBold">Günlük İlerleme</ThemedText>
          <ThemedText type="subtitle">{progress}%</ThemedText>
        </ThemedView>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        <ThemedText style={styles.motivationText}>
          Harika gidiyorsun! Günlük hedefine çok yaklaştın.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.statsContainer}>
        <ThemedView style={styles.statCard}>
          <ThemedText type="defaultSemiBold">Günlük Hedef</ThemedText>
          <ThemedText type="title">15/20 dk</ThemedText>
          <ThemedText style={styles.streakText}>🔥 3 günlük seri</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statCard}>
          <ThemedText type="defaultSemiBold">Kelime Havuzu</ThemedText>
          <ThemedText type="title">250</ThemedText>
          <ThemedText style={styles.streakText}>📈 Bu hafta +25</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(tabs)/lessons')}>
          <Ionicons name="book-outline" size={24} color="#007AFF" />
          <ThemedText type="defaultSemiBold">Dersler</ThemedText>
          <ThemedText style={styles.menuItemSubtext}>4 ders bekliyor</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(tabs)/practice')}>
          <Ionicons name="chatbubble-outline" size={24} color="#007AFF" />
          <ThemedText type="defaultSemiBold">Konuşma Pratiği</ThemedText>
          <ThemedText style={styles.menuItemSubtext}>AI ile pratik yap</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="flash-outline" size={24} color="#007AFF" />
          <ThemedText type="defaultSemiBold">Hızlı Test</ThemedText>
          <ThemedText style={styles.menuItemSubtext}>5dk'lık mini test</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(tabs)/profile')}>
          <Ionicons name="trophy-outline" size={24} color="#007AFF" />
          <ThemedText type="defaultSemiBold">Başarılarım</ThemedText>
          <ThemedText style={styles.menuItemSubtext}>2 yeni başarı</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.recommendationContainer}>
        <ThemedView style={styles.recommendationHeader}>
          <ThemedText type="subtitle">Günün Önerisi</ThemedText>
          <TouchableOpacity>
            <Ionicons name="refresh-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
        </ThemedView>
        <TouchableOpacity style={styles.recommendationCard} onPress={() => router.push('/(tabs)/lessons')}>
          <View style={styles.recommendationContent}>
            <View>
              <ThemedText type="defaultSemiBold">Temel Kelimeler</ThemedText>
              <ThemedText>Günlük hayatta en çok kullanılan 50 kelimeyi öğren</ThemedText>
            </View>
            <View style={styles.recommendationBadge}>
              <ThemedText style={styles.badgeText}>10dk</ThemedText>
            </View>
          </View>
          <View style={styles.recommendationProgress}>
            <ThemedText style={styles.progressText}>Tahmini süre: 10 dakika</ThemedText>
            <ThemedText style={styles.xpText}>+50 XP</ThemedText>
          </View>
        </TouchableOpacity>
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
  progressContainer: {
    padding: 20,
    gap: 10,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  motivationText: {
    fontSize: 14,
    color: '#4CAF50',
    textAlign: 'center',
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
  streakText: {
    fontSize: 12,
    marginTop: 5,
    color: '#666',
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 15,
  },
  menuItem: {
    width: '45%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    gap: 10,
  },
  menuItemSubtext: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  recommendationContainer: {
    padding: 20,
    gap: 10,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recommendationCard: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    gap: 10,
  },
  recommendationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  recommendationBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  recommendationProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  xpText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});
