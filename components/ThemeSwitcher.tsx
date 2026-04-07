import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ThemeName, ThemeTransitionPreset, Uniwind, useUniwind } from 'uniwind';
import { PALETTES, type PaletteId } from '../data/recipes';

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

  const currentTheme = hasAdaptiveThemes ? 'light' : theme;
  const isDark = getIsDark(currentTheme);
  const currentPalette = getCurrentPalette(currentTheme);

  function applyTheme(palette: PaletteId, dark: boolean) {
    const newTheme = `${dark ? 'dark' : 'light'}-${palette}` as ThemeName;
    const changingLightDark = Uniwind.currentTheme.includes(dark ? 'light' : 'dark')

    Uniwind.setTheme(newTheme, { preset: changingLightDark ? ThemeTransitionPreset.BlurLeftToRight : ThemeTransitionPreset.CircleCenter });
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

      {/* Theme picker - bottom panel */}
      {open && (
        <View className="absolute bottom-safe-offset-4 left-3 right-3 p-3 bg-background rounded-3xl gap-6 uw-entering-slide-in-down uw-exiting-slide-out-down shadow-2xl">
          {/* Close button */}
          <Pressable
            onPress={() => setOpen(false)}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-muted items-center justify-center active:opacity-70 z-10"
          >
            <Text className="text-lg font-bold text-background">✕</Text>
          </Pressable>

          {/* Light / Dark toggle */}
          <View className="flex-row gap-3 pr-10">
            {[
              { label: '☀️  Light', dark: false },
              { label: '🌙  Dark', dark: true },
            ].map(({ label, dark }) => (
              <Pressable
                key={label}
                onPress={() => applyTheme(currentPalette, dark)}
                data-selected={isDark === dark}
                className="flex-1 py-1 rounded-2xl border border-border items-center data-[selected=true]:bg-primary data-[selected=true]:border-primary active:opacity-80"
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

          {/* Palette swatches */}
          <View className="flex-row gap-3">
            {PALETTES.map(palette => {
              const isActive = currentPalette === palette.id;
              const swatchColor = isDark ? palette.darkColor : palette.color;
              return (
                <Pressable
                  key={palette.id}
                  onPress={() => applyTheme(palette.id, isDark)}
                  className="flex-1 items-center gap-2 active:opacity-75"
                >
                  <View
                    className="w-12 h-12 rounded-2xl items-center justify-center"
                    style={{
                      backgroundColor: swatchColor,
                      borderWidth: isActive ? 3 : 0,
                      borderColor: isActive ? swatchColor : 'transparent',
                      shadowColor: swatchColor,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: isActive ? 0.6 : 0.2,
                      shadowRadius: 8,
                    }}
                  >
                    {isActive && (
                      <Text className="text-white text-lg font-bold">✓</Text>
                    )}
                  </View>
                  <Text
                    className="text-xs font-medium"
                    style={{ color: isActive ? swatchColor : undefined }}
                  >
                    {isActive ? (
                      <Text className="text-foreground text-xs font-bold">{palette.label}</Text>
                    ) : (
                      <Text className="text-muted text-xs">{palette.label}</Text>
                    )}
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
