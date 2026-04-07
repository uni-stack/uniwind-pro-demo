import 'react-native-reanimated';
import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { Uniwind, type ThemeName } from 'uniwind';

// Start with light-orange, user can toggle to dark-violet via ThemeSwitcher
Uniwind.setTheme('light-orange' as ThemeName);

export default function RootLayout() {
  return (
    <React.Fragment>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
      <ThemeSwitcher />
    </React.Fragment>
  );
}
