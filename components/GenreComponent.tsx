import { FC } from 'react';
import { View, Text } from 'react-native'

interface GenreProps {
    genres: {
        id: number;
        name: string;
    }[]
}

export const GenreComponent: FC<GenreProps> = ({ genres }) => (
    <View className="w-full flex flex-row flex-wrap gap-2 items-center">
        <Text className="text-sm font-semibold">Genres: </Text>
        {genres.map((item, index) => (
            <Text key={index} className="text-sm bg-slate-300 py-1 px-2 rounded-xl">{item.name}</Text>
        ))}
    </View>
)