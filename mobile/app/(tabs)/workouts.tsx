import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { useColorScheme } from '@/hooks/useColorScheme';
import Colors, { gradients, FitnessColors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

interface WorkoutCardProps {
  title: string;
  duration: string;
  exercises: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  type: string;
  isActive?: boolean;
  onPress: () => void;
}

function WorkoutCard({ title, duration, exercises, difficulty, type, isActive, onPress }: WorkoutCardProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  
  const difficultyColors = {
    'Beginner': FitnessColors.low,
    'Intermediate': FitnessColors.moderate,
    'Advanced': FitnessColors.high,
  };

  return (
    <TouchableOpacity style={[styles.workoutCard, { backgroundColor: theme.cardBackground }]} onPress={onPress}>
      {isActive && (
        <View style={[styles.activeIndicator, { backgroundColor: FitnessColors.improvement }]}>
          <Ionicons name="play" size={12} color="white" />
          <Text style={styles.activeText}>ACTIVE</Text>
        </View>
      )}
      
      <View style={styles.workoutHeader}>
        <View style={[styles.workoutTypeIcon, { backgroundColor: FitnessColors.strength + '20' }]}>
          <Ionicons name="fitness-outline" size={24} color={FitnessColors.strength} />
        </View>
        <View style={styles.workoutInfo}>
          <Text style={[styles.workoutTitle, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.workoutType, { color: theme.textSecondary }]}>{type}</Text>
        </View>
        <View style={[styles.difficultyBadge, { backgroundColor: difficultyColors[difficulty] + '20' }]}>
          <Text style={[styles.difficultyText, { color: difficultyColors[difficulty] }]}>{difficulty}</Text>
        </View>
      </View>
      
      <View style={styles.workoutStats}>
        <View style={styles.statItem}>
          <Ionicons name="time-outline" size={16} color={theme.textSecondary} />
          <Text style={[styles.statText, { color: theme.textSecondary }]}>{duration}</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="barbell-outline" size={16} color={theme.textSecondary} />
          <Text style={[styles.statText, { color: theme.textSecondary }]}>{exercises} exercises</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

interface QuickStartProps {
  icon: string;
  title: string;
  subtitle: string;
  gradient: string[];
  onPress: () => void;
}

function QuickStart({ icon, title, subtitle, gradient, onPress }: QuickStartProps) {
  return (
    <TouchableOpacity style={styles.quickStartCard} onPress={onPress}>
      <LinearGradient colors={gradient} style={styles.quickStartGradient}>
        <Ionicons name={icon as any} size={28} color="white" />
        <Text style={styles.quickStartTitle}>{title}</Text>
        <Text style={styles.quickStartSubtitle}>{subtitle}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function WorkoutsScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'today' | 'plans' | 'history'>('today');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const workoutPlans = [
    {
      title: 'Upper Body Strength',
      duration: '45 min',
      exercises: 8,
      difficulty: 'Intermediate' as const,
      type: 'Strength Training',
      isActive: true,
    },
    {
      title: 'HIIT Cardio Blast',
      duration: '25 min',
      exercises: 6,
      difficulty: 'Advanced' as const,
      type: 'HIIT',
    },
    {
      title: 'Morning Yoga Flow',
      duration: '30 min',
      exercises: 12,
      difficulty: 'Beginner' as const,
      type: 'Yoga',
    },
    {
      title: 'Core Destroyer',
      duration: '20 min',
      exercises: 10,
      difficulty: 'Intermediate' as const,
      type: 'Core Training',
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Workouts</Text>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Quick Start Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Quick Start</Text>
        <View style={styles.quickStartGrid}>
          <QuickStart
            icon="flash-outline"
            title="AI Workout"
            subtitle="Generated for you"
            gradient={gradients.premium}
            onPress={() => console.log('AI Workout')}
          />
          <QuickStart
            icon="timer-outline"
            title="Quick HIIT"
            subtitle="15 min session"
            gradient={gradients.workout}
            onPress={() => console.log('Quick HIIT')}
          />
          <QuickStart
            icon="walk-outline"
            title="Free Training"
            subtitle="Track manually"
            gradient={gradients.secondary}
            onPress={() => console.log('Free Training')}
          />
          <QuickStart
            icon="refresh-outline"
            title="Repeat Last"
            subtitle="Upper body"
            gradient={gradients.accent}
            onPress={() => console.log('Repeat Last')}
          />
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {['today', 'plans', 'history'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && { backgroundColor: theme.primary + '20' }
            ]}
            onPress={() => setActiveTab(tab as any)}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === tab ? theme.primary : theme.textSecondary }
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Today's Workout */}
      {activeTab === 'today' && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Today's Plan</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: theme.accent }]}>Customize</Text>
            </TouchableOpacity>
          </View>
          
          <View style={[styles.todayWorkoutCard, { backgroundColor: theme.cardBackground }]}>
            <LinearGradient
              colors={gradients.workout}
              style={styles.todayWorkoutGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.todayWorkoutContent}>
                <Text style={styles.todayWorkoutTitle}>Upper Body Power</Text>
                <Text style={styles.todayWorkoutSubtitle}>8 exercises • 45 minutes</Text>
                <View style={styles.todayWorkoutStats}>
                  <View style={styles.todayStatItem}>
                    <Text style={styles.todayStatValue}>485</Text>
                    <Text style={styles.todayStatLabel}>cal burn</Text>
                  </View>
                  <View style={styles.todayStatItem}>
                    <Text style={styles.todayStatValue}>3.2</Text>
                    <Text style={styles.todayStatLabel}>difficulty</Text>
                  </View>
                  <View style={styles.todayStatItem}>
                    <Text style={styles.todayStatValue}>92%</Text>
                    <Text style={styles.todayStatLabel}>match</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.startButton}>
                <Ionicons name="play" size={20} color="white" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      )}

      {/* Workout Plans */}
      {activeTab === 'plans' && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Workout Plans</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: theme.accent }]}>Create New</Text>
            </TouchableOpacity>
          </View>
          
          {workoutPlans.map((workout, index) => (
            <WorkoutCard
              key={index}
              {...workout}
              onPress={() => console.log('Workout pressed:', workout.title)}
            />
          ))}
        </View>
      )}

      {/* Workout History */}
      {activeTab === 'history' && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Workouts</Text>
          
          <View style={[styles.historyCard, { backgroundColor: theme.cardBackground }]}>
            <View style={styles.historyItem}>
              <View style={[styles.historyIcon, { backgroundColor: FitnessColors.strength + '20' }]}>
                <Ionicons name="barbell-outline" size={20} color={FitnessColors.strength} />
              </View>
              <View style={styles.historyContent}>
                <Text style={[styles.historyTitle, { color: theme.text }]}>Upper Body Strength</Text>
                <Text style={[styles.historyTime, { color: theme.textSecondary }]}>Today • 45 min</Text>
              </View>
              <View style={styles.historyStats}>
                <Text style={[styles.historyValue, { color: FitnessColors.strength }]}>485 kcal</Text>
                <Text style={[styles.historyRating, { color: theme.textSecondary }]}>⭐ 4.8</Text>
              </View>
            </View>
            
            <View style={styles.historyDivider} />
            
            <View style={styles.historyItem}>
              <View style={[styles.historyIcon, { backgroundColor: FitnessColors.cardio + '20' }]}>
                <Ionicons name="flash-outline" size={20} color={FitnessColors.cardio} />
              </View>
              <View style={styles.historyContent}>
                <Text style={[styles.historyTitle, { color: theme.text }]}>HIIT Cardio</Text>
                <Text style={[styles.historyTime, { color: theme.textSecondary }]}>Yesterday • 25 min</Text>
              </View>
              <View style={styles.historyStats}>
                <Text style={[styles.historyValue, { color: FitnessColors.cardio }]}>312 kcal</Text>
                <Text style={[styles.historyRating, { color: theme.textSecondary }]}>⭐ 4.5</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Bottom spacing */}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  quickStartGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickStartCard: {
    width: (width - 60) / 2,
    marginBottom: 15,
  },
  quickStartGradient: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  quickStartTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  quickStartSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  todayWorkoutCard: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  todayWorkoutGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  todayWorkoutContent: {
    flex: 1,
  },
  todayWorkoutTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  todayWorkoutSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 15,
  },
  todayWorkoutStats: {
    flexDirection: 'row',
  },
  todayStatItem: {
    marginRight: 20,
  },
  todayStatValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  todayStatLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  startButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutCard: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  activeIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  activeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  workoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  workoutTypeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  workoutType: {
    fontSize: 14,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  workoutStats: {
    flexDirection: 'row',
    marginTop: 10,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statText: {
    fontSize: 14,
    marginLeft: 6,
  },
  historyCard: {
    borderRadius: 15,
    padding: 15,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  historyTime: {
    fontSize: 12,
  },
  historyStats: {
    alignItems: 'flex-end',
  },
  historyValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  historyRating: {
    fontSize: 12,
  },
  historyDivider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 5,
  },
});