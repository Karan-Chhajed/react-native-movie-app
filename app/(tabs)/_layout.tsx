import InfoModal from '@/components/InfoModal';
import { useOrientation } from '@/hooks/useDevice';
import { Tabs } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, Text } from 'react-native';

export default function _Layout() {
  const [showInfo, setShowInfo] = useState(false);
  //I tried redering modal outside, hence state was required. Discussion here is possible, although expo lint will throw an error here

  const orientation = useOrientation()

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            height: orientation === 'potrait' ? 65 : 55,
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
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, color }) => (
              <Image
                source={require('../../assets/images/home.png')}
                className="w-8 h-8"
                style={{ tintColor: color }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            headerShown: false,
            tabBarLabel: 'Search',
            tabBarIcon: ({ focused, color }) => (
              <Image
                source={require('../../assets/images/search.png')}
                className="w-8 h-8"
                tintColor={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="watchlist"
          options={{
            headerShown: false,
            tabBarLabel: 'Saved',
            tabBarIcon: ({ focused, color }) => (
              <Image
                source={require('../../assets/images/saved.png')}
                className="w-8 h-8"
                tintColor={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="review"
          options={{
            headerShown: false,
            tabBarLabel: 'Review',
            tabBarIcon: ({ focused, color }) => (
              <Image
                source={require('../../assets/images/profile.png')}
                className="w-8 h-8"
                tintColor={color}
              />
            ),
          }}
        />
      </Tabs>
      {/*While this can be done in header as well, using state.*/}
      <Pressable
        className={`absolute ${orientation === 'potrait' ? 'top-10 right-3' : 'top-4 right-2'} z-10 h-6 w-6 mt-1 border border-white rounded-full items-center justify-center`}
        onPress={() => setShowInfo(true)}
      >
        <Text className="text-white text-xs font-bold">i</Text>
      </Pressable>
      <InfoModal visible={showInfo} onClose={() => setShowInfo(false)} />
    </>
  );
}
