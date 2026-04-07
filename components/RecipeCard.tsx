import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter, type Href } from 'expo-router';
import type { Recipe } from '../data/recipes';

type Props = {
  recipe: Recipe;
  mode: 'list' | 'grid';
  index?: number;
  highlight?: boolean;
};

const STAGGER_DELAYS = [
  'uw-entering-delay-75',
  'uw-entering-delay-150',
  'uw-entering-delay-200',
  'uw-entering-delay-300',
] as const;

const DIFFICULTY_COLORS: Record<Recipe['difficulty'], string> = {
  Easy: '#22c55e',
  Medium: '#f59e0b',
  Hard: '#ef4444',
};

export function RecipeCard({ recipe, mode, index = 0, highlight = false }: Props) {
  const router = useRouter();
  const delayClass = STAGGER_DELAYS[Math.min(index, 3)] ?? '';
  const shakeClass = highlight ? 'animate-wiggle' : '';

  if (mode === 'grid') {
    return (
      <Pressable
        onPress={() => router.push({ pathname: '/recipe/[id]', params: { id: recipe.id } })}
        className={`flex-1 bg-card rounded-3xl overflow-hidden active:opacity-80 active:scale-95 uw-layout-linear-transition uw-entering-fade-in uw-exiting-fade-out ${delayClass} ${shakeClass}`}
        style={{
          shadowColor: recipe.cardColor,
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.18,
          shadowRadius: 6,
        }}
      >
        {/* Color hero */}
        <View
          className="aspect-square items-center justify-center"
          style={{ backgroundColor: recipe.cardColor + '22' }}
        >
          <View
            className="w-12 h-12 rounded-2xl items-center justify-center"
            style={{ backgroundColor: recipe.cardColor + '33' }}
          >
            <Text className="text-3xl">{recipe.emoji}</Text>
          </View>
          {/* Difficulty dot */}
          <View
            className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full"
            style={{ backgroundColor: DIFFICULTY_COLORS[recipe.difficulty] }}
          />
        </View>

        {/* Info */}
        <View className="px-2.5 py-2.5 gap-0.5">
          <Text
            className="text-card-foreground text-xs font-bold leading-tight"
            numberOfLines={2}
          >
            {recipe.title}
          </Text>
          <Text className="text-muted text-xs" numberOfLines={1}>
            {recipe.time}
          </Text>
        </View>
      </Pressable>
    );
  }

  // List mode
  return (
    <Pressable
      onPress={() => router.push({ pathname: '/recipe/[id]', params: { id: recipe.id } })}
      className={`bg-card rounded-3xl overflow-hidden flex-row active:opacity-80 active:scale-[0.99] uw-layout-linear-transition uw-entering-fade-in uw-exiting-fade-out ${delayClass} ${shakeClass}`}
      style={{
        shadowColor: recipe.cardColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      }}
    >
      {/* Color tile */}
      <View
        className="w-24 items-center justify-center"
        style={{ backgroundColor: recipe.cardColor + '28' }}
      >
        <Text className="text-5xl leading-relaxed">{recipe.emoji}</Text>
        <View
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full max-w-20"
          style={{ backgroundColor: recipe.cardColor + '44' }}
        >
          <Text
            className="text-xs font-bold"
            style={{ color: recipe.cardColor }}
            numberOfLines={1}
          >
            {recipe.category}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-4 py-4 gap-1 justify-center">
        <Text
          className="text-card-foreground text-base font-bold leading-snug"
          numberOfLines={2}
        >
          {recipe.title}
        </Text>
        <Text
          className="text-muted text-xs leading-relaxed"
          numberOfLines={2}
        >
          {recipe.description}
        </Text>

        {/* Meta row */}
        <View className="flex-row gap-3 mt-1.5 items-center">
          <View className="flex-row items-center gap-1">
            <Text className="text-muted text-xs">⏱</Text>
            <Text className="text-foreground-secondary text-xs font-semibold">
              {recipe.time}
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Text className="text-muted text-xs">🔥</Text>
            <Text className="text-foreground-secondary text-xs font-semibold">
              {recipe.calories} cal
            </Text>
          </View>
          <View
            className="px-2 py-0.5 rounded-full"
            style={{ backgroundColor: DIFFICULTY_COLORS[recipe.difficulty] + '22' }}
          >
            <Text
              className="text-xs font-bold"
              style={{ color: DIFFICULTY_COLORS[recipe.difficulty] }}
            >
              {recipe.difficulty}
            </Text>
          </View>
        </View>
      </View>

      {/* Chevron */}
      <View className="justify-center pr-4">
        <Text className="text-muted text-lg">›</Text>
      </View>
    </Pressable>
  );
}
