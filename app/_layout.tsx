import { Stack } from "expo-router";
import "./globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { View } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />

          <Stack.Screen name="tv/[id]" options={{ headerShown: false }} />
        </Stack>
        <Toast />
      </View>
    </QueryClientProvider>
  );
}
