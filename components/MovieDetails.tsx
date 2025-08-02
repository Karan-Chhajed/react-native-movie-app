import React, { FC } from "react";
import { View, Text, Image } from "react-native";

interface MovieDetailsProps {
    name: string;
    overview: string;
    poster_path?: string;
    release_date?: string;
    runtime?: number;
    vote_average?: number;
    }

const MovieDetailsComponent:FC<MovieDetailsProps> = ({name, overview, poster_path, release_date, runtime, vote_average}) => {
  
  return (
    <View className="items-center bg-white mt-10">
        <View className="flex w-full items-center justify-center border border-gray-200 rounded-lg">
          <Image 
                source={{ uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://via.placeholder.com/150' }}
                className="w-full h-1/2 rounded-lg mb-2"
                resizeMode="contain"
            />
        </View>

        <View className="mt-2 flex-row items-center justify-between">
            <View className="flex-col items-start">
              <Text className="text-lg font-bold">
                {name}
              </Text>
              <Text className="text-sm text-gray-400">{release_date ?? 'N/A'}</Text>
            </View>
            <View className="flex-col items-center">
              <Text>{runtime ?? 'N/A'}</Text>
              <View className="flex-row items-center justify-center gap-x-1">
                <Image source={require('../assets/images/star.png')} className="size-4"/>
                <Text className="text-sm">{vote_average ? Math.round(vote_average / 2) : 'N/A'}</Text>
              </View>
            </View>
        </View>
        <View className="mt-4">
          <Text className="text-base font-semibold">Overview</Text>
          <Text className="text-sm text-gray-600 mt-2">{overview}</Text>
        </View>

    </View>
)   
}

export default MovieDetailsComponent;