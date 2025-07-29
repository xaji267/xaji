import { z } from 'zod';

export enum ExerciseType {
  STRENGTH = 'strength',
  CARDIO = 'cardio',
  FLEXIBILITY = 'flexibility',
  HIIT = 'hiit',
  YOGA = 'yoga',
  PILATES = 'pilates',
  CROSSFIT = 'crossfit',
  SPORTS = 'sports',
  REHABILITATION = 'rehabilitation'
}

export enum MuscleGroup {
  CHEST = 'chest',
  BACK = 'back',
  SHOULDERS = 'shoulders',
  BICEPS = 'biceps',
  TRICEPS = 'triceps',
  FOREARMS = 'forearms',
  ABS = 'abs',
  OBLIQUES = 'obliques',
  LOWER_BACK = 'lower_back',
  QUADRICEPS = 'quadriceps',
  HAMSTRINGS = 'hamstrings',
  CALVES = 'calves',
  GLUTES = 'glutes',
  FULL_BODY = 'full_body'
}

export enum Equipment {
  NONE = 'none',
  DUMBBELLS = 'dumbbells',
  BARBELL = 'barbell',
  KETTLEBELL = 'kettlebell',
  RESISTANCE_BANDS = 'resistance_bands',
  PULL_UP_BAR = 'pull_up_bar',
  BENCH = 'bench',
  CABLE_MACHINE = 'cable_machine',
  TREADMILL = 'treadmill',
  STATIONARY_BIKE = 'stationary_bike',
  ROWING_MACHINE = 'rowing_machine',
  YOGA_MAT = 'yoga_mat',
  MEDICINE_BALL = 'medicine_ball',
  FOAM_ROLLER = 'foam_roller'
}

export enum Difficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

// Exercise definition
export interface Exercise {
  id: string;
  name: string;
  description: string;
  instructions: string[];
  type: ExerciseType;
  primaryMuscles: MuscleGroup[];
  secondaryMuscles: MuscleGroup[];
  equipment: Equipment[];
  difficulty: Difficulty;
  videoUrl?: string;
  imageUrls: string[];
  tips: string[];
  commonMistakes: string[];
  variations: ExerciseVariation[];
  caloriesPerMinute: number;
  isCompound: boolean;
  isUnilateral: boolean;
}

export interface ExerciseVariation {
  id: string;
  name: string;
  description: string;
  difficulty: Difficulty;
  modifiedInstructions?: string[];
}

// Workout set types
export interface Set {
  id: string;
  reps?: number;
  weight?: number; // in kg
  duration?: number; // in seconds
  distance?: number; // in meters
  restTime?: number; // in seconds
  rpe?: number; // Rate of Perceived Exertion (1-10)
  notes?: string;
  completed: boolean;
  completedAt?: string;
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  exercise: Exercise;
  sets: Set[];
  order: number;
  supersetGroup?: string;
  restBetweenSets: number; // in seconds
  targetReps?: number;
  targetWeight?: number;
  targetDuration?: number;
  notes?: string;
}

// Workout plan and session
export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  type: ExerciseType;
  difficulty: Difficulty;
  duration: number; // estimated duration in minutes
  exercises: WorkoutExercise[];
  targetMuscleGroups: MuscleGroup[];
  equipment: Equipment[];
  tags: string[];
  estimatedCaloriesBurn: number;
  createdBy: 'ai' | 'user' | 'coach';
  isTemplate: boolean;
  popularity?: number;
  rating?: number;
}

export interface WorkoutSession {
  id: string;
  userId: string;
  workoutPlanId: string;
  workoutPlan: WorkoutPlan;
  startedAt: string;
  completedAt?: string;
  duration?: number; // actual duration in minutes
  exercises: WorkoutExercise[];
  totalCaloriesBurned?: number;
  averageHeartRate?: number;
  maxHeartRate?: number;
  notes?: string;
  rating?: number; // 1-5
  mood?: 'terrible' | 'bad' | 'okay' | 'good' | 'excellent';
  perceivedExertion?: number; // 1-10
  isCompleted: boolean;
  weather?: {
    condition: string;
    temperature: number;
    humidity: number;
  };
}

