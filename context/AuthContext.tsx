import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

interface AuthContextType {
  colorScheme: 'light' | 'dark';
  toggleTheme: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const [isLoading, setIsLoading] = useState(true);
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark');
  const deviceColorScheme = useColorScheme();

  
  const getTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
        setColorScheme(storedTheme);
      } else if (deviceColorScheme) {
        setColorScheme(deviceColorScheme);
        await AsyncStorage.setItem('theme', deviceColorScheme);
      }
    } catch (error) {
      console.error('Error getting theme:', error);
    }
  };


  const toggleTheme = async () => {
    try {
      const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
      setColorScheme(newTheme);
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };

 
  useEffect(() => {
    const initialize = async () => {
      try {
        await getTheme();
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        // setIsLoading(false);
      }
    };

    initialize();
  }, []);

 
  useEffect(() => {
    setColorScheme(deviceColorScheme);
    AsyncStorage.setItem('theme', deviceColorScheme);
  }, [deviceColorScheme]);

  const contextValue: AuthContextType = {
    // isLoading,
    colorScheme,
    toggleTheme,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

