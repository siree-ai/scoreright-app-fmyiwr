
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { GlassView } from 'expo-glass-effect';

export default function Credits() {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
      edges={['top']}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar,
        ]}
      >
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Credits
        </Text>
        <Text style={[styles.subtitle, { color: theme.dark ? '#98989D' : '#666' }]}>
          About this app
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
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Created By
            </Text>
            <Text style={[styles.creatorName, { color: theme.colors.primary }]}>
              Sy Monyratanak
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              About
            </Text>
            <Text style={[styles.description, { color: theme.dark ? '#98989D' : '#666' }]}>
              This app provides two essential calculators for students:
            </Text>
            <View style={styles.featureList}>
              <Text style={[styles.featureItem, { color: theme.dark ? '#98989D' : '#666' }]}>
                • IELTS Band Score Calculator
              </Text>
              <Text style={[styles.featureItem, { color: theme.dark ? '#98989D' : '#666' }]}>
                • Bac II Grade Calculator
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Version
            </Text>
            <Text style={[styles.versionText, { color: theme.dark ? '#98989D' : '#666' }]}>
              1.0.0
            </Text>
          </View>
        </GlassView>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.dark ? '#666' : '#999' }]}>
            Made with  for students
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
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
    padding: 24,
    marginBottom: 20,
  },
  section: {
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  creatorName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  featureList: {
    marginTop: 8,
  },
  featureItem: {
    fontSize: 15,
    lineHeight: 24,
    marginLeft: 8,
  },
  versionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
    marginVertical: 16,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});
