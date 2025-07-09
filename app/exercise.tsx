import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { getRandomWordByLevel, saveExerciseResult } from '../lib/database';
import { checkTranslation, generateSentence } from '../lib/gemini';

interface ExerciseState {
  currentWord: any;
  sourceLanguage: string;
  targetLanguage: string;
  sourceSentence: string;
  userTranslation: string;
  isChecking: boolean;
  result: string;
  showResult: boolean;
  isLoading: boolean;
}

export default function ExerciseScreen() {
  const { level } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [exerciseState, setExerciseState] = useState<ExerciseState>({
    currentWord: null,
    sourceLanguage: '',
    targetLanguage: '',
    sourceSentence: '',
    userTranslation: '',
    isChecking: false,
    result: '',
    showResult: false,
    isLoading: true,
  });

  const loadNewExercise = React.useCallback(async () => {
    try {
      setExerciseState(prev => ({ ...prev, isLoading: true, showResult: false }));
      
      // API test
      // console.log('🧪 API test başlatılıyor...');
      // const apiTest = await testGeminiAPI();
      // console.log('🧪 API test sonucu:', apiTest);
      
      // if (!apiTest) {
      //   console.error('❌ API test başarısız');
      //   Alert.alert(
      //     'Gemini API Hatası', 
      //     'Gemini API bağlantısında sorun var. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.'
      //   );
      //   setExerciseState(prev => ({ ...prev, isLoading: false }));
      //   return;
      // }
      
      // console.log('✅ API test başarılı, kelime yükleniyor...');
      
      // Rastgele kelime al
      // console.log('📚 Kelime yükleniyor, seviye:', level);
      const word = await getRandomWordByLevel(level as string);
      // console.log('📚 Yüklenen kelime:', word);
      
      if (!word) {
        console.error('❌ Kelime yüklenemedi');
        Alert.alert('Hata', 'Kelime yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
        setExerciseState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      // Rastgele dil seçimi
      const isTurkishSource = Math.random() > 0.5;
      const sourceLanguage = isTurkishSource ? 'Turkish' : 'English';
      const targetLanguage = isTurkishSource ? 'English' : 'Turkish';
      const sourceWord = isTurkishSource ? word.turkish : word.english;
      
      // console.log('🌍 Dil seçimi:', {
      //   sourceLanguage,
      //   targetLanguage,
      //   sourceWord,
      //   isTurkishSource
      // });

      // Cümle oluştur
      // console.log('📝 Cümle oluşturuluyor...');
      const sentence = await generateSentence(sourceLanguage, sourceWord, level as string);
      // console.log('📝 Oluşturulan cümle:', sentence);
      
      setExerciseState(prev => ({
        ...prev,
        currentWord: word,
        sourceLanguage,
        targetLanguage,
        sourceSentence: sentence,
        userTranslation: '',
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error loading exercise:', error);
      Alert.alert('Hata', 'Egzersiz yüklenirken bir hata oluştu');
      setExerciseState(prev => ({ ...prev, isLoading: false }));
    }
  }, [level]);

  useEffect(() => {
    if (!user) {
      Alert.alert('Hata', 'Lütfen önce giriş yapın');
      router.back();
      return;
    }
    loadNewExercise();
  }, [user, router, loadNewExercise]);

  const handleCheckTranslation = async () => {
    if (!exerciseState.userTranslation.trim()) {
      Alert.alert('Uyarı', 'Lütfen çevirinizi girin');
      return;
    }

    try {
      setExerciseState(prev => ({ ...prev, isChecking: true }));
      
      const result = await checkTranslation(
        exerciseState.sourceSentence,
        exerciseState.userTranslation,
        exerciseState.sourceLanguage,
        exerciseState.targetLanguage
      );

      const isCorrect = result.trim().toLowerCase() === 'true';
      
      // Sonucu kaydet
      await saveExerciseResult(
        user!.id,
        level as string,
        exerciseState.currentWord.turkish,
        exerciseState.sourceLanguage,
        exerciseState.targetLanguage,
        exerciseState.sourceSentence,
        exerciseState.userTranslation,
        isCorrect,
        isCorrect ? undefined : result
      );

      setExerciseState(prev => ({
        ...prev,
        result: isCorrect ? 'Doğru!' : result,
        showResult: true,
        isChecking: false,
      }));
    } catch (error) {
      console.error('Error checking translation:', error);
      Alert.alert('Hata', 'Çeviri kontrol edilirken bir hata oluştu');
      setExerciseState(prev => ({ ...prev, isChecking: false }));
    }
  };

  const handleNextExercise = () => {
    loadNewExercise();
  };

  if (exerciseState.isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Egzersiz yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerSafeArea}>
        <View style={styles.header}>
          <Text style={styles.levelText}>Seviye: {level}</Text>
          <Text style={styles.instructionText}>
            Aşağıdaki cümleyi {exerciseState.targetLanguage} diline çevirin
          </Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.exerciseCard}>
          <Text style={styles.sourceLanguageText}>
            {exerciseState.sourceLanguage}
          </Text>
          <Text style={styles.sourceSentence}>
            {exerciseState.sourceSentence}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            {exerciseState.targetLanguage} çeviriniz:
          </Text>
          <TextInput
            style={styles.textInput}
            value={exerciseState.userTranslation}
            onChangeText={(text) => setExerciseState(prev => ({ ...prev, userTranslation: text }))}
            placeholder={`${exerciseState.targetLanguage} cümlesini buraya yazın...`}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>
        {exerciseState.showResult && (
          <View style={styles.resultContainer}>
            <Text style={[
              styles.resultText,
              { color: exerciseState.result === 'Doğru!' ? '#4CAF50' : '#F44336' }
            ]}>
              {exerciseState.result}
            </Text>
          </View>
        )}
        <View style={styles.buttonContainer}>
          {!exerciseState.showResult ? (
            <Button
              title={exerciseState.isChecking ? "Kontrol Ediliyor..." : "Kontrol Et"}
              onPress={handleCheckTranslation}
              variant="primary"
              disabled={exerciseState.isChecking}
            />
          ) : (
            <Button
              title="Sonraki Egzersiz"
              onPress={handleNextExercise}
              variant="primary"
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
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
    alignItems: 'center',
    marginBottom: 32,
  },
  levelText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 24,
  },
  exerciseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sourceLanguageText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  sourceSentence: {
    fontSize: 18,
    color: '#1C1C1E',
    lineHeight: 26,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    color: '#1C1C1E',
    marginBottom: 8,
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1C1C1E',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    minHeight: 100,
  },
  resultContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  headerSafeArea: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 12,
  },
}); 