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
            className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20"
            style={{ backgroundColor: recipe.cardColor }}
          />
          <View
            className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full opacity-15"
            style={{ backgroundColor: recipe.cardColor }}
          />

          {/* Back button */}
          <Pressable
            onPress={() => router.back()}
            className="absolute left-5 top-safe-offset-3 bg-background/80 rounded-2xl px-3 py-2 flex-row items-center gap-1 active:opacity-70 uw-entering-fade-in uw-entering-delay-300"
          >
            <Text className="text-foreground text-base font-semibold">‹ Back</Text>
          </Pressable>

          {/* Emoji */}
          <View
            className="w-28 h-28 rounded-3xl items-center justify-center mb-5 uw-entering-zoom-in uw-entering-delay-400"
            style={{
              backgroundColor: recipe.cardColor + '44',
              shadowColor: recipe.cardColor,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.35,
              shadowRadius: 16,
            }}
          >
            <Text style={{ fontSize: 60 }}>{recipe.emoji}</Text>
          </View>

          {/* Category chip */}
          <View
            className="px-3 py-1 rounded-full mb-3 uw-entering-slide-in-right uw-entering-delay-500"
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
            className="text-foreground text-2xl font-black tracking-tight text-center px-8 leading-tight uw-entering-fade-in-up uw-entering-delay-600"
          >
            {recipe.title}
          </Text>
        </View>

        {/* ── Meta chips ────────────────────────────── */}
        <View className="flex-row flex-wrap gap-2.5 px-5 pt-5 pb-2">
          {[
            { icon: '⏱', label: recipe.time, delay: 'uw-entering-delay-600' },
            { icon: '👤', label: `${recipe.servings} servings`, delay: 'uw-entering-delay-700' },
            { icon: '🔥', label: `${recipe.calories} cal`, delay: 'uw-entering-delay-700' },
            { icon: difficulty.label.slice(0, 2), label: recipe.difficulty, delay: 'uw-entering-delay-700' },
          ].map(({ icon, label, delay }) => (
            <View
              key={label}
              className={`flex-row items-center gap-1.5 bg-surface px-3.5 py-2 rounded-2xl border border-border uw-entering-fade-in ${delay}`}
            >
              <Text className="text-sm">{icon}</Text>
              <Text className="text-foreground-secondary text-sm font-semibold">
                {label}
              </Text>
            </View>
          ))}
        </View>

        {/* ── Description ───────────────────────────── */}
        <View className="px-5 py-4 uw-entering-fade-in uw-entering-delay-700">
          <Text className="text-foreground-secondary text-base leading-relaxed">
            {recipe.description}
          </Text>
        </View>

        {/* ── Tags ──────────────────────────────────── */}
        <View className="flex-row flex-wrap gap-2 px-5 pb-5">
          {recipe.tags.map((tag, index) => {
            const delays = ['uw-entering-delay-700', 'uw-entering-delay-700', 'uw-entering-delay-700'];
            return (
              <View
                key={tag}
                className={`px-3 py-1 rounded-full bg-primary-subtle uw-entering-zoom-in ${delays[index] ?? 'uw-entering-delay-700'}`}
              >
                <Text className="text-primary text-xs font-semibold">{tag}</Text>
              </View>
            );
          })}
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
            {recipe.ingredients.map((ing, i) => {
              const delays = ['uw-entering-delay-400', 'uw-entering-delay-500', 'uw-entering-delay-600', 'uw-entering-delay-700', 'uw-entering-delay-700', 'uw-entering-delay-700', 'uw-entering-delay-700', 'uw-entering-delay-700'];
              return (
                <View
                  key={i}
                  className={`flex-row items-center bg-card rounded-2xl px-4 py-3 gap-3 uw-entering-slide-in-left ${delays[i] ?? 'uw-entering-delay-700'}`}
                >
                  <View
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: recipe.cardColor }}
                  />
                  <Text className="text-foreground-secondary text-sm font-bold w-16 shrink-0">
                    {ing.amount}
                  </Text>
                  <Text className="text-card-foreground text-sm flex-1">{ing.item}</Text>
                </View>
              );
            })}
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
                  className="w-8 h-8 rounded-full items-center justify-center shrink-0 mt-0.5"
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
