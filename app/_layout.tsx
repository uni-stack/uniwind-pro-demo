import 'react-native-reanimated'

import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

export default function RootLayout() {
  return (
    <React.Fragment>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </React.Fragment>
  );
}
