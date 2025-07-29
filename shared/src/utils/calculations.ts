import { UserProfile, Gender, ActivityLevel } from '../types/user';
import { NutritionInfo, NutritionTargets } from '../types/nutrition';

// BMR (Basal Metabolic Rate) calculations
export function calculateBMR(weight: number, height: number, age: number, gender: Gender): number {
  // Mifflin-St Jeor Equation
  const baseRate = (10 * weight) + (6.25 * height) - (5 * age);
  
  switch (gender) {
    case Gender.MALE:
      return baseRate + 5;
    case Gender.FEMALE:
      return baseRate - 161;
    default:
      return baseRate - 78; // Average between male and female
  }
}

// TDEE (Total Daily Energy Expenditure) calculations
export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  const activityMultipliers = {
    [ActivityLevel.SEDENTARY]: 1.2,
    [ActivityLevel.LIGHTLY_ACTIVE]: 1.375,
    [ActivityLevel.MODERATELY_ACTIVE]: 1.55,
    [ActivityLevel.VERY_ACTIVE]: 1.725,
    [ActivityLevel.EXTREMELY_ACTIVE]: 1.9
  };
  
  return bmr * activityMultipliers[activityLevel];
}

// Calculate age from date of birth
export function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

// BMI calculations
export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

// Body fat percentage estimation (using Navy Method)
export function estimateBodyFat(
  gender: Gender,
  waist: number,
  neck: number,
  height: number,
  hips?: number
): number {
  if (gender === Gender.MALE) {
    return 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else {
    const hipsMeasurement = hips || waist * 1.1; // Fallback estimation
    return 495 / (1.29579 - 0.35004 * Math.log10(waist + hipsMeasurement - neck) + 0.22100 * Math.log10(height)) - 450;
  }
}

// Macro calculations
export function calculateMacroTargets(
  calories: number,
  goal: 'lose_weight' | 'build_muscle' | 'maintain_fitness'
): NutritionTargets {
  let proteinRatio: number;
  let fatRatio: number;
  let carbRatio: number;
  
  switch (goal) {
    case 'lose_weight':
      proteinRatio = 0.35; // Higher protein for muscle preservation
      fatRatio = 0.25;
      carbRatio = 0.40;
      break;
    case 'build_muscle':
      proteinRatio = 0.30;
      fatRatio = 0.25;
      carbRatio = 0.45; // Higher carbs for energy
      break;
    default: // maintain_fitness
      proteinRatio = 0.25;
      fatRatio = 0.30;
      carbRatio = 0.45;
  }
  
  const protein = (calories * proteinRatio) / 4; // 4 cal per gram
  const fat = (calories * fatRatio) / 9; // 9 cal per gram
  const carbohydrates = (calories * carbRatio) / 4; // 4 cal per gram
  
  return {
    calories,
    protein: Math.round(protein),
    carbohydrates: Math.round(carbohydrates),
    fat: Math.round(fat),
    fiber: Math.round(calories / 1000 * 14), // 14g per 1000 calories
    sodium: 2300, // mg, standard recommendation
    sugar: Math.round(calories * 0.10 / 4) // Max 10% of calories from added sugar
  };
}

// One Rep Max calculations
export function calculateOneRepMax(weight: number, reps: number): number {
  if (reps === 1) return weight;
  if (reps > 12) return weight; // Formula becomes unreliable above 12 reps
  
  // Epley formula
  return weight * (1 + (reps / 30));
}

// Calculate training load/volume
export function calculateTrainingVolume(sets: Array<{ weight?: number; reps?: number }>): number {
  return sets.reduce((total, set) => {
    if (set.weight && set.reps) {
      return total + (set.weight * set.reps);
    }
    return total;
  }, 0);
}

// Water intake recommendations
export function calculateWaterIntake(weight: number, activityLevel: ActivityLevel): number {
  // Base recommendation: 35ml per kg of body weight
  let baseIntake = weight * 35;
  
  // Activity level adjustments
  const activityMultipliers = {
    [ActivityLevel.SEDENTARY]: 1.0,
    [ActivityLevel.LIGHTLY_ACTIVE]: 1.1,
    [ActivityLevel.MODERATELY_ACTIVE]: 1.2,
    [ActivityLevel.VERY_ACTIVE]: 1.4,
    [ActivityLevel.EXTREMELY_ACTIVE]: 1.6
  };
  
  return Math.round(baseIntake * activityMultipliers[activityLevel]);
}

// Calorie burn estimation for exercises
export function estimateCaloriesBurned(
  weight: number,
  duration: number,
  metValue: number
): number {
  // METs formula: calories = METs × weight (kg) × time (hours)
  const hours = duration / 60;
  return Math.round(metValue * weight * hours);
}

// Progress calculation utilities
export function calculateProgressPercentage(current: number, target: number): number {
  if (target === 0) return 0;
  return Math.min(100, Math.round((current / target) * 100));
}

export function calculateStreakDays(dates: string[]): number {
  if (dates.length === 0) return 0;
  
  const sortedDates = dates.sort().reverse();
  const today = new Date().toISOString().split('T')[0];
  
  let streak = 0;
  let currentDate = new Date(today);
  
  for (const dateStr of sortedDates) {
    const date = new Date(dateStr);
    const daysDiff = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === streak) {
      streak++;
      currentDate = new Date(currentDate.getTime() - (24 * 60 * 60 * 1000));
    } else {
      break;
    }
  }
  
  return streak;
}

// Nutrition calculations
export function calculateNutritionDensity(nutrition: NutritionInfo): number {
  // Simple nutrition density score based on protein content and micronutrients
  const proteinScore = (nutrition.protein / nutrition.calories) * 100 * 4; // Protein per calorie
  const fiberScore = (nutrition.fiber || 0) / nutrition.calories * 100 * 10;
  const micronutrientScore = [
    nutrition.vitaminA,
    nutrition.vitaminC,
    nutrition.calcium,
    nutrition.iron
  ].filter(v => v !== undefined).length * 5;
  
  return Math.min(100, proteinScore + fiberScore + micronutrientScore);
}

export function calculateMacroRatio(nutrition: NutritionInfo): { protein: number; carbs: number; fat: number } {
  const totalCalories = nutrition.calories;
  
  return {
    protein: Math.round((nutrition.protein * 4 / totalCalories) * 100),
    carbs: Math.round((nutrition.carbohydrates * 4 / totalCalories) * 100),
    fat: Math.round((nutrition.fat * 9 / totalCalories) * 100)
  };
}

// Convert between units
export function convertWeight(weight: number, from: 'kg' | 'lbs', to: 'kg' | 'lbs'): number {
  if (from === to) return weight;
  
  if (from === 'kg' && to === 'lbs') {
    return weight * 2.20462;
  } else {
    return weight / 2.20462;
  }
}

export function convertHeight(height: number, from: 'cm' | 'ft', to: 'cm' | 'ft'): number {
  if (from === to) return height;
  
  if (from === 'cm' && to === 'ft') {
    return height / 30.48;
  } else {
    return height * 30.48;
  }
}