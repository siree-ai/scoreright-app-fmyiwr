
import { Redirect } from 'expo-router';
import React from 'react';

export default function Index() {
  // Redirect to the IELTS calculator tab as the default screen
  return <Redirect href="/(tabs)/ielts" />;
}
