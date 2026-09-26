import InfoModal from '@/components/InfoModal';
import { useOrientation } from '@/hooks/useDevice';
import { Tabs } from 'expo-router';
import { useState } from 'react';
import { ColorValue, Image, ImageSourcePropType, Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const tabIcon = (source: ImageSourcePropType) => {
  const TabIcon = ({ color }: { color: ColorValue }) => (
    <Image source={source} className="w-8 h-8" tintColor={color} />
  );
  return TabIcon;
};

export default function TabLayout() {
  const [showInfo, setShowInfo] = useState(false);
  const orientation = useOrientation();
  const insets = useSafeAreaInsets();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            // Match the screens' bg-black. A transparent bar shows the navigator's
            // default (light) theme behind it, which renders white.
            backgroundColor: '#000000',
            borderTopWidth: 0,
            height: orientation === 'portrait' ? 65 : 55,
            paddingBottom: 1,
            alignContent: 'flex-end'
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'red',
          tabBarIconStyle: {
            marginTop: 0
          }
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: tabIcon(require('../../assets/images/home.png')),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: tabIcon(require('../../assets/images/search.png')),
          }}
        />
        <Tabs.Screen
          name="watchlist"
          options={{
            tabBarLabel: 'Saved',
            tabBarIcon: tabIcon(require('../../assets/images/saved.png')),
          }}
        />
        <Tabs.Screen
          name="review"
          options={{
            tabBarLabel: 'Review',
            tabBarIcon: tabIcon(require('../../assets/images/profile.png')),
          }}
        />
      </Tabs>
      {/* Rendered over the tabs so it is reachable from every screen. */}
      <Pressable
        className="absolute z-10 h-6 w-6 border border-white rounded-full items-center justify-center"
        // Keeps the button clear of the status bar, notch and rounded corners in either orientation.
        style={{ top: Math.max(insets.top, 12) + 4, right: insets.right + 12 }}
        hitSlop={10}
        onPress={() => setShowInfo(true)}
        accessibilityRole="button"
        accessibilityLabel="About this app"
      >
        <Text className="text-white text-xs font-bold">i</Text>
      </Pressable>
      <InfoModal visible={showInfo} onClose={() => setShowInfo(false)} />
    </>
  );
}
