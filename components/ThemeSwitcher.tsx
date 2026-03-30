import React, { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { Uniwind, useUniwind } from 'uniwind';
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
    const newTheme = `${dark ? 'dark' : 'light'}-${palette}`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Uniwind.setTheme(newTheme as any);
  }

  return (
    <>
      {/* FAB */}
      <Pressable
        onPress={() => setOpen(true)}
        className="absolute bottom-safe-offset-8 right-6 w-14 h-14 rounded-full bg-primary items-center justify-center active:opacity-80 active:scale-95"
        style={{ elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8 }}
      >
        <Text className="text-2xl">🎨</Text>
      </Pressable>

      {/* Theme picker modal */}
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-end"
          onPress={() => setOpen(false)}
        >
          <Pressable onPress={() => {}}>
            <View className="bg-background rounded-t-3xl px-6 pt-5 pb-10 gap-6">
              {/* Handle bar */}
              <View className="w-10 h-1 rounded-full bg-border self-center" />

              <Text className="text-foreground text-xl font-bold tracking-tight">
                Choose Theme
              </Text>

              {/* Light / Dark toggle */}
              <View>
                <Text className="text-foreground-secondary text-xs font-semibold uppercase tracking-widest mb-3">
                  Mode
                </Text>
                <View className="flex-row gap-3">
                  {[
                    { label: '☀️  Light', dark: false },
                    { label: '🌙  Dark', dark: true },
                  ].map(({ label, dark }) => (
                    <Pressable
                      key={label}
                      onPress={() => applyTheme(currentPalette, dark)}
                      data-selected={isDark === dark}
                      className="flex-1 py-3 rounded-2xl border border-border items-center
                        data-[selected=true]:bg-primary data-[selected=true]:border-primary
                        active:opacity-80"
                    >
                      <Text
                        className="text-sm font-semibold text-foreground-secondary
                          data-[selected=true]:text-primary-foreground"
                        data-selected={isDark === dark}
                      >
                        {label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Palette swatches */}
              <View>
                <Text className="text-foreground-secondary text-xs font-semibold uppercase tracking-widest mb-3">
                  Palette
                </Text>
                <View className="flex-row gap-3">
                  {PALETTES.map((palette) => {
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
                            elevation: isActive ? 6 : 2,
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

              {/* Current theme label */}
              <View className="bg-surface rounded-2xl px-4 py-3 items-center">
                <Text className="text-muted text-xs uppercase tracking-widest mb-1">Active theme</Text>
                <Text className="text-foreground font-semibold text-sm">
                  {hasAdaptiveThemes ? 'System default' : currentTheme}
                </Text>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
