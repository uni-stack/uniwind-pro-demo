import { Pressable, Text, View } from 'react-native'
import { ThemeTransitionPreset, Uniwind, useResolveClassNames, useUniwind } from 'uniwind'

const transitions = [
  { label: 'Fade', preset: ThemeTransitionPreset.Fade },
  { label: 'Circle Center', preset: ThemeTransitionPreset.CircleCenter },
  { label: 'Slide Right', preset: ThemeTransitionPreset.SlideLeftToRight },
  { label: 'Blur', preset: ThemeTransitionPreset.Blur },
] as const

export default function HomeScreen() {
  const { theme } = useUniwind()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <View className="flex-1 bg-background items-center justify-center px-6">
      <View className="w-44 h-44 rounded-3xl bg-primary items-center justify-center mb-10">
        <Text className="text-3xl font-bold text-primary-foreground">
          Uniwind
        </Text>
        <Text className="text-sm mt-1 text-primary-foreground/70">
          Pro Demo
        </Text>
      </View>

      <Text className="text-foreground text-lg font-semibold mb-4">
        Theme Transitions
      </Text>

      <View className="gap-3 w-full">
        {transitions.map(({ label, preset }) => (
          <Pressable
            key={label}
            className="bg-card px-5 py-3.5 rounded-2xl"
            onPress={() => Uniwind.setTheme(nextTheme, { preset })}
          >
            <Text className="text-card-foreground text-base font-medium text-center">
              {label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text className="text-muted text-sm mt-8">
        Current: {theme}
      </Text>
    </View>
  )
}