// Weekly workout program
export interface WorkoutProgram {
  id: string;
  name: string;
  description: string;
  duration: number; // in weeks
  difficulty: Difficulty;
  targetGoals: string[];
  weeklySchedule: WeeklyWorkoutPlan[];
  equipment: Equipment[];
  estimatedTimePerWeek: number; // in minutes
  createdBy: 'ai' | 'coach' | 'user';
  tags: string[];
  popularity?: number;
  rating?: number;
}

export interface WeeklyWorkoutPlan {
  week: number;
  workouts: DailyWorkout[];
  focusAreas: MuscleGroup[];
  notes?: string;
}

export interface DailyWorkout {
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  workoutPlanId?: string;
  workoutPlan?: WorkoutPlan;
  isRestDay: boolean;
  activeRecovery?: {
    type: 'walking' | 'stretching' | 'yoga' | 'light_cardio';
    duration: number;
  };
}

// AI-generated workout customization
export interface WorkoutCustomization {
  userId: string;
  preferences: {
    preferredDuration: number;
    availableEquipment: Equipment[];
    targetMuscleGroups: MuscleGroup[];
    workoutTypes: ExerciseType[];
    intensity: 'low' | 'moderate' | 'high';
    experienceLevel: Difficulty;
  };
  restrictions: {
    injuries: string[];
    dislikedExercises: string[];
    timeConstraints: {
    morningAvailable: boolean;
      afternoonAvailable: boolean;
      eveningAvailable: boolean;
    };
  };
  goals: {
    primaryGoal: string;
    secondaryGoals: string[];
    targetDate?: string;
  };
}

// Workout tracking and progress
export interface ExerciseProgress {
  exerciseId: string;
  userId: string;
  personalRecords: {
    maxWeight: number;
    maxReps: number;
    maxDuration: number;
    maxDistance: number;
  };
  progressHistory: ProgressEntry[];
  strengthCurve: number[]; // weekly strength progression
  volumeHistory: VolumeEntry[];
}

export interface ProgressEntry {
  date: string;
  weight?: number;
  reps?: number;
  duration?: number;
  distance?: number;
  volume: number; // weight * reps * sets
  oneRepMax?: number;
}

export interface VolumeEntry {
  date: string;
  totalVolume: number;
  totalSets: number;
  averageIntensity: number;
}

// Workout challenges and achievements
export interface WorkoutChallenge {
  id: string;
  name: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  target: {
    metric: 'workouts' | 'minutes' | 'calories' | 'exercises' | 'weight' | 'reps';
    value: number;
    timeframe: number; // in days
  };
  reward: {
    points: number;
    badge?: string;
    unlocks?: string[];
  };
  participants: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface UserChallenge {
  challengeId: string;
  userId: string;
  joinedAt: string;
  currentProgress: number;
  isCompleted: boolean;
  completedAt?: string;
  rank?: number;
}

// Zod schemas for validation
export const SetSchema = z.object({
  id: z.string(),
  reps: z.number().int().positive().optional(),
  weight: z.number().positive().optional(),
  duration: z.number().positive().optional(),
  distance: z.number().positive().optional(),
  restTime: z.number().positive().optional(),
  rpe: z.number().min(1).max(10).optional(),
  notes: z.string().optional(),
  completed: z.boolean(),
  completedAt: z.string().datetime().optional()
});

export const WorkoutSessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  workoutPlanId: z.string(),
  startedAt: z.string().datetime(),
  completedAt: z.string().datetime().optional(),
  duration: z.number().positive().optional(),
  totalCaloriesBurned: z.number().positive().optional(),
  averageHeartRate: z.number().positive().optional(),
  maxHeartRate: z.number().positive().optional(),
  notes: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  mood: z.enum(['terrible', 'bad', 'okay', 'good', 'excellent']).optional(),
  perceivedExertion: z.number().min(1).max(10).optional(),
  isCompleted: z.boolean()
});

export type WorkoutSessionInput = z.infer<typeof WorkoutSessionSchema>;