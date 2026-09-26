import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationBar } from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import './globals.css';

const queryClient = new QueryClient();

export default function RootLayout() {
  useEffect(() => {
    // Edge-to-edge is mandatory since SDK 55, so the bar is already transparent;
    // the behavior/background setters were removed in SDK 56.
    if (Platform.OS === 'android') {
      NavigationBar.setHidden(true);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            // A screen that is still loading must slide in over black, not the navigator's
            // default (light) theme.
            contentStyle: { backgroundColor: '#000000' },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />

          <Stack.Screen name="tv/[id]" options={{ headerShown: false }} />
        </Stack>
        <Toast />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
