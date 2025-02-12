import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

// Define the context type
interface AuthContextType {
  isLoading: boolean;
  colorScheme: 'light' | 'dark';
  toggleTheme: () => Promise<void>;
}

// Create context with proper typing
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark');
  const deviceColorScheme = useColorScheme();

  // Get theme from storage
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

  // Toggle theme function
  const toggleTheme = async () => {
    try {
      const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
      setColorScheme(newTheme);
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };

  // Initialize theme and auth state
  useEffect(() => {
    const initialize = async () => {
      try {
        await getTheme();
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  // Update theme when device theme changes
  useEffect(() => {
    setColorScheme(deviceColorScheme);
    AsyncStorage.setItem('theme', deviceColorScheme);
  }, [deviceColorScheme]);

  const contextValue: AuthContextType = {
    isLoading,
    colorScheme,
    toggleTheme,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

