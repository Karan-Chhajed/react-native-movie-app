import { useRemoveFromWatchlist } from '@/hooks/useMutations';
import { Link } from 'expo-router';
import React, { FC } from 'react';
import { View, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';

interface SavedMovieCardProps {
  name: string;
  mediaType: string;
  vote_average: number;
  genres: string;
  posterUrl: string;
  id: string | number;
}

const SavedMovieCard: FC<SavedMovieCardProps> = ({
  name,
  mediaType,
  vote_average,
  genres,
  posterUrl,
  id,
}) => {
  const genreArray = genres.split(', ').map((genre) => genre.trim());

  const { mutate: removeFromWatchlist } = useRemoveFromWatchlist();

  return (
    <Link href={mediaType === 'Movie' ? `/movies/${id}` : `/tv/${id}`} asChild>
      <TouchableOpacity className="w-full">
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/w500${posterUrl}` }}
          className="w-full border border-gray-400 gap-6 my-2 p-2 bg-slate-400 rounded-2xl h-44"
          imageStyle={{ borderRadius: 12 }}
        >
          <View className="flex-1 justify-between">
            <View className="flex flex-row items-center justify-between">
              <Text className="font-semibold text-xl bg-slate-300 px-1 rounded-lg">
                {name} <Text className="font-light text-base">({mediaType})</Text>{' '}
              </Text>
              <View className="flex flex-row items-center justify-center gap-x-1 bg-slate-300 rounded-xl p-0.5">
                <Text className="p-1">{Math.round(vote_average / 2)}</Text>
                <Image source={require('../assets/images/star.png')} className="size-4" />
              </View>
            </View>
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row flex-wrap gap-2">
                {genreArray.map((item, index) => (
                  <Text key={index} className="text-sm bg-slate-300 py-1 px-2 rounded-xl">
                    {item}
                  </Text>
                ))}
              </View>
              <TouchableOpacity
                onPress={() => {
                  removeFromWatchlist(id as string);
                }}
                className="h-6 w-6 bg-red-600 rounded-full"
              >
                <Text className="text-white text-center">-</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Link>
  );
};

export default SavedMovieCard;
