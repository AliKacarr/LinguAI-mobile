import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

const lessons = [
  {
    id: '1',
    title: 'Temel Kelimeler',
    level: 'Başlangıç',
    icon: 'book-outline' as const,
    progress: 60,
    totalLessons: 10,
    completedLessons: 6,
    xp: 50,
    duration: '10dk',
  },
  {
    id: '2',
    title: 'Günlük Konuşmalar',
    level: 'Orta',
    icon: 'chatbubble-outline' as const,
    progress: 30,
    totalLessons: 15,
    completedLessons: 4,
    xp: 75,
    duration: '15dk',
  },
  {
    id: '3',
    title: 'İş İngilizcesi',
    level: 'İleri',
    icon: 'business-outline' as const,
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    xp: 100,
    duration: '20dk',
    locked: true,
  },
];

export default function LessonsScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Dersler</ThemedText>
        <ThemedText type="subtitle">Öğrenmeye başla</ThemedText>
      </ThemedView>

      <ThemedView style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, styles.filterButtonActive]}>
          <ThemedText style={styles.filterButtonText}>Tümü</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <ThemedText style={styles.filterButtonText}>Başlangıç</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <ThemedText style={styles.filterButtonText}>Orta</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <ThemedText style={styles.filterButtonText}>İleri</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.lessonContainer}>
        {lessons.map((lesson) => (
          <TouchableOpacity 
            key={lesson.id} 
            style={[styles.lessonCard, lesson.locked && styles.lockedCard]}
            disabled={lesson.locked}
          >
            <View style={styles.lessonHeader}>
              <View style={styles.lessonInfo}>
                <Ionicons name={lesson.icon} size={24} color="#007AFF" />
                <View>
                  <ThemedText type="defaultSemiBold">{lesson.title}</ThemedText>
                  <ThemedText style={styles.levelText}>Seviye: {lesson.level}</ThemedText>
                </View>
              </View>
              {lesson.locked ? (
                <Ionicons name="lock-closed" size={24} color="#666" />
              ) : (
                <Ionicons name="chevron-forward" size={24} color="#007AFF" />
              )}
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${lesson.progress}%` }]} />
              </View>
              <ThemedText style={styles.progressText}>
                {lesson.completedLessons}/{lesson.totalLessons} ders tamamlandı
              </ThemedText>
            </View>

            <View style={styles.lessonFooter}>
              <View style={styles.footerInfo}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <ThemedText style={styles.footerText}>{lesson.duration}</ThemedText>
              </View>
              <View style={styles.footerInfo}>
                <Ionicons name="star-outline" size={16} color="#666" />
                <ThemedText style={styles.footerText}>+{lesson.xp} XP</ThemedText>
              </View>
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
    gap: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
    justifyContent: 'center',
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
  },
  lessonContainer: {
    padding: 20,
    gap: 15,
  },
  lessonCard: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    gap: 15,
  },
  lockedCard: {
    opacity: 0.7,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  levelText: {
    fontSize: 12,
    color: '#666',
  },
  progressContainer: {
    gap: 5,
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
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  lessonFooter: {
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
}); 