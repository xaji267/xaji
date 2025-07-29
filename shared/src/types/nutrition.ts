import { z } from 'zod';

export enum MealType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  SNACK = 'snack',
  PRE_WORKOUT = 'pre_workout',
  POST_WORKOUT = 'post_workout'
}

export enum DietaryRestriction {
  VEGETARIAN = 'vegetarian',
  VEGAN = 'vegan',
  PESCATARIAN = 'pescatarian',
  GLUTEN_FREE = 'gluten_free',
  DAIRY_FREE = 'dairy_free',
  NUT_FREE = 'nut_free',
  SOY_FREE = 'soy_free',
  EGG_FREE = 'egg_free',
  KETO = 'keto',
  PALEO = 'paleo',
  LOW_CARB = 'low_carb',
  LOW_FAT = 'low_fat',
  MEDITERRANEAN = 'mediterranean',
  INTERMITTENT_FASTING = 'intermittent_fasting'
}

export enum CuisineType {
  AMERICAN = 'american',
  ITALIAN = 'italian',
  MEXICAN = 'mexican',
  ASIAN = 'asian',
  INDIAN = 'indian',
  MEDITERRANEAN = 'mediterranean',
  FRENCH = 'french',
  JAPANESE = 'japanese',
  THAI = 'thai',
  CHINESE = 'chinese',
  MIDDLE_EASTERN = 'middle_eastern',
  AFRICAN = 'african',
  LATIN_AMERICAN = 'latin_american'
}

export enum CookingDifficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

// Food and nutrition data
export interface Food {
  id: string;
  name: string;
  brand?: string;
  barcode?: string;
  category: FoodCategory;
  servingSize: number; // in grams
  servingUnit: string; // 'g', 'ml', 'cup', 'piece', etc.
  nutrition: NutritionInfo;
  allergens: string[];
  verified: boolean;
  createdBy: 'system' | 'user' | 'admin';
}

export interface NutritionInfo {
  calories: number;
  protein: number; // in grams
  carbohydrates: number; // in grams
  fat: number; // in grams
  fiber?: number; // in grams
  sugar?: number; // in grams
  sodium?: number; // in mg
  cholesterol?: number; // in mg
  vitaminA?: number; // in IU
  vitaminC?: number; // in mg
  calcium?: number; // in mg
  iron?: number; // in mg
  potassium?: number; // in mg
  saturatedFat?: number; // in grams
  transFat?: number; // in grams
  monounsaturatedFat?: number; // in grams
  polyunsaturatedFat?: number; // in grams
}

export enum FoodCategory {
  FRUITS = 'fruits',
  VEGETABLES = 'vegetables',
  GRAINS = 'grains',
  PROTEINS = 'proteins',
  DAIRY = 'dairy',
  NUTS_SEEDS = 'nuts_seeds',
  OILS_FATS = 'oils_fats',
  BEVERAGES = 'beverages',
  SNACKS = 'snacks',
  SWEETS = 'sweets',
  CONDIMENTS = 'condiments',
  HERBS_SPICES = 'herbs_spices'
}

// Recipe and meal planning
export interface Recipe {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty: CookingDifficulty;
  cuisine: CuisineType;
  dietaryTags: DietaryRestriction[];
  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];
  nutrition: NutritionInfo;
  tags: string[];
  rating?: number;
  reviewCount?: number;
  createdBy: 'ai' | 'user' | 'chef';
  isVerified: boolean;
  calories: number;
  macroRatio: {
    protein: number; // percentage
    carbs: number; // percentage
    fat: number; // percentage
  };
}

export interface RecipeIngredient {
  id: string;
  foodId: string;
  food: Food;
  amount: number;
  unit: string;
  notes?: string;
  isOptional: boolean;
}

export interface RecipeInstruction {
  step: number;
  instruction: string;
  duration?: number; // in minutes
  temperature?: number; // in celsius
  equipment?: string[];
}

// Meal tracking
export interface MealEntry {
  id: string;
  userId: string;
  date: string;
  mealType: MealType;
  foods: FoodEntry[];
  recipes: RecipeEntry[];
  totalNutrition: NutritionInfo;
  notes?: string;
  rating?: number; // 1-5
  loggedAt: string;
}

export interface FoodEntry {
  foodId: string;
  food: Food;
  amount: number;
  unit: string;
  nutrition: NutritionInfo; // calculated based on amount
}

export interface RecipeEntry {
  recipeId: string;
  recipe: Recipe;
  servings: number;
  nutrition: NutritionInfo; // calculated based on servings
}

// Meal planning
export interface MealPlan {
  id: string;
  userId: string;
  name: string;
  startDate: string;
  endDate: string;
  dailyMeals: DailyMealPlan[];
  targetNutrition: NutritionTargets;
  dietaryRestrictions: DietaryRestriction[];
  preferences: MealPlanPreferences;
  generatedBy: 'ai' | 'user' | 'nutritionist';
  isActive: boolean;
}

export interface DailyMealPlan {
  date: string;
  meals: PlannedMeal[];
  dailyNutrition: NutritionInfo;
  waterIntake?: number; // in ml
  notes?: string;
}

export interface PlannedMeal {
  mealType: MealType;
  recipes: string[]; // recipe IDs
  foods: { foodId: string; amount: number; unit: string }[];
  plannedTime?: string;
  prepTime: number;
  nutrition: NutritionInfo;
}

