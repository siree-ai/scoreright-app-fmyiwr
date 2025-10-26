
import React from 'react';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';

export default function TabLayout() {
  // Define the tabs configuration
  const tabs: TabBarItem[] = [
    {
      name: 'ielts',
      route: '/(tabs)/ielts',
      icon: 'doc.text.fill',
      label: 'IELTS',
    },
    {
      name: 'bacii',
      route: '/(tabs)/bacii',
      icon: 'graduationcap.fill',
      label: 'Bac II',
    },
    {
      name: 'credits',
      route: '/(tabs)/credits',
      icon: 'info.circle.fill',
      label: 'Credits',
    },
  ];

  // Use NativeTabs for iOS, custom FloatingTabBar for Android and Web
  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="ielts">
          <Icon sf="doc.text.fill" drawable="ic_document" />
          <Label>IELTS</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="bacii">
          <Icon sf="graduationcap.fill" drawable="ic_school" />
          <Label>Bac II</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="credits">
          <Icon sf="info.circle.fill" drawable="ic_info" />
          <Label>Credits</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  // For Android and Web, use Stack navigation with custom floating tab bar
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen name="ielts" />
        <Stack.Screen name="bacii" />
        <Stack.Screen name="credits" />
      </Stack>
      <FloatingTabBar tabs={tabs} containerWidth={320} />
    </>
  );
}
