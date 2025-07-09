import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../lib/supabase';

interface Word {
  id: number;
  turkish: string;
  english: string;
}

export default function WordsScreen() {
  const { level } = useLocalSearchParams();
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      setLoading(true);
      // Önce level_id'yi bul
      const { data: levelData, error: levelError } = await supabase
        .from('language_levels')
        .select('id')
        .eq('level', level)
        .single();
      if (levelError || !levelData) {
        setWords([]);
        setLoading(false);
        return;
      }
      // Sonra kelimeleri çek
      const { data, error } = await supabase
        .from('example_words')
        .select('id, turkish, english')
        .eq('level_id', levelData.id);
      if (!error && data) {
        setWords(data);
      } else {
        setWords([]);
      }
      setLoading(false);
    };
    fetchWords();
  }, [level]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{level} Seviyesi Kelimeleri</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#2196F3" style={{ marginTop: 32 }} />
      ) : words.length === 0 ? (
        <Text style={styles.emptyText}>Bu seviyede kelime bulunamadı.</Text>
      ) : (
        <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.gridContainer}>
            {words.map((item) => (
              <View key={item.id} style={styles.wordCard}>
                <Text style={styles.wordTr} numberOfLines={2} ellipsizeMode="tail">{item.turkish}</Text>
                <Text style={styles.wordEn} numberOfLines={2} ellipsizeMode="tail">{item.english}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 5,
    marginTop: (typeof window !== 'undefined') ? 10 : 0,
    textAlign: 'center',
    letterSpacing: 1,
  },
  listContent: {
    paddingBottom: 32,
  },
  scrollArea: {
    flex: 1,
    width: '100%',
    // overflow: 'scroll', // kaldırıldı
  },
  scrollContent: {
    flexGrow: 1,
  },
  gridContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
    rowGap: 24,
    columnGap: 24,
    flexGrow: 1,
    marginTop: 15,
    marginBottom: 32,
  },
  wordCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginTop: 0,
    marginBottom: 0,
    width: '90%',
    maxWidth: 300,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wordTr: {
    fontSize: 20,
    color: '#1C1C1E',
    fontWeight: '600',
    flexShrink: 1,
    flexWrap: 'wrap',
    textAlign: 'left',
  },
  wordEn: {
    fontSize: 20,
    color: '#2196F3',
    fontWeight: '600',
    flexShrink: 1,
    flexWrap: 'wrap',
    textAlign: 'right',
    marginLeft: 8,
  },
  emptyText: {
    color: '#8E8E93',
    fontSize: 16,
    marginTop: 32,
    textAlign: 'center',
  },
}); 