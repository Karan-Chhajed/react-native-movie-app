import { Stack } from "expo-router";
import './globals.css';
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

export default function RootLayout() {

  const queryClient = new QueryClient();

  return (
  <QueryClientProvider client={queryClient}>
  <Stack>
    <Stack.Screen
      name="(tabs)"
      options={{ headerShown: false }}
    />

    <Stack.Screen 
      name="movies/[id]"
      options={{ headerShown: false }}
    />
  </Stack>
  </QueryClientProvider>
  )
}
