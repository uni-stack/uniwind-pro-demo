import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { RECIPES } from '../../data/recipes';

const DIFFICULTY_CONFIG = {
  Easy: { color: '#22c55e', bg: '#22c55e22', label: '🟢 Easy' },
  Medium: { color: '#f59e0b', bg: '#f59e0b22', label: '🟡 Medium' },
  Hard: { color: '#ef4444', bg: '#ef444422', label: '🔴 Hard' },
} as const;

export default function RecipeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const recipe = RECIPES.find((r) => r.id === id);

  if (!recipe) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-foreground text-lg font-semibold">Recipe not found</Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-4 px-6 py-3 bg-primary rounded-2xl active:opacity-80"
        >
          <Text className="text-primary-foreground font-semibold">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const difficulty = DIFFICULTY_CONFIG[recipe.difficulty];

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-safe"
      >
        {/* ── Hero ──────────────────────────────────── */}
        <View
          className="items-center justify-center relative pt-safe-offset-4 pb-8"
          style={{
            backgroundColor: recipe.cardColor + '28',
            minHeight: 280,
          }}
        >
          {/* Decorative circles */}
          <View
            className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20 animate-breathe"
            style={{ backgroundColor: recipe.cardColor }}
          />
          <View
            className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full opacity-15 animate-breathe"
            style={{ backgroundColor: recipe.cardColor }}
          />

          {/* Back button */}
          <Pressable
            onPress={() => router.back()}
            className="absolute left-5 top-safe-offset-3 bg-background/80 rounded-2xl px-3 py-2 flex-row items-center gap-1 active:opacity-70"
          >
            <Text className="text-foreground text-base font-semibold">‹ Back</Text>
          </Pressable>

          {/* Emoji */}
          <View
            className="w-28 h-28 rounded-3xl items-center justify-center mb-5 uw-entering-bounce-in uw-entering-delay-200"
            style={{
              backgroundColor: recipe.cardColor + '44',
              shadowColor: recipe.cardColor,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.35,
              shadowRadius: 16,
              elevation: 10,
            }}
          >
            <Text style={{ fontSize: 60 }}>{recipe.emoji}</Text>
          </View>

          {/* Category chip */}
          <View
            className="px-3 py-1 rounded-full mb-3"
            style={{ backgroundColor: recipe.cardColor + '33' }}
          >
            <Text
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: recipe.cardColor }}
            >
              {recipe.category}
            </Text>
          </View>

          {/* Title */}
          <Text
            className="text-foreground text-2xl font-black tracking-tight text-center px-8 leading-tight"
          >
            {recipe.title}
          </Text>
        </View>

        {/* ── Meta chips ────────────────────────────── */}
        <View className="flex-row flex-wrap gap-2.5 px-5 pt-5 pb-2 uw-entering-slide-in-left uw-entering-delay-200">
          {[
            { icon: '⏱', label: recipe.time },
            { icon: '👤', label: `${recipe.servings} servings` },
            { icon: '🔥', label: `${recipe.calories} cal` },
            { icon: difficulty.label.slice(0, 2), label: recipe.difficulty },
          ].map(({ icon, label }) => (
            <View
              key={label}
              className="flex-row items-center gap-1.5 bg-surface px-3.5 py-2 rounded-2xl border border-border"
            >
              <Text className="text-sm">{icon}</Text>
              <Text className="text-foreground-secondary text-sm font-semibold">
                {label}
              </Text>
            </View>
          ))}
        </View>

        {/* ── Description ───────────────────────────── */}
        <View className="px-5 py-4 uw-entering-slide-in-right uw-entering-delay-200">
          <Text className="text-foreground-secondary text-base leading-relaxed">
            {recipe.description}
          </Text>
        </View>

        {/* ── Tags ──────────────────────────────────── */}
        <View className="flex-row flex-wrap gap-2 px-5 pb-5">
          {recipe.tags.map((tag) => (
            <View
              key={tag}
              className="px-3 py-1 rounded-full bg-primary-subtle"
            >
              <Text className="text-primary text-xs font-semibold">{tag}</Text>
            </View>
          ))}
        </View>

        {/* ── Divider ───────────────────────────────── */}
        <View className="h-px bg-border mx-5 mb-6" />

        {/* ── Ingredients ───────────────────────────── */}
        <View className="px-5 mb-6">
          <View className="flex-row items-center gap-2 mb-4">
            <View
              className="w-1 h-5 rounded-full"
              style={{ backgroundColor: recipe.cardColor }}
            />
            <Text className="text-foreground text-lg font-black tracking-tight">
              Ingredients
            </Text>
          </View>

          <View className="gap-2">
            {recipe.ingredients.map((ing, i) => (
              <View
                key={i}
                className={`flex-row items-center bg-card rounded-2xl px-4 py-3 gap-3 uw-entering-fade-in-down uw-entering-delay-400`}
              >
                <View
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: recipe.cardColor }}
                />
                <Text className="text-foreground-secondary text-sm font-bold w-16 flex-shrink-0">
                  {ing.amount}
                </Text>
                <Text className="text-card-foreground text-sm flex-1">{ing.item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Divider ───────────────────────────────── */}
        <View className="h-px bg-border mx-5 mb-6" />

        {/* ── Steps ─────────────────────────────────── */}
        <View className="px-5">
          <View className="flex-row items-center gap-2 mb-4">
            <View
              className="w-1 h-5 rounded-full"
              style={{ backgroundColor: recipe.cardColor }}
            />
            <Text className="text-foreground text-lg font-black tracking-tight">
              Instructions
            </Text>
          </View>

          <View className="gap-4">
            {recipe.steps.map((step, i) => (
              <View key={i} className="flex-row gap-4">
                {/* Step number */}
                <View
                  className="w-8 h-8 rounded-full items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: recipe.cardColor }}
                >
                  <Text className="text-white text-xs font-black">{i + 1}</Text>
                </View>

                {/* Step text */}
                <View className="flex-1">
                  <Text className="text-card-foreground text-sm leading-relaxed">
                    {step}
                  </Text>
                  {/* Connector line (not for last step) */}
                  {i < recipe.steps.length - 1 && (
                    <View
                      className="w-px h-4 ml-4 mt-2"
                      style={{ backgroundColor: recipe.cardColor + '44' }}
                    />
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
