
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

export default function IELTSCalculator() {
  const theme = useTheme();
  const [listening, setListening] = useState('');
  const [reading, setReading] = useState('');
  const [writing, setWriting] = useState('');
  const [speaking, setSpeaking] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculateBandScore = () => {
    console.log('Calculating IELTS band score...');
    const l = parseFloat(listening);
    const r = parseFloat(reading);
    const w = parseFloat(writing);
    const s = parseFloat(speaking);

    // Validate inputs
    if (
      isNaN(l) || isNaN(r) || isNaN(w) || isNaN(s) ||
      l < 0 || l > 9 || r < 0 || r > 9 || w < 0 || w > 9 || s < 0 || s > 9
    ) {
      console.log('Invalid input values');
      setResult(null);
      return;
    }

    // Calculate average
    const average = (l + r + w + s) / 4;
    console.log('Average:', average);

    // Round to nearest 0.5
    const rounded = Math.round(average * 2) / 2;
    console.log('Rounded band score:', rounded);

    setResult(rounded);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const resetForm = () => {
    console.log('Resetting IELTS form...');
    setListening('');
    setReading('');
    setWriting('');
    setSpeaking('');
    setResult(null);
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
            IELTS Band Score Calculator
          </Text>
          <Text style={[styles.subtitle, { color: theme.dark ? '#98989D' : '#666' }]}>
            Enter scores from 0 to 9 for each section
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
              <Text style={[styles.label, { color: theme.colors.text }]}>Listening</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.colors.text,
                    backgroundColor: theme.dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    borderColor: theme.dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                  },
                ]}
                value={listening}
                onChangeText={setListening}
                keyboardType="decimal-pad"
                placeholder="0.0 - 9.0"
                placeholderTextColor={theme.dark ? '#666' : '#999'}
                maxLength={3}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Reading</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.colors.text,
                    backgroundColor: theme.dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    borderColor: theme.dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                  },
                ]}
                value={reading}
                onChangeText={setReading}
                keyboardType="decimal-pad"
                placeholder="0.0 - 9.0"
                placeholderTextColor={theme.dark ? '#666' : '#999'}
                maxLength={3}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Writing</Text>
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
                keyboardType="decimal-pad"
                placeholder="0.0 - 9.0"
                placeholderTextColor={theme.dark ? '#666' : '#999'}
                maxLength={3}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Speaking</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.colors.text,
                    backgroundColor: theme.dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    borderColor: theme.dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                  },
                ]}
                value={speaking}
                onChangeText={setSpeaking}
                keyboardType="decimal-pad"
                placeholder="0.0 - 9.0"
                placeholderTextColor={theme.dark ? '#666' : '#999'}
                maxLength={3}
              />
            </View>
          </GlassView>

          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.calculateButton]}
              onPress={calculateBandScore}
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

          {result !== null && (
            <GlassView
              style={[
                styles.resultCard,
                Platform.OS !== 'ios' && {
                  backgroundColor: theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                },
              ]}
              glassEffectStyle="regular"
            >
              <Text style={[styles.resultLabel, { color: theme.dark ? '#98989D' : '#666' }]}>
                Overall Band Score
              </Text>
              <Text style={[styles.resultValue, { color: '#34C759' }]}>{result.toFixed(1)}</Text>
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
  resultLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});
