import React from 'react';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/useColorScheme';
import Colors, { gradients, FitnessColors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

interface QuickStatProps {
  title: string;
  value: string;
  unit: string;
  icon: string;
  color: string;
}

function QuickStat({ title, value, unit, icon, color }: QuickStatProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.statCard, { backgroundColor: theme.cardBackground }]}>
      <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon as any} size={24} color={color} />
      </View>
      <View style={styles.statContent}>
        <Text style={[styles.statTitle, { color: theme.textSecondary }]}>{title}</Text>
        <View style={styles.statValueContainer}>
          <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
          <Text style={[styles.statUnit, { color: theme.textSecondary }]}>{unit}</Text>
        </View>
      </View>
    </View>
  );
}

interface QuickActionProps {
  title: string;
  subtitle: string;
  icon: string;
  gradient: string[];
  onPress: () => void;
}

function QuickAction({ title, subtitle, icon, gradient, onPress }: QuickActionProps) {
  return (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <LinearGradient colors={gradient} style={styles.quickActionGradient}>
        <Ionicons name={icon as any} size={32} color="white" />
        <Text style={styles.quickActionTitle}>{title}</Text>
        <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const today = new Date();
  const greeting = today.getHours() < 12 ? 'Good Morning' : today.getHours() < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header with Greeting */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <LinearGradient colors={gradients.primary} style={styles.headerGradient}>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>{greeting}, Alex!</Text>
            <Text style={styles.motivationalText}>Ready to crush your goals today?</Text>
            <View style={styles.streakContainer}>
              <Ionicons name="flame" size={20} color="#FFD700" />
              <Text style={styles.streakText}>7 day streak!</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Today's Quick Stats */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Today's Summary</Text>
        <View style={styles.statsGrid}>
          <QuickStat
            title="Calories Burned"
            value="485"
            unit="kcal"
            icon="flame-outline"
            color={FitnessColors.calories}
          />
          <QuickStat
            title="Active Minutes"
            value="32"
            unit="min"
            icon="time-outline"
            color={FitnessColors.cardio}
          />
          <QuickStat
            title="Steps"
            value="8,243"
            unit="steps"
            icon="walk-outline"
            color={FitnessColors.endurance}
          />
          <QuickStat
            title="Water Intake"
            value="1.2"
            unit="L"
            icon="water-outline"
            color={FitnessColors.carbs}
          />
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <QuickAction
            title="Start Workout"
            subtitle="Begin today's plan"
            icon="fitness-outline"
            gradient={gradients.workout}
            onPress={() => console.log('Start workout')}
          />
          <QuickAction
            title="Log Meal"
            subtitle="Track nutrition"
            icon="restaurant-outline"
            gradient={gradients.nutrition}
            onPress={() => console.log('Log meal')}
          />
          <QuickAction
            title="Body Scan"
            subtitle="AI progress check"
            icon="scan-outline"
            gradient={gradients.progress}
            onPress={() => console.log('Body scan')}
          />
          <QuickAction
            title="AI Coach"
            subtitle="Get guidance"
            icon="chatbubble-ellipses-outline"
            gradient={gradients.premium}
            onPress={() => console.log('AI coach')}
          />
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={[styles.seeAllText, { color: theme.accent }]}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={[styles.activityCard, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: FitnessColors.strength + '20' }]}>
              <Ionicons name="barbell-outline" size={20} color={FitnessColors.strength} />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityTitle, { color: theme.text }]}>Upper Body Strength</Text>
              <Text style={[styles.activityTime, { color: theme.textSecondary }]}>45 minutes • 2 hours ago</Text>
            </View>
            <View style={styles.activityStats}>
              <Text style={[styles.activityValue, { color: FitnessColors.strength }]}>485 kcal</Text>
            </View>
          </View>
          
          <View style={styles.activityDivider} />
          
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: FitnessColors.carbs + '20' }]}>
              <Ionicons name="restaurant-outline" size={20} color={FitnessColors.carbs} />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityTitle, { color: theme.text }]}>Lunch - Grilled Chicken Salad</Text>
              <Text style={[styles.activityTime, { color: theme.textSecondary }]}>4 hours ago</Text>
            </View>
            <View style={styles.activityStats}>
              <Text style={[styles.activityValue, { color: FitnessColors.protein }]}>420 kcal</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Weekly Progress */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>This Week's Progress</Text>
        <View style={[styles.progressCard, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressTitle, { color: theme.text }]}>Workout Goal</Text>
            <Text style={[styles.progressPercentage, { color: FitnessColors.improvement }]}>78%</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: '78%', backgroundColor: FitnessColors.improvement },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { color: theme.textSecondary }]}>
            4 of 5 workouts completed
          </Text>
        </View>
      </View>

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
    marginBottom: 20,
  },
  headerGradient: {
    padding: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerContent: {
    paddingTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  motivationalText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 15,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  streakText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 6,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 60) / 2,
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statTitle: {
    fontSize: 12,
    marginBottom: 4,
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statUnit: {
    fontSize: 12,
    marginLeft: 4,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    width: (width - 60) / 2,
    marginBottom: 15,
  },
  quickActionGradient: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 110,
  },
  quickActionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  quickActionSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  activityCard: {
    borderRadius: 15,
    padding: 15,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
  },
  activityStats: {
    alignItems: 'flex-end',
  },
  activityValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  activityDivider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 5,
  },
  progressCard: {
    padding: 20,
    borderRadius: 15,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
  },
});