export interface NutritionTargets {
  calories: number;
  protein: number; // in grams
  carbohydrates: number; // in grams
  fat: number; // in grams
  fiber?: number; // in grams
  sodium?: number; // in mg
  sugar?: number; // in grams
}

export interface MealPlanPreferences {
  mealsPerDay: number;
  cuisinePreferences: CuisineType[];
  avoidIngredients: string[];
  maxPrepTime: number; // in minutes
  budgetRange: 'low' | 'medium' | 'high';
  shoppingFrequency: 'daily' | 'weekly' | 'biweekly';
  kitchenEquipment: string[];
  cookingSkill: CookingDifficulty;
}

// Water tracking
export interface WaterEntry {
  id: string;
  userId: string;
  date: string;
  amount: number; // in ml
  loggedAt: string;
  source?: 'water' | 'tea' | 'coffee' | 'juice' | 'sports_drink' | 'other';
}

export interface DailyWaterGoal {
  userId: string;
  date: string;
  targetAmount: number; // in ml
  currentAmount: number; // in ml
  entries: WaterEntry[];
  goalAchieved: boolean;
}

// Nutrition tracking and analytics
export interface NutritionSummary {
  userId: string;
  date: string;
  totalNutrition: NutritionInfo;
  targetNutrition: NutritionTargets;
  adherenceScore: number; // 0-100
  mealDistribution: {
    breakfast: number; // percentage of daily calories
    lunch: number;
    dinner: number;
    snacks: number;
  };
  waterIntake: number; // in ml
  waterGoal: number; // in ml
}

export interface WeeklyNutritionReport {
  userId: string;
  weekStartDate: string;
  weekEndDate: string;
  dailySummaries: NutritionSummary[];
  averageNutrition: NutritionInfo;
  adherenceScore: number;
  trends: {
    calories: number[]; // daily values
    protein: number[];
    carbs: number[];
    fat: number[];
    water: number[];
  };
  achievements: string[];
  recommendations: string[];
}

// Supplement tracking
export interface Supplement {
  id: string;
  name: string;
  brand?: string;
  type: SupplementType;
  dosage: string;
  unit: string;
  nutrition?: Partial<NutritionInfo>;
  benefits: string[];
  warnings?: string[];
  interactions?: string[];
}

export enum SupplementType {
  PROTEIN = 'protein',
  CREATINE = 'creatine',
  MULTIVITAMIN = 'multivitamin',
  VITAMIN_D = 'vitamin_d',
  OMEGA_3 = 'omega_3',
  PROBIOTICS = 'probiotics',
  PRE_WORKOUT = 'pre_workout',
  POST_WORKOUT = 'post_workout',
  BCAA = 'bcaa',
  CAFFEINE = 'caffeine',
  MELATONIN = 'melatonin',
  OTHER = 'other'
}

export interface SupplementEntry {
  id: string;
  userId: string;
  supplementId: string;
  supplement: Supplement;
  date: string;
  amount: number;
  unit: string;
  takenAt: string;
  mealRelation?: 'before' | 'with' | 'after' | 'between';
  notes?: string;
}

// AI meal generation
export interface MealGenerationRequest {
  userId: string;
  targetNutrition: NutritionTargets;
  dietaryRestrictions: DietaryRestriction[];
  cuisinePreferences: CuisineType[];
  avoidIngredients: string[];
  maxPrepTime: number;
  mealType: MealType;
  servings: number;
  budgetRange: 'low' | 'medium' | 'high';
  availableIngredients?: string[];
  preferredProtein?: string[];
}

export interface MealSuggestion {
  recipe: Recipe;
  nutritionMatch: number; // 0-100, how well it matches targets
  reasonsSelected: string[];
  alternatives: Recipe[];
  shoppingList: ShoppingItem[];
}

export interface ShoppingItem {
  foodId: string;
  food: Food;
  amount: number;
  unit: string;
  estimatedCost?: number;
  isAlreadyOwned: boolean;
}

// Zod schemas for validation
export const FoodSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  brand: z.string().optional(),
  barcode: z.string().optional(),
  category: z.nativeEnum(FoodCategory),
  servingSize: z.number().positive(),
  servingUnit: z.string(),
  allergens: z.array(z.string()).default([]),
  verified: z.boolean().default(false),
  createdBy: z.enum(['system', 'user', 'admin']).default('user')
});

export const NutritionInfoSchema = z.object({
  calories: z.number().min(0),
  protein: z.number().min(0),
  carbohydrates: z.number().min(0),
  fat: z.number().min(0),
  fiber: z.number().min(0).optional(),
  sugar: z.number().min(0).optional(),
  sodium: z.number().min(0).optional(),
  cholesterol: z.number().min(0).optional()
});

export const MealEntrySchema = z.object({
  id: z.string(),
  userId: z.string(),
  date: z.string().datetime(),
  mealType: z.nativeEnum(MealType),
  notes: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  loggedAt: z.string().datetime()
});

export const WaterEntrySchema = z.object({
  id: z.string(),
  userId: z.string(),
  date: z.string().datetime(),
  amount: z.number().positive(),
  loggedAt: z.string().datetime(),
  source: z.enum(['water', 'tea', 'coffee', 'juice', 'sports_drink', 'other']).optional()
});

export type FoodInput = z.infer<typeof FoodSchema>;
export type MealEntryInput = z.infer<typeof MealEntrySchema>;
export type WaterEntryInput = z.infer<typeof WaterEntrySchema>;