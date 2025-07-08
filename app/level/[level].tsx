import { useLocalSearchParams } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LevelScreen({ navigation }: any) {
  const { level } = useLocalSearchParams();

  // Header başlığını sadece seviye kodu olarak ayarla
  useLayoutEffect(() => {
    if (navigation && navigation.setOptions) {
      navigation.setOptions({ title: level });
    }
  }, [level, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.levelTitle}>Seçilen Seviye: {level}</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={() => {}}>
          <Text style={styles.buttonText}>ÇALIŞMAYI BAŞLAT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonGreen]} onPress={() => {}}>
          <Text style={styles.buttonText}>GEÇMİŞ EGZERSİZLER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  levelTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#1C1C1E',
    textAlign: 'center',
  },
  buttonGroup: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    gap: 16,
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonBlue: {
    backgroundColor: '#2196F3',
  },
  buttonGreen: {
    backgroundColor: '#43A047',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
}); 