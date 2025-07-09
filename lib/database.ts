import { supabase } from './supabase';

export interface ExampleWord {
  id: number;
  level_id: number;
  turkish: string;
  english: string;
}

export interface LanguageLevel {
  id: number;
  level: string;
}

export const getRandomWordByLevel = async (level: string): Promise<ExampleWord | null> => {
  try {
    // Önce level_id'yi al
    const { data: levelData, error: levelError } = await supabase
      .from('language_levels')
      .select('id')
      .eq('level', level)
      .single();

    if (levelError || !levelData) {
      console.error('Error fetching level:', levelError);
      return null;
    }

    // Rastgele kelime al
    const { data: wordData, error: wordError } = await supabase
      .from('example_words')
      .select('*')
      .eq('level_id', levelData.id)
      .limit(1)
      .order('id', { ascending: false })
      .limit(1000); // Büyük veri setleri için

    if (wordError || !wordData || wordData.length === 0) {
      console.error('Error fetching word:', wordError);
      return null;
    }

    // Rastgele bir kelime seç
    const randomIndex = Math.floor(Math.random() * wordData.length);
    return wordData[randomIndex];
  } catch (error) {
    console.error('Error in getRandomWordByLevel:', error);
    return null;
  }
};

export const saveExerciseResult = async (
  userId: string,
  level: string,
  word: string,
  sourceLanguage: string,
  targetLanguage: string,
  sourceSentence: string,
  userTranslation: string,
  isCorrect: boolean,
  correctTranslation?: string
) => {
  try {
    const { error } = await supabase
      .from('exercise_history')
      .insert([
        {
          user_id: userId,
          level,
          word,
          source_language: sourceLanguage,
          target_language: targetLanguage,
          source_sentence: sourceSentence,
          user_translation: userTranslation,
          is_correct: isCorrect,
          correct_translation: correctTranslation,
          completed_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('Error saving exercise result:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in saveExerciseResult:', error);
    throw error;
  }
};

export const getExerciseHistory = async (userId: string, level?: string) => {
  try {
    let query = supabase
      .from('exercise_history')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false });

    if (level) {
      query = query.eq('level', level);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching exercise history:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getExerciseHistory:', error);
    throw error;
  }
}; 