import { Stack, Tabs } from "expo-router";
import { Image } from "react-native";

export default function _Layout() {
    return (
        <Tabs screenOptions={{
            tabBarStyle: {
                backgroundColor: 'black',
                borderTopWidth: 0
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'red'
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused, color }) => (
                        <Image source={require('../../assets/images/home.png')}
                            className="w-8 h-8"
                            style={{tintColor: color}} />
                    )
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    headerShown: false,
                    tabBarLabel: "Search",
                    tabBarIcon: ({ focused, color }) => (
                        <Image source={require('../../assets/images/search.png')}
                            className="w-8 h-8" tintColor={color}/>
                    )
                }} />

            <Tabs.Screen
                name="watchlist"
                options={{
                    headerShown: false, tabBarLabel: "Saved", tabBarIcon: ({ focused, color }) => (
                        <Image source={require('../../assets/images/saved.png')}
                            className="w-8 h-8" tintColor={color}/>
                    )
                }} />

            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false, tabBarLabel: "Profile", tabBarIcon: ({ focused, color }) => (
                        <Image source={require('../../assets/images/profile.png')}
                            className="w-8 h-8" tintColor={color}/>
                    )
                }} />
        </Tabs>
    )
}