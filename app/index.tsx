import React, { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RECIPES } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import type { Recipe } from '../data/recipes';
import { useCSSVariable } from 'uniwind';

type LayoutMode = 'list' | 'grid';

const CATEGORIES = [
  'All',
  'Pasta',
  'Salad',
  'Soup',
  'Dessert',
  'Breakfast',
  'Asian',
  'Mediterranean',
  'Grilling',
];

export default function HomeScreen() {
  const [layout, setLayout] = useState<LayoutMode>('list');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const colorForeground = useCSSVariable('--color-foreground') as string;
  const colorPrimaryForeground = useCSSVariable('--color-primary-foreground') as string;

  const filteredRecipes =
    selectedCategory === 'All'
      ? RECIPES
      : RECIPES.filter((r) => r.category === selectedCategory);

  const renderListItem = ({ item }: { item: Recipe }) => (
    <RecipeCard recipe={item} mode="list" />
  );

  const renderGridItem = ({ item }: { item: Recipe }) => (
    <RecipeCard recipe={item} mode="grid" />
  );

  return (
    <View className="flex-1 bg-background">
      {/* ── Header ──────────────────────────────────── */}
      <View className="px-6 pb-4 pt-safe-offset-4 bg-background">
        {/* Title row */}
        <View className="flex-row items-start justify-between mb-1">
          <View>
            <Text className="text-foreground text-3xl font-black tracking-tighter leading-tight">
              Recipes
            </Text>
            <Text className="text-muted text-sm mt-0.5">
              {RECIPES.length} handpicked dishes
            </Text>
          </View>

          {/* Layout toggle */}
          <View className="flex-row gap-1 bg-surface rounded-2xl p-1 mt-1">
            <Pressable
              onPress={() => setLayout('list')}
              data-selected={layout === 'list'}
              className="w-9 h-9 rounded-xl items-center justify-center
                data-[selected=true]:bg-primary active:opacity-70"
            >
              <Ionicons
                name="list"
                size={18}
                color={layout === 'list' ? colorPrimaryForeground : colorForeground}
                style={{ lineHeight: 18, includeFontPadding: false }}
              />
            </Pressable>
            <Pressable
              onPress={() => setLayout('grid')}
              data-selected={layout === 'grid'}
              className="w-9 h-9 rounded-xl items-center justify-center
                data-[selected=true]:bg-primary active:opacity-70"
            >
              <Ionicons
                name="grid"
                size={16}
                color={layout === 'grid' ? colorPrimaryForeground : colorForeground}
                style={{ lineHeight: 16, includeFontPadding: false }}
              />
            </Pressable>
          </View>
        </View>

        {/* Divider */}
        <View className="h-px bg-border mt-3 mb-4" />

        {/* Category chips */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={(c) => c}
          contentContainerClassName="gap-2"
          renderItem={({ item: cat }) => {
            const isActive = selectedCategory === cat;
return (
                <Pressable
                  onPress={() => setSelectedCategory(cat)}
                  data-selected={isActive}
                  className="px-3 py-1.5 rounded-full border border-border
                    data-[selected=true]:bg-primary data-[selected=true]:border-primary
                    active:opacity-75 transition-colors"
                >
                  <Text
                    className={`text-xs font-semibold ${isActive ? 'text-primary-foreground' : 'text-foreground-secondary'}`}
                    numberOfLines={1}
                  >
                    {cat}
                  </Text>
                </Pressable>
              );
          }}
        />
      </View>

      {/* ── Recipe list / grid ───────────────────────── */}
      {layout === 'list' ? (
        <FlatList
          key="list"
          data={filteredRecipes}
          keyExtractor={(r) => r.id}
          renderItem={renderListItem}
          contentContainerClassName="px-4 pb-safe-offset-24 gap-3 pt-2"
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          key="grid"
          data={filteredRecipes}
          keyExtractor={(r) => r.id}
          renderItem={renderGridItem}
          numColumns={3}
          columnWrapperClassName="gap-2 px-4"
          contentContainerClassName="pb-safe-offset-24 gap-2 pt-2"
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* ── FAB Theme Switcher ───────────────────────── */}
      <ThemeSwitcher />
    </View>
  );
}
