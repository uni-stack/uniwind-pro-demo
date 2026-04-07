import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ThemeName, ThemeTransitionPreset, Uniwind, useUniwind } from 'uniwind';

const TRANSITIONS = [
  { id: ThemeTransitionPreset.CircleTopRight, label: 'Circle' },
  { id: ThemeTransitionPreset.BlurLeftToRight, label: 'Blur' },
  { id: ThemeTransitionPreset.Fade, label: 'Fade' },
  { id: ThemeTransitionPreset.None, label: 'None' },
] as const;

function getIsDark(theme: string): boolean {
  return theme.startsWith('dark');
}

export function ThemeSwitcher() {
  const { theme, hasAdaptiveThemes } = useUniwind();
  const [open, setOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<ThemeTransitionPreset>(ThemeTransitionPreset.CircleTopRight);

  const currentTheme = hasAdaptiveThemes ? Uniwind.currentTheme : theme;
  const isDark = getIsDark(currentTheme);

  function applyTheme(dark: boolean) {
    const newTheme = (dark ? 'dark-violet' : 'light-orange') as ThemeName;
    Uniwind.setTheme(newTheme, { preset: selectedPreset });
  }

  return (
    <>
      {/* FAB */}
      <Pressable
        onPress={() => setOpen(!open)}
        className="absolute bottom-safe-offset-8 right-6 w-14 h-14 rounded-full bg-primary items-center justify-center active:opacity-80 active:scale-95 shadow-2xl animate-float"
      >
        <Text className="text-2xl">🎨</Text>
      </Pressable>

      {/* Theme picker panel */}
      {open && (
        <View className="absolute bottom-safe-offset-4 left-3 right-3 bg-surface rounded-3xl overflow-hidden border border-border uw-entering-slide-in-down uw-exiting-slide-out-down shadow-2xl">
          {/* Header */}
          <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
            <Text className="text-foreground text-base font-bold">Theme</Text>
            <Pressable
              onPress={() => setOpen(false)}
              className="w-7 h-7 rounded-full bg-card items-center justify-center active:opacity-70"
            >
              <Text className="text-muted text-xs font-bold">✕</Text>
            </Pressable>
          </View>

          {/* Light / Dark toggle */}
          <View className="flex-row gap-2 px-4 pb-3">
            {[
              { label: '☀️  Light', dark: false },
              { label: '🌙  Dark', dark: true },
            ].map(({ label, dark }) => (
              <Pressable
                key={label}
                onPress={() => applyTheme(dark)}
                data-selected={isDark === dark}
                className="flex-1 py-2 rounded-2xl border border-border items-center data-[selected=true]:bg-primary data-[selected=true]:border-primary active:opacity-80"
              >
                <Text
                  className="text-sm font-semibold text-foreground-secondary data-[selected=true]:text-primary-foreground"
                  data-selected={isDark === dark}
                >
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Divider */}
          <View className="h-px bg-border mx-4" />

          {/* Transition presets */}
          <View className="flex-row gap-2 px-4 py-3">
            {TRANSITIONS.map(transition => {
              const isActive = selectedPreset === transition.id;
              return (
                <Pressable
                  key={transition.id}
                  onPress={() => setSelectedPreset(transition.id)}
                  data-selected={isActive}
                  className="flex-1 py-2 rounded-2xl border border-border items-center data-[selected=true]:bg-primary data-[selected=true]:border-primary active:opacity-80"
                >
                  <Text
                    className="text-xs font-semibold text-foreground-secondary data-[selected=true]:text-primary-foreground"
                    data-selected={isActive}
                  >
                    {transition.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      )}
    </>
  );
}
