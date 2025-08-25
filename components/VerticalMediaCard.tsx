import { FC } from 'react';
import { Image, Text, View } from 'react-native';

interface VerticalMediaCardProps {
  title: string;
  release_date?: string;
  overview?: string;
  poster_path?: string;
  vote_average?: number;
  type: string;
}

const VerticalMediaCard: FC<VerticalMediaCardProps> = ({
  title,
  release_date,
  poster_path,
  vote_average,
  type,
}) => {
  return (
    <>
      <Image
        source={{
          uri: poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : 'https://via.placeholder.com/150',
        }}
        className="w-full h-40 rounded-lg mb-2"
        resizeMode="cover"
      />
      <Text className="text-sm font-semibold text-white" numberOfLines={1}>
        {title}
      </Text>
      <View className="flex-row items-center justify-start gap-x-1">
        <Text className="text-sm text-white">
          {vote_average ? Math.round(vote_average / 2) : 'N/A'}
        </Text>
        <Image source={require('../assets/images/star.png')} className="size-4" />
      </View>
      <View className="flex-row flex items-center justify-between mt-1">
        {release_date && (
          <Text className="text-xs text-gray-400 font-medium">{release_date.split('-')[0]}</Text>
        )}
        <Text className="text-xs text-gray-400 font-medium">{type}</Text>
      </View>
    </>
  );
};

export default VerticalMediaCard;
