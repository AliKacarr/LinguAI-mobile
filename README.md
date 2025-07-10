# LinguAI

LinguAI, yapay zeka destekli interaktif dil öğrenme uygulamasıdır. Kullanıcılar A1'den C2'ye kadar farklı seviyelerde kelime çalışması yapabilir, Gemini AI ile cümle çevirisi alıştırmaları gerçekleştirebilir ve öğrenme performanslarını detaylı olarak takip edebilir.

## Özellikler

- **Seviye Bazlı Öğrenme**: A1, A2, B1, B2, C1, C2 seviyelerinde kelime çalışması
- **Yapay Zeka Destekli Cümle Üretimi**: Gemini AI ile seviyeye uygun cümleler oluşturma
- **Çeviri Kontrolü**: Kullanıcı çevirilerinin AI tarafından kontrol edilmesi
- **Kelime Görüntüleme**: Her seviyeye ait kelime gruplarını görüntüleme ve inceleme
- **Egzersiz Geçmişi**: Tamamlanan egzersizlerin detaylı analizi ve görüntülenmesi
- **Performans Takibi**: Doğru/yanlış çeviri istatistikleri ve gelişim analizi
- **Kullanıcı Kimlik Doğrulama**: Supabase ile güvenli giriş sistemi

## Teknolojiler

- **Frontend**: React Native + Expo
- **Backend**: Supabase
- **AI**: Google Gemini API
- **Authentication**: Supabase Auth

## Kurulum

1. Projeyi klonlayın:

```bash
git clone https://github.com/AliKacarr/LinguAI-mobile.git
cd LinguAI-mobile
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. Supabase veritabanını kurun:

   - Supabase projesi oluşturun
   - `database_schema.sql` dosyasını Supabase SQL editöründe çalıştırın
   - Supabase URL ve API anahtarını `lib/supabase.ts` dosyasında güncelleyin

4. Gemini API anahtarını ayarlayın:

   - `lib/gemini.ts` dosyasında API anahtarını güncelleyin

5. Uygulamayı başlatın:

```bash
npx expo start
```

## Veritabanı Yapısı

### Tablolar

- **language_levels**: Dil seviyeleri (A1-C2)
- **example_words**: Seviyeye göre kelime çiftleri
- **exercise_history**: Kullanıcı egzersiz geçmişi (kaynak cümle, kullanıcı çevirisi, doğruluk durumu, doğru çeviri)
- **users**: Kullanıcı bilgileri

### Örnek Veri Ekleme

```sql
-- B2 seviyesinde örnek kelime ekleme
INSERT INTO public.example_words (level_id, turkish, english)
VALUES
  ((SELECT id FROM public.language_levels WHERE level = 'B2'), 'tartışma', 'argument');
```

## Kullanım

1. **Kayıt Ol/Giriş Yap**: Uygulamaya giriş yapın
2. **Seviye Seçin**: Ana ekranda çalışmak istediğiniz seviyeyi seçin
3. **Seviye Menüsü**: Seviye ekranında üç seçenek bulunur:
   - **Çalışmayı Başlat**: AI destekli çeviri egzersizlerini başlatır
   - **Kelimeler**: Seviyeye ait tüm kelime gruplarını görüntüler
   - **Geçmiş Egzersizler**: O seviyede tamamlanan egzersizlerin detaylı analizini gösterir
4. **Çeviri Yapın**: AI tarafından oluşturulan cümleyi çevirin
5. **Kontrol Edin**: "Kontrol Et" butonuna basarak çevirinizi kontrol edin
6. **Performansı İzleyin**: Geçmiş egzersizler sayfasında doğru/yanlış oranlarınızı ve gelişiminizi takip edin

## API Kullanımı

### Gemini AI Prompts

**Cümle Üretimi:**

```
Create a short {source language} sentence that contains only this {source language} word and is appropriate for {level} difficulty. word={word}
```

**Çeviri Kontrolü:**

```
English sentence: "{english_sentence}"
User's Turkish sentence: "{user_translation}"
If the given English sentence and the user's Turkish sentence answer match, just write me "True". If the user's translation is wrong, just write me the correct translation of the sentence
```

## Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## İletişim

Ali Kacar - [@AliKacarr](https://github.com/AliKacarr)

Proje Linki: [https://github.com/AliKacarr/LinguAI-mobile](https://github.com/AliKacarr/LinguAI-mobile)
