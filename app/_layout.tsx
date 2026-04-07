import 'react-native-reanimated';
import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

// Default theme follows system (orange palette as base)
// When system = light  →  uses @variant light  (light-orange values)
// When system = dark   →  uses @variant dark   (dark-orange values)
// Users can switch palette + mode via the in-app ThemeSwitcher FAB

export default function RootLayout() {
  return (
    <React.Fragment>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
      {/* ── FAB Theme Switcher ───────────────────────── */}
      <ThemeSwitcher />
    </React.Fragment>
  );
}
