import { Stack } from "expo-router";
import "./globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: "transparent", paddingTop: 50 },
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
