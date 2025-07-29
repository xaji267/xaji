/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    // Fitness-specific colors
    primary: '#FF6B6B',      // Energetic red
    secondary: '#4ECDC4',    // Calming teal
    accent: '#45B7D1',       // Motivational blue
    success: '#96CEB4',      // Achievement green
    warning: '#FECA57',      // Caution yellow
    error: '#FF6B6B',        // Error red
    cardBackground: '#F8F9FA',
    borderColor: '#E9ECEF',
    textSecondary: '#6C757D',
    workout: '#FF6B6B',
    nutrition: '#4ECDC4',
    progress: '#45B7D1',
    streak: '#96CEB4',
    premium: '#6C5CE7',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    // Fitness-specific colors (adjusted for dark mode)
    primary: '#FF8E8E',      
    secondary: '#6BEDE5',    
    accent: '#67C7F1',       
    success: '#B6DEC8',      
    warning: '#FEDA77',      
    error: '#FF8E8E',        
    cardBackground: '#1E2124',
    borderColor: '#2C2F33',
    textSecondary: '#99AAB5',
    workout: '#FF8E8E',
    nutrition: '#6BEDE5',
    progress: '#67C7F1',
    streak: '#B6DEC8',
    premium: '#8C7CFA',
  },
};

export const FitnessColors = {
  // Exercise type colors
  strength: '#FF6B6B',
  cardio: '#4ECDC4', 
  flexibility: '#A8E6CF',
  hiit: '#FF8B94',
  yoga: '#B4A7D6',
  pilates: '#D4A5A5',
  crossfit: '#FFD93D',
  sports: '#6BCF7F',
  
  // Macro colors
  protein: '#FF6B6B',
  carbs: '#4ECDC4',
  fat: '#FECA57',
  calories: '#45B7D1',
  
  // Progress colors
  improvement: '#96CEB4',
  plateau: '#FECA57',
  decline: '#FF8E8E',
  
  // Goal colors
  weightLoss: '#4ECDC4',
  muscleGain: '#FF6B6B', 
  maintenance: '#96CEB4',
  endurance: '#45B7D1',
  
  // Intensity levels
  low: '#A8E6CF',
  moderate: '#FECA57',
  high: '#FF8B94',
  extreme: '#FF6B6B',
};

export const gradients = {
  primary: ['#FF6B6B', '#FF8E8E'],
  secondary: ['#4ECDC4', '#6BEDE5'],
  accent: ['#45B7D1', '#67C7F1'],
  success: ['#96CEB4', '#B6DEC8'],
  workout: ['#FF6B6B', '#FF8B94'],
  nutrition: ['#4ECDC4', '#A8E6CF'],
  progress: ['#45B7D1', '#96CEB4'],
  premium: ['#6C5CE7', '#A29BFE'],
  sunset: ['#FF8A80', '#FFB74D', '#FFF176'],
  ocean: ['#26C6DA', '#42A5F5', '#5C6BC0'],
  forest: ['#66BB6A', '#8BC34A', '#C5E1A5'],
};

export default Colors;