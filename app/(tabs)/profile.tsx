import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

const achievements = [
  {
    id: '1',
    title: 'Konuşma Ustası',
    description: '10 saat konuşma pratiği',
    icon: 'mic-outline' as const,
    date: '2 gün önce',
    xp: 500,
  },
  {
    id: '2',
    title: 'Kelime Avcısı',
    description: '500 kelime öğrendin',
    icon: 'book-outline' as const,
    date: '1 hafta önce',
    xp: 1000,
  },
];

const menuItems = [
  {
    id: '1',
    title: 'Başarılarım',
    icon: 'trophy-outline' as const,
    badge: '2 yeni',
  },
  {
    id: '2',
    title: 'İstatistiklerim',
    icon: 'stats-chart-outline' as const,
  },
  {
    id: '3',
    title: 'Hedeflerim',
    icon: 'flag-outline' as const,
  },
  {
    id: '4',
    title: 'Arkadaşlarım',
    icon: 'people-outline' as const,
    badge: '5 online',
  },
  {
    id: '5',
    title: 'Ayarlar',
    icon: 'settings-outline' as const,
  },
  {
    id: '6',
    title: 'Yardım',
    icon: 'help-circle-outline' as const,
  },
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage}>
            <Ionicons name="person" size={40} color="#007AFF" />
          </View>
          <View style={styles.levelBadge}>
            <ThemedText style={styles.levelText}>Lvl 12</ThemedText>
          </View>
        </View>
        <ThemedText type="title">Kullanıcı Adı</ThemedText>
        <ThemedText style={styles.subtitle}>Orta Seviye • B1</ThemedText>
      </ThemedView>

      <ThemedView style={styles.statsContainer}>
        <ThemedView style={styles.statCard}>
          <ThemedText type="defaultSemiBold">Toplam XP</ThemedText>
          <ThemedText type="title">2,450</ThemedText>
          <View style={styles.progressInfo}>
            <ThemedText style={styles.progressText}>Sonraki seviye: 550 XP</ThemedText>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: '75%' }]} />
            </View>
          </View>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.achievementsContainer}>
        <ThemedText type="subtitle">Son Başarılar</ThemedText>
        {achievements.map((achievement) => (
          <ThemedView key={achievement.id} style={styles.achievementCard}>
            <View style={styles.achievementIcon}>
              <Ionicons name={achievement.icon} size={24} color="#FFD700" />
            </View>
            <View style={styles.achievementInfo}>
              <View>
                <ThemedText type="defaultSemiBold">{achievement.title}</ThemedText>
                <ThemedText style={styles.achievementDescription}>
                  {achievement.description}
                </ThemedText>
              </View>
              <ThemedText style={styles.achievementDate}>{achievement.date}</ThemedText>
            </View>
            <View style={styles.xpBadge}>
              <ThemedText style={styles.xpText}>+{achievement.xp} XP</ThemedText>
            </View>
          </ThemedView>
        ))}
      </ThemedView>

      <ThemedView style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name={item.icon} size={24} color="#007AFF" />
              <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
            </View>
            <View style={styles.menuItemRight}>
              {item.badge && (
                <View style={styles.badge}>
                  <ThemedText style={styles.badgeText}>{item.badge}</ThemedText>
                </View>
              )}
              <Ionicons name="chevron-forward" size={24} color="#007AFF" />
            </View>
          </TouchableOpacity>
        ))}
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
    gap: 10,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    padding: 20,
  },
  statCard: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  progressInfo: {
    width: '100%',
    marginTop: 10,
    gap: 5,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  achievementsContainer: {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  achievementDescription: {
    fontSize: 12,
    color: '#666',
  },
  achievementDate: {
    fontSize: 12,
    color: '#666',
  },
  xpBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  xpText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  menuContainer: {
    padding: 20,
    gap: 15,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  badge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
}); 