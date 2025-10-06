import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import { FavoritesProvider } from './src/contexts/FavoritesContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <AppNavigator />
        <StatusBar style="light" />
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
