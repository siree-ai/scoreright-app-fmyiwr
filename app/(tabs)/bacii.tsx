
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { GlassView } from 'expo-glass-effect';
import * as Haptics from 'expo-haptics';

type Grade = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | null;

export default function BacIICalculator() {
  const theme = useTheme();
  const [writing, setWriting] = useState('');
  const [math, setMath] = useState('');
  const [physics, setPhysics] = useState('');
  const [chemistry, setChemistry] = useState('');
  const [biology, setBiology] = useState('');
  const [history, setHistory] = useState('');
  const [english, setEnglish] = useState('');
  const [totalPoints, setTotalPoints] = useState<number | null>(null);
  const [grade, setGrade] = useState<Grade>(null);
  const [bonus, setBonus] = useState<number>(0);

  const getGradeColor = (grade: Grade): string => {
    switch (grade) {
      case 'A':
        return '#34C759'; // Green
      case 'B':
        return '#5AC8FA'; // Light Blue
      case 'C':
        return '#FFD60A'; // Yellow
      case 'D':
        return '#FF9F0A'; // Orange
      case 'E':
        return '#FF6B6B'; // Light Red
      case 'F':
        return '#FF3B30'; // Red
      default:
        return '#999';
    }
  };

  const calculateGrade = () => {
    console.log('Calculating Bac II grade...');
    const w = parseFloat(writing);
    const m = parseFloat(math);
    const p = parseFloat(physics);
    const c = parseFloat(chemistry);
    const b = parseFloat(biology);
    const h = parseFloat(history);
    const e = parseFloat(english);

    // Validate inputs
    if (
      isNaN(w) || isNaN(m) || isNaN(p) || isNaN(c) || isNaN(b) || isNaN(h) || isNaN(e) ||
      w < 0 || w > 75 ||
      m < 0 || m > 125 ||
      p < 0 || p > 75 ||
      c < 0 || c > 75 ||
      b < 0 || b > 75 ||
      h < 0 || h > 50 ||
      e < 0 || e > 50
    ) {
      console.log('Invalid input values');
      setTotalPoints(null);
      setGrade(null);
      setBonus(0);
      return;
    }

    // Calculate English score: subtract 25 from the raw score
    // If English score is 50, the actual points = 50 - 25 = 25
    // If English score is 30, the actual points = 30 - 25 = 5
    // If English score is 25 or below, the actual points = 0
    let actualEnglishScore = Math.max(0, e - 25);
    
    // Calculate bonus for English scores above 25
    let englishBonus = 0;
    if (e > 25) {
      englishBonus = e - 25;
      console.log('English bonus:', englishBonus);
    }
    setBonus(englishBonus);

    // Calculate total points
    // English contributes: actualEnglishScore (which is already e - 25)
    const total = w + m + p + c + b + h + actualEnglishScore;
    console.log('Total points:', total);
    setTotalPoints(total);

    // Assign grade
    let letterGrade: Grade;
    if (total >= 427 && total <= 475) {
      letterGrade = 'A';
    } else if (total >= 380 && total <= 426) {
      letterGrade = 'B';
    } else if (total >= 332 && total <= 379) {
      letterGrade = 'C';
    } else if (total >= 286 && total <= 331) {
      letterGrade = 'D';
    } else if (total >= 237 && total <= 285) {
      letterGrade = 'E';
    } else {
      letterGrade = 'F';
    }
    console.log('Grade:', letterGrade);
    setGrade(letterGrade);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const resetForm = () => {
    console.log('Resetting Bac II form...');
    setWriting('');
    setMath('');
    setPhysics('');
    setChemistry('');
    setBiology('');
    setHistory('');
    setEnglish('');
    setTotalPoints(null);
    setGrade(null);
    setBonus(0);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
      edges={['top']}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={[
            styles.contentContainer,
            Platform.OS !== 'ios' && styles.contentContainerWithTabBar,
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Bac II Grade Calculator
          </Text>
          <Text style={[styles.subtitle, { color: theme.dark ? '#98989D' : '#666' }]}>
            Enter your scores for each subject
          </Text>

          <GlassView
            style={[
              styles.card,
              Platform.OS !== 'ios' && {
                backgroundColor: theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              },
            ]}
            glassEffectStyle="regular"
          >
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>
                Writing <Text style={styles.maxScore}>(max 75)</Text>
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.colors.text,
                    backgroundColor: theme.dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    borderColor: theme.dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                  },
                ]}
                value={writing}
                onChangeText={setWriting}
                keyboardType="numeric"
                placeholder="0 - 75"
                placeholderTextColor={theme.dark ? '#666' : '#999'}
                maxLength={2}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>
                Math <Text style={styles.maxScore}>(max 125)</Text>
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.colors.text,
                    backgroundColor: theme.dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    borderColor: theme.dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                  },
                ]}
                value={math}
                onChangeText={setMath}
                keyboardType="numeric"
                placeholder="0 - 125"
                placeholderTextColor={theme.dark ? '#666' : '#999'}
                maxLength={3}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>
                Physics <Text style={styles.maxScore}>(max 75)</Text>
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.colors.text,
                    backgroundColor: theme.dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    borderColor: theme.dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                  },
                ]}
                value={physics}
                onChangeText={setPhysics}
                keyboardType="numeric"
                placeholder="0 - 75"
                placeholderTextColor={theme.dark ? '#666' : '#999'}
                maxLength={2}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>
                Chemistry <Text style={styles.maxScore}>(max 75)</Text>
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.colors.text,
                    backgroundColor: theme.dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    borderColor: theme.dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                  },
                ]}
                value={chemistry}
                onChangeText={setChemistry}
                keyboardType="numeric"
                placeholder="0 - 75"
                placeholderTextColor={theme.dark ? '#666' : '#999'}
                maxLength={2}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>
                Biology <Text style={styles.maxScore}>(max 75)</Text>
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.colors.text,
                    backgroundColor: theme.dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    borderColor: theme.dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                  },
                ]}
                value={biology}
                onChangeText={setBiology}
                keyboardType="numeric"
                placeholder="0 - 75"
                placeholderTextColor={theme.dark ? '#666' : '#999'}
                maxLength={2}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>
                History <Text style={styles.maxScore}>(max 50)</Text>
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.colors.text,
                    backgroundColor: theme.dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    borderColor: theme.dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                  },
                ]}
                value={history}
                onChangeText={setHistory}
                keyboardType="numeric"
                placeholder="0 - 50"
                placeholderTextColor={theme.dark ? '#666' : '#999'}
                maxLength={2}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>
                English <Text style={styles.maxScore}>(max 50, score - 25)</Text>
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.colors.text,
                    backgroundColor: theme.dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    borderColor: theme.dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                  },
                ]}
                value={english}
                onChangeText={setEnglish}
                keyboardType="numeric"
                placeholder="0 - 50"
                placeholderTextColor={theme.dark ? '#666' : '#999'}
                maxLength={2}
              />
            </View>
          </GlassView>

          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.calculateButton]}
              onPress={calculateGrade}
            >
              <Text style={styles.buttonText}>Calculate</Text>
            </Pressable>

            <Pressable
              style={[
                styles.button,
                styles.resetButton,
                { backgroundColor: theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' },
              ]}
              onPress={resetForm}
            >
              <Text style={[styles.buttonText, { color: theme.colors.text }]}>Reset</Text>
            </Pressable>
          </View>

          {totalPoints !== null && grade !== null && (
            <GlassView
              style={[
                styles.resultCard,
                Platform.OS !== 'ios' && {
                  backgroundColor: theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                },
              ]}
              glassEffectStyle="regular"
            >
              {bonus > 0 && (
                <View style={styles.bonusContainer}>
                  <Text style={[styles.bonusText, { color: '#FFD60A' }]}>
                    🎉 English Score: {bonus} points (after -25)
                  </Text>
                </View>
              )}
              <Text style={[styles.resultLabel, { color: theme.dark ? '#98989D' : '#666' }]}>
                Total Points
              </Text>
              <Text style={[styles.resultValue, { color: theme.colors.text }]}>
                {totalPoints.toFixed(1)}
              </Text>
              <View style={styles.gradeContainer}>
                <Text style={[styles.gradeLabel, { color: theme.dark ? '#98989D' : '#666' }]}>
                  Grade
                </Text>
                <View
                  style={[
                    styles.gradeBadge,
                    { backgroundColor: getGradeColor(grade) + '20', borderColor: getGradeColor(grade) },
                  ]}
                >
                  <Text style={[styles.gradeText, { color: getGradeColor(grade) }]}>{grade}</Text>
                </View>
              </View>
              <Text style={[styles.gradeRange, { color: theme.dark ? '#666' : '#999' }]}>
                {grade === 'A' && '427-475 points'}
                {grade === 'B' && '380-426 points'}
                {grade === 'C' && '332-379 points'}
                {grade === 'D' && '286-331 points'}
                {grade === 'E' && '237-285 points'}
                {grade === 'F' && 'Below 237 points'}
              </Text>
            </GlassView>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  contentContainerWithTabBar: {
    paddingBottom: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  maxScore: {
    fontSize: 12,
    fontWeight: '400',
    opacity: 0.6,
  },
  input: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calculateButton: {
    backgroundColor: '#007AFF',
  },
  resetButton: {
    // backgroundColor handled dynamically
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  resultCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  bonusContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 214, 10, 0.1)',
  },
  bonusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  resultLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  gradeContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  gradeLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  gradeBadge: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
  },
  gradeText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  gradeRange: {
    fontSize: 12,
    marginTop: 12,
  },
});
