import { Link } from "expo-router";
import { FC } from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
import '../assets/images/star.png';

interface MovieCardProps {
    id: number | string;
    title: string;
    release_date?: string;
    overview?: string;
    poster_path?: string;
    vote_average?: number;
    type: string
}

export const MovieCard:FC<MovieCardProps> = ({id, title, release_date, vote_average, overview, poster_path, type  }) => {
  return (
    <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity className="w-36 h-56 flex-1 my-6">
            <Image 
                source={{ uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://via.placeholder.com/150' }}
                className="w-full h-40 rounded-lg mb-2"
                resizeMode="cover"
            />
            <Text className="text-sm font-semibold text-blue-500" numberOfLines={1}>{title}</Text>
            <View className="flex-row items-center justify-start gap-x-1">
                <Text className="text-sm">{vote_average ? Math.round(vote_average / 2) : 'N/A'}</Text>
                <Image source={require('../assets/images/star.png')} className="size-4"/>
            </View>
            <View className="flex-row flex items-center justify-between mt-1">
                {release_date && <Text className="text-xs text-gray-400 font-medium">{release_date.split('-')[0]}</Text>}
                <Text className="text-xs text-gray-400 font-medium">{type}</Text>
            </View>
        </TouchableOpacity>
    </Link>
  );
}