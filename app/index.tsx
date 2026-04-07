import React, { useCallback, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RECIPES } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';
import type { Recipe } from '../data/recipes';
import { withUniwind } from 'uniwind';

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

const UniIonicons = withUniwind(Ionicons)

export default function HomeScreen() {
  const [layout, setLayout] = useState<LayoutMode>('list');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredRecipes =
    selectedCategory === 'All'
      ? RECIPES
      : RECIPES.filter((r) => r.category === selectedCategory);

  const renderListItem = useCallback(({ item, index }: { item: Recipe; index: number }) => (
    <RecipeCard recipe={item} mode="list" index={index} />
  ), []);

  const renderGridItem = useCallback(({ item, index }: { item: Recipe; index: number }) => (
    <RecipeCard recipe={item} mode="grid" index={index} />
  ), []);

  return (
    <View className="flex-1 bg-background">
      {/* ── Header ──────────────────────────────────── */}
      <View className="pb-4 pt-safe-offset-4 bg-background">
        {/* Title row */}
        <View className="flex-row items-start justify-between mb-1 px-6">
          <View className="uw-entering-fade-in-up">
            <Text className="text-foreground text-3xl font-black tracking-tighter leading-tight">
              Recipes
            </Text>
            <Text className="text-muted text-sm mt-0.5 uw-entering-fade-in uw-entering-delay-150">
              {RECIPES.length} handpicked dishes
            </Text>
          </View>

          {/* Layout toggle */}
          <View className="flex-row gap-1 bg-surface border border-border rounded-2xl p-1 mt-1 uw-entering-fade-in uw-entering-delay-200">
            <Pressable
              onPress={() => setLayout('list')}
              data-selected={layout === 'list'}
              className="w-9 h-9 rounded-xl items-center justify-center data-[selected=true]:bg-primary active:opacity-70 transition-colors"
            >
              <UniIonicons
                name="list"
                size={18}
                className='m-auto'
                data-selected={layout === 'list'}
                colorClassName='data-selected:accent-primary-foreground accent-primary'
                style={{ lineHeight: 18, includeFontPadding: false }}
              />
            </Pressable>
            <Pressable
              onPress={() => setLayout('grid')}
              data-selected={layout === 'grid'}
              className="w-9 h-9 rounded-xl items-center justify-center data-[selected=true]:bg-primary active:opacity-70 transition-colors"
            >
              <UniIonicons
                name="grid"
                size={16}
                className='m-auto'
                data-selected={layout === 'grid'}
                colorClassName='data-selected:accent-primary-foreground accent-primary'
                style={{ lineHeight: 16, includeFontPadding: false }}
              />
            </Pressable>
          </View>
        </View>

        {/* Divider */}
        <View className="h-px bg-border mt-3 mb-4 mx-6" />

        {/* Category chips */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={(c) => c}
          contentContainerClassName="gap-2 px-6"
          renderItem={({ item: cat }) => {
            const isActive = selectedCategory === cat;
            return (
                <Pressable
                  onPress={() => setSelectedCategory(cat)}
                  data-selected={isActive}
                  className="px-3 py-1.5 rounded-full border border-primary data-[selected=true]:bg-primary active:opacity-75 transition-colors"
                >
                  <Text
                    data-selected={isActive}
                    className="text-xs font-semibold data-selected:text-primary-foreground text-primary"
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
          columnWrapperClassName="gap-3 px-4"
          contentContainerClassName="pb-safe-offset-24 gap-3 pt-2"
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
