import { Stack, Tabs } from "expo-router";
import { Image } from "react-native";

export default function _Layout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <Image source={require('../../assets/images/home.png')}
                            className="w-8 h-8" />
                    )
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    headerShown: false,
                    tabBarLabel: "Search",
                    tabBarIcon: ({ focused }) => (
                        <Image source={require('../../assets/images/search.png')}
                            className="w-8 h-8" />
                    )
                }} />

            <Tabs.Screen
                name="saved"
                options={{
                    headerShown: false, tabBarLabel: "Saved", tabBarIcon: ({ focused }) => (
                        <Image source={require('../../assets/images/saved.png')}
                            className="w-8 h-8" />
                    )
                }} />

            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false, tabBarLabel: "Profile", tabBarIcon: ({ focused }) => (
                        <Image source={require('../../assets/images/profile.png')}
                            className="w-8 h-8" />
                    )
                }} />
        </Tabs>
    )
}