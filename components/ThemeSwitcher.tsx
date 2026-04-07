import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { ThemeName, ThemeTransitionPreset, Uniwind, useUniwind } from 'uniwind';
import { PALETTES, type PaletteId } from '../data/recipes';

const TRANSITION_PRESETS = [
  { id: ThemeTransitionPreset.Fade, label: 'Fade', icon: '✦' },
  { id: ThemeTransitionPreset.Blur, label: 'Blur', icon: '◎' },
  { id: ThemeTransitionPreset.BlurLeftToRight, label: 'Blur L→R', icon: '▸' },
  { id: ThemeTransitionPreset.BlurRightToLeft, label: 'Blur R→L', icon: '◂' },
  { id: ThemeTransitionPreset.SlideLeftToRight, label: 'Slide L→R', icon: '⟶' },
  { id: ThemeTransitionPreset.SlideRightToLeft, label: 'Slide R→L', icon: '⟵' },
  { id: ThemeTransitionPreset.CircleCenter, label: 'Circle', icon: '◉' },
  { id: ThemeTransitionPreset.CircleTopRight, label: 'Top Right', icon: '◴' },
  { id: ThemeTransitionPreset.CircleTopLeft, label: 'Top Left', icon: '◵' },
  { id: ThemeTransitionPreset.CircleBottomRight, label: 'Bot Right', icon: '◶' },
  { id: ThemeTransitionPreset.CircleBottomLeft, label: 'Bot Left', icon: '◷' },
  { id: ThemeTransitionPreset.None, label: 'None', icon: '⚡' },
] as const;

function getCurrentPalette(theme: string): PaletteId {
  for (const p of PALETTES) {
    if (theme.includes(p.id)) return p.id;
  }
  return 'orange';
}

function getIsDark(theme: string): boolean {
  return theme.startsWith('dark');
}

export function ThemeSwitcher() {
  const { theme, hasAdaptiveThemes } = useUniwind();
  const [open, setOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<ThemeTransitionPreset>(ThemeTransitionPreset.Fade);

  const currentTheme = hasAdaptiveThemes ? 'light' : theme;
  const isDark = getIsDark(currentTheme);
  const currentPalette = getCurrentPalette(currentTheme);

  function applyTheme(palette: PaletteId, dark: boolean) {
    const newTheme = `${dark ? 'dark' : 'light'}-${palette}` as ThemeName;
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
              className="w-7 h-7 rounded-full bg-surface items-center justify-center active:opacity-70"
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
                onPress={() => applyTheme(currentPalette, dark)}
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

          {/* Palette swatches */}
          <View className="flex-row gap-3 px-4 py-3">
            {PALETTES.map(palette => {
              const isActive = currentPalette === palette.id;
              const swatchColor = isDark ? palette.darkColor : palette.color;
              return (
                <Pressable
                  key={palette.id}
                  onPress={() => applyTheme(palette.id, isDark)}
                  className="flex-1 items-center gap-1.5 active:opacity-75"
                >
                  <View
                    className="w-11 h-11 rounded-2xl items-center justify-center"
                    style={{
                      backgroundColor: swatchColor,
                      borderWidth: isActive ? 2.5 : 0,
                      borderColor: isActive ? '#fff' : 'transparent',
                      shadowColor: swatchColor,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: isActive ? 0.6 : 0.15,
                      shadowRadius: isActive ? 10 : 4,
                    }}
                  >
                    {isActive && (
                      <Text className="text-white text-sm font-bold">✓</Text>
                    )}
                  </View>
                  <Text className={isActive ? "text-foreground text-xs font-bold" : "text-muted text-xs"}>
                    {palette.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Divider */}
          <View className="h-px bg-border mx-4" />

          {/* Transition preset selector */}
          <View className="py-3 gap-2">
            <Text className="text-muted text-xs font-semibold px-4 uppercase tracking-wider">
              Transition
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="gap-1.5 px-4"
            >
              {TRANSITION_PRESETS.map(preset => {
                const isActive = selectedPreset === preset.id;
                return (
                  <Pressable
                    key={preset.id}
                    onPress={() => setSelectedPreset(preset.id)}
                    data-selected={isActive}
                    className="px-3 py-1.5 rounded-full border border-border data-[selected=true]:bg-primary data-[selected=true]:border-primary active:opacity-75"
                  >
                    <Text
                      data-selected={isActive}
                      className="text-xs font-semibold text-muted data-[selected=true]:text-primary-foreground"
                    >
                      {preset.icon} {preset.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      )}
    </>
  );
}
