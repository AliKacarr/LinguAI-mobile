-- Dil seviyeleri tablosu
CREATE TABLE IF NOT EXISTS public.language_levels (
    id SERIAL PRIMARY KEY,
    level VARCHAR(2) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Örnek kelimeler tablosu
CREATE TABLE IF NOT EXISTS public.example_words (
    id SERIAL PRIMARY KEY,
    level_id INTEGER REFERENCES public.language_levels(id) ON DELETE CASCADE,
    turkish VARCHAR(100) NOT NULL,
    english VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Egzersiz geçmişi tablosu
CREATE TABLE IF NOT EXISTS public.exercise_history (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    level VARCHAR(2) NOT NULL,
    word VARCHAR(100) NOT NULL,
    source_language VARCHAR(20) NOT NULL,
    target_language VARCHAR(20) NOT NULL,
    source_sentence TEXT NOT NULL,
    user_translation TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    correct_translation TEXT,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dil seviyelerini ekle
INSERT INTO public.language_levels (level) VALUES 
    ('A1'), ('A2'), ('B1'), ('B2'), ('C1'), ('C2')
ON CONFLICT (level) DO NOTHING;

-- Örnek kelimeler ekle (B2 seviyesi için)
INSERT INTO public.example_words (level_id, turkish, english) VALUES 
    ((SELECT id FROM public.language_levels WHERE level = 'B2'), 'tartışma', 'argument'),
    ((SELECT id FROM public.language_levels WHERE level = 'B2'), 'gelişim', 'development'),
    ((SELECT id FROM public.language_levels WHERE level = 'B2'), 'sorun', 'problem'),
    ((SELECT id FROM public.language_levels WHERE level = 'B2'), 'çözüm', 'solution'),
    ((SELECT id FROM public.language_levels WHERE level = 'B2'), 'başarı', 'success'),
    ((SELECT id FROM public.language_levels WHERE level = 'B2'), 'deneyim', 'experience'),
    ((SELECT id FROM public.language_levels WHERE level = 'B2'), 'fırsat', 'opportunity'),
    ((SELECT id FROM public.language_levels WHERE level = 'B2'), 'zorluk', 'challenge'),
    ((SELECT id FROM public.language_levels WHERE level = 'B2'), 'hedef', 'goal'),
    ((SELECT id FROM public.language_levels WHERE level = 'B2'), 'plan', 'plan');

-- A1 seviyesi için örnek kelimeler
INSERT INTO public.example_words (level_id, turkish, english) VALUES 
    ((SELECT id FROM public.language_levels WHERE level = 'A1'), 'elma', 'apple'),
    ((SELECT id FROM public.language_levels WHERE level = 'A1'), 'ev', 'house'),
    ((SELECT id FROM public.language_levels WHERE level = 'A1'), 'kitap', 'book'),
    ((SELECT id FROM public.language_levels WHERE level = 'A1'), 'su', 'water'),
    ((SELECT id FROM public.language_levels WHERE level = 'A1'), 'güneş', 'sun'),
    ((SELECT id FROM public.language_levels WHERE level = 'A1'), 'ağaç', 'tree'),
    ((SELECT id FROM public.language_levels WHERE level = 'A1'), 'kedi', 'cat'),
    ((SELECT id FROM public.language_levels WHERE level = 'A1'), 'köpek', 'dog'),
    ((SELECT id FROM public.language_levels WHERE level = 'A1'), 'masa', 'table'),
    ((SELECT id FROM public.language_levels WHERE level = 'A1'), 'kapı', 'door');

-- A2 seviyesi için örnek kelimeler
INSERT INTO public.example_words (level_id, turkish, english) VALUES 
    ((SELECT id FROM public.language_levels WHERE level = 'A2'), 'okul', 'school'),
    ((SELECT id FROM public.language_levels WHERE level = 'A2'), 'çalışma', 'study'),
    ((SELECT id FROM public.language_levels WHERE level = 'A2'), 'arkadaş', 'friend'),
    ((SELECT id FROM public.language_levels WHERE level = 'A2'), 'aile', 'family'),
    ((SELECT id FROM public.language_levels WHERE level = 'A2'), 'zaman', 'time'),
    ((SELECT id FROM public.language_levels WHERE level = 'A2'), 'yemek', 'food'),
    ((SELECT id FROM public.language_levels WHERE level = 'A2'), 'hava', 'weather'),
    ((SELECT id FROM public.language_levels WHERE level = 'A2'), 'şehir', 'city'),
    ((SELECT id FROM public.language_levels WHERE level = 'A2'), 'ülke', 'country'),
    ((SELECT id FROM public.language_levels WHERE level = 'A2'), 'dil', 'language');

-- B1 seviyesi için örnek kelimeler
INSERT INTO public.example_words (level_id, turkish, english) VALUES 
    ((SELECT id FROM public.language_levels WHERE level = 'B1'), 'eğitim', 'education'),
    ((SELECT id FROM public.language_levels WHERE level = 'B1'), 'kariyer', 'career'),
    ((SELECT id FROM public.language_levels WHERE level = 'B1'), 'teknoloji', 'technology'),
    ((SELECT id FROM public.language_levels WHERE level = 'B1'), 'kültür', 'culture'),
    ((SELECT id FROM public.language_levels WHERE level = 'B1'), 'toplum', 'society'),
    ((SELECT id FROM public.language_levels WHERE level = 'B1'), 'ekonomi', 'economy'),
    ((SELECT id FROM public.language_levels WHERE level = 'B1'), 'politika', 'politics'),
    ((SELECT id FROM public.language_levels WHERE level = 'B1'), 'bilim', 'science'),
    ((SELECT id FROM public.language_levels WHERE level = 'B1'), 'sanat', 'art'),
    ((SELECT id FROM public.language_levels WHERE level = 'B1'), 'spor', 'sport');

-- C1 seviyesi için örnek kelimeler
INSERT INTO public.example_words (level_id, turkish, english) VALUES 
    ((SELECT id FROM public.language_levels WHERE level = 'C1'), 'felsefe', 'philosophy'),
    ((SELECT id FROM public.language_levels WHERE level = 'C1'), 'psikoloji', 'psychology'),
    ((SELECT id FROM public.language_levels WHERE level = 'C1'), 'sosyoloji', 'sociology'),
    ((SELECT id FROM public.language_levels WHERE level = 'C1'), 'antropoloji', 'anthropology'),
    ((SELECT id FROM public.language_levels WHERE level = 'C1'), 'arkeoloji', 'archaeology'),
    ((SELECT id FROM public.language_levels WHERE level = 'C1'), 'astronomi', 'astronomy'),
    ((SELECT id FROM public.language_levels WHERE level = 'C1'), 'biyoloji', 'biology'),
    ((SELECT id FROM public.language_levels WHERE level = 'C1'), 'kimya', 'chemistry'),
    ((SELECT id FROM public.language_levels WHERE level = 'C1'), 'fizik', 'physics'),
    ((SELECT id FROM public.language_levels WHERE level = 'C1'), 'matematik', 'mathematics');

-- C2 seviyesi için örnek kelimeler
INSERT INTO public.example_words (level_id, turkish, english) VALUES 
    ((SELECT id FROM public.language_levels WHERE level = 'C2'), 'metafizik', 'metaphysics'),
    ((SELECT id FROM public.language_levels WHERE level = 'C2'), 'epistemoloji', 'epistemology'),
    ((SELECT id FROM public.language_levels WHERE level = 'C2'), 'ontoloji', 'ontology'),
    ((SELECT id FROM public.language_levels WHERE level = 'C2'), 'etika', 'ethics'),
    ((SELECT id FROM public.language_levels WHERE level = 'C2'), 'estetik', 'aesthetics'),
    ((SELECT id FROM public.language_levels WHERE level = 'C2'), 'mantık', 'logic'),
    ((SELECT id FROM public.language_levels WHERE level = 'C2'), 'diyalektik', 'dialectic'),
    ((SELECT id FROM public.language_levels WHERE level = 'C2'), 'paradigma', 'paradigm'),
    ((SELECT id FROM public.language_levels WHERE level = 'C2'), 'epistemoloji', 'epistemology'),
    ((SELECT id FROM public.language_levels WHERE level = 'C2'), 'hermeneutik', 'hermeneutics');

-- RLS (Row Level Security) politikaları
ALTER TABLE public.exercise_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own exercise history" ON public.exercise_history
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own exercise history" ON public.exercise_history
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_exercise_history_user_id ON public.exercise_history(user_id);
CREATE INDEX IF NOT EXISTS idx_exercise_history_level ON public.exercise_history(level);
CREATE INDEX IF NOT EXISTS idx_example_words_level_id ON public.example_words(level_id); 