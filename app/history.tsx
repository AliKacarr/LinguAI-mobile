import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { getExerciseHistory } from '../lib/database';

interface ExerciseHistoryItem {
  id: number;
  level: string;
  word: string;
  source_language: string;
  target_language: string;
  source_sentence: string;
  user_translation: string;
  is_correct: boolean;
  correct_translation?: string;
  completed_at: string;
}

export default function HistoryScreen() {
  const { level } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [history, setHistory] = useState<ExerciseHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadHistory = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getExerciseHistory(user!.id, level as string);
      setHistory(data || []);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user, level]);

  useEffect(() => {
    if (!user) {
      router.back();
      return;
    }
    loadHistory();
  }, [user, level, router, loadHistory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderHistoryItem = ({ item }: { item: ExerciseHistoryItem }) => (
    <View style={styles.historyItem}>
      <View style={styles.itemHeader}>
        <Text style={styles.wordText}>{item.word}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: item.is_correct ? '#4CAF50' : '#F44336' }
        ]}>
          <Text style={styles.statusText}>
            {item.is_correct ? 'Doğru' : 'Yanlış'}
          </Text>
        </View>
      </View>
      
      <View style={styles.exerciseDetails}>
        <Text style={styles.languageText}>
          {item.source_language} → {item.target_language}
        </Text>
        <Text style={styles.sentenceText}>
          <Text style={styles.label}>Kaynak: </Text>
          {item.source_sentence}
        </Text>
        <Text style={styles.sentenceText}>
          <Text style={styles.label}>Çeviriniz: </Text>
          {item.user_translation}
        </Text>
        {!item.is_correct && item.correct_translation && (
          <Text style={[styles.sentenceText, styles.correctTranslation]}>
            <Text style={styles.label}>Doğru: </Text>
            {item.correct_translation}
          </Text>
        )}
      </View>
      
      <Text style={styles.dateText}>{formatDate(item.completed_at)}</Text>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Geçmiş yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerSafeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Geçmiş Egzersizler {level && `- ${level}`}
          </Text>
          <Text style={styles.subtitle}>
            {history.length} egzersiz tamamlandı
          </Text>
        </View>
      </View>
      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Henüz egzersiz geçmişiniz bulunmuyor.
          </Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => router.push({
              pathname: '/exercise',
              params: { level: level as string }
            })}
          >
            <Text style={styles.startButtonText}>İlk Egzersizi Başlat</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 24,
  },
  startButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    padding: 24,
    paddingTop: 0,
  },
  historyItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  wordText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  exerciseDetails: {
    marginBottom: 12,
  },
  languageText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
    fontWeight: '500',
  },
  sentenceText: {
    fontSize: 14,
    color: '#1C1C1E',
    lineHeight: 20,
    marginBottom: 4,
  },
  label: {
    fontWeight: '600',
    color: '#8E8E93',
  },
  correctTranslation: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  dateText: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'right',
  },
  headerSafeArea: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 12,
  },
}); 