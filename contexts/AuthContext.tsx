import { Session } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, User } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, username: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mevcut session'ı kontrol et
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUser(session.user.id);
      }
      setLoading(false);
    });

    // Auth state değişikliklerini dinle
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        if (session?.user) {
          await fetchUser(session.user.id);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUser = async (userId: string) => {
    try {
      const { data, error, status } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      console.log('fetchUser status:', status);
      console.log('fetchUser error:', error);
      console.log('fetchUser data:', data);

      if (error) throw error;
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      // Önce kullanıcı adının kullanılıp kullanılmadığını kontrol et
      const { data: existingUsers, error: checkError } = await supabase
        .from('users')
        .select('username')
        .eq('username', username);

      if (checkError) {
        console.error('Username check error:', checkError);
        return { error: { message: 'Kullanıcı adı kontrolünde hata oluştu.' } };
      }

      if (existingUsers && existingUsers.length > 0) {
        return { error: { message: 'Bu kullanıcı adı zaten kullanılıyor.' } };
      }

      // Auth ile kullanıcı oluştur
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) return { error };

      if (data.user) {
        // Users tablosuna kullanıcı bilgilerini ekle
        const { error: insertError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              username,
              email,
            }
          ]);

        if (insertError) {
          console.error('Insert error:', insertError);
          // Eğer users tablosuna ekleme başarısız olursa, auth'dan da sil
          await supabase.auth.signOut();
          return { error: insertError };
        }
      }

      // Kayıt başarılıysa oturumu manuel olarak tekrar al
      await supabase.auth.getSession();

      return { error: null };
    } catch (error) {
      console.error('SignUp error:', error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 