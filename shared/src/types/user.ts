import { z } from 'zod';

// User profile enums and types
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer_not_to_say'
}

export enum FitnessGoal {
  LOSE_WEIGHT = 'lose_weight',
  BUILD_MUSCLE = 'build_muscle',
  MAINTAIN_FITNESS = 'maintain_fitness',
  IMPROVE_ENDURANCE = 'improve_endurance',
  GENERAL_HEALTH = 'general_health',
  ATHLETIC_PERFORMANCE = 'athletic_performance'
}

export enum ActivityLevel {
  SEDENTARY = 'sedentary',
  LIGHTLY_ACTIVE = 'lightly_active',
  MODERATELY_ACTIVE = 'moderately_active',
  VERY_ACTIVE = 'very_active',
  EXTREMELY_ACTIVE = 'extremely_active'
}

export enum FitnessLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

// Zod schemas for validation
export const UserProfileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dateOfBirth: z.string().datetime(),
  gender: z.nativeEnum(Gender),
  height: z.number().positive(), // in cm
  weight: z.number().positive(), // in kg
  fitnessGoal: z.nativeEnum(FitnessGoal),
  activityLevel: z.nativeEnum(ActivityLevel),
  fitnessLevel: z.nativeEnum(FitnessLevel),
  targetWeight: z.number().positive().optional(),
  targetCalories: z.number().positive().optional(),
  allergies: z.array(z.string()).default([]),
  medicalConditions: z.array(z.string()).default([]),
  profilePicture: z.string().url().optional(),
  timezone: z.string().default('UTC'),
  preferredUnits: z.enum(['metric', 'imperial']).default('metric'),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  isOnboarded: z.boolean().default(false),
  subscriptionTier: z.enum(['free', 'premium', 'pro']).default('free')
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

// User preferences
export const UserPreferencesSchema = z.object({
  notifications: z.object({
    workoutReminders: z.boolean().default(true),
    mealReminders: z.boolean().default(true),
    progressUpdates: z.boolean().default(true),
    challenges: z.boolean().default(true),
    socialUpdates: z.boolean().default(false)
  }),
  workout: z.object({
    preferredWorkoutDuration: z.number().min(15).max(180).default(60), // minutes
    restDayPreference: z.array(z.number().min(0).max(6)).default([0, 6]), // Sunday=0, Saturday=6
    equipmentAvailable: z.array(z.string()).default([]),
    workoutEnvironment: z.enum(['gym', 'home', 'outdoor', 'any']).default('any')
  }),
  nutrition: z.object({
    dietaryRestrictions: z.array(z.string()).default([]),
    mealsPerDay: z.number().min(1).max(8).default(3),
    cookingTime: z.enum(['quick', 'moderate', 'extensive']).default('moderate'),
    budgetRange: z.enum(['low', 'medium', 'high']).default('medium')
  })
});

export type UserPreferences = z.infer<typeof UserPreferencesSchema>;

// User stats and metrics
export interface UserStats {
  totalWorkouts: number;
  totalWorkoutMinutes: number;
  currentStreak: number;
  longestStreak: number;
  totalCaloriesBurned: number;
  averageWorkoutRating: number;
  favoriteExerciseTypes: string[];
  monthlyGoalCompletion: number; // percentage
}

// Body measurements
export interface BodyMeasurement {
  id: string;
  userId: string;
  date: string;
  weight?: number;
  bodyFatPercentage?: number;
  muscleMass?: number;
  measurements: {
    chest?: number;
    waist?: number;
    hips?: number;
    biceps?: number;
    thighs?: number;
    neck?: number;
  };
  photos?: {
    front?: string;
    side?: string;
    back?: string;
  };
  notes?: string;
}

export interface UserProgress {
  userId: string;
  measurements: BodyMeasurement[];
  achievements: Achievement[];
  milestones: Milestone[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: 'workout' | 'nutrition' | 'streak' | 'social' | 'progress';
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  achievedAt?: string;
  category: 'weight' | 'strength' | 'endurance' | 'consistency';
}