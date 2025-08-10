import { FC } from "react";
import { View, Image, Text, } from "react-native";

interface HorizontalMediaCardProps {
    name: string;
    vote_average?: number;
    overview?: string;
    poster_path: string;
    type?: string
}

const HorizontalMediaCard: FC<HorizontalMediaCardProps> = ({ name, vote_average, overview, poster_path, type }) => {
    return (
        <>
            <View className="flex flex-row items-start gap-6">
                <View className="flex flex-col gap-y-2">
                    <Image source={{ uri: poster_path ?? 'https://via.placeholder.com/150' }} className="w-24 h-40 rounded-lg" />
                </View>

                <View className="flex-1">
                    <Text className="text-base font-bold">
                        {name}
                    </Text>
                    <Text className="text-sm" numberOfLines={6} >
                        {overview}
                    </Text>

                </View>
            </View>
            <View className="flex flex-row justify-between items-center my-2">
                <Text>{type}</Text>
                <Text className="text-sm font-light">Tap to know more...</Text>
            </View>
        </>
    )
}

export default HorizontalMediaCard