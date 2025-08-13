import { Stack } from "expo-router";
import './globals.css';
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {

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

    <Stack.Screen 
      name="tv/[id]"
      options={{ headerShown: false }}
    />
  </Stack>
  </QueryClientProvider>
  )
}
