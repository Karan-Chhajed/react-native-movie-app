import { MediaType } from "@/interfaces";
import { FC } from "react";
import { View, Image, Text, TouchableOpacity, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";


interface ExpandableCardProps {
    name: string;
    overview: string;
    posterUrl: string;
    mediaType: string
    vote_average: number
}

const ExpandableCard: FC<ExpandableCardProps> = ({ name, overview, posterUrl, mediaType, vote_average }) => {

    const expanded = useSharedValue(false)

    const toggleCard = () => {
        expanded.value = !expanded.value
    }

    const animateCard = useAnimatedStyle(() => {
        return {
            height: withSpring(expanded.value ? 200 : 100),
            padding: withSpring(expanded.value ? 16 : 8)
        }
    })

    return (
        <Pressable onPress={toggleCard}>
        <View className='w-full flex flex-col'>
            <Image source={{ uri: posterUrl }} />
            <View className='flex flex-row'>
                <Text className='font-semibold text-sm'>{name}</Text>
                <Text className='font-normal text-sm'>{overview}</Text>
            </View>
        </View>
        <View className="w-full flex flex-col">
            <Text>{mediaType}</Text>
            <View className="flex-row items-center justify-start gap-x-1">
                <Text className="text-sm">{vote_average ? Math.round(vote_average / 2) : 'N/A'}</Text>
                <Image source={require('../assets/images/star.png')} className="size-4"/>
            </View>
        </View>
        </Pressable>
    )
}

export default ExpandableCard