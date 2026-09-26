import { Genres } from '@/interfaces';
import { FC } from 'react';
import { View, Text } from 'react-native';

interface GenreProps {
  genres: Genres[];
}

export const GenreComponent: FC<GenreProps> = ({ genres }) => {
  if (genres.length === 0) return null;

  return (
    <View className="w-full flex flex-row flex-wrap gap-2 items-center">
      <Text className="text-sm font-semibold text-white">Genres: </Text>
      {genres.map((genre) => (
        <Text key={genre.id} className="text-sm bg-slate-300 py-1 px-2 rounded-xl">
          {genre.name}
        </Text>
      ))}
    </View>
  );
};
