import { useRemoveFromWatchlist } from '@/hooks/useMutations';
import { usePrefetchMedia } from '@/hooks/usePrefetchMedia';
import { MEDIA_KIND_LABEL, mediaHref, tmdbImageUrl, toFiveStarRating, toMediaKind } from '@/utils/media';
import { Link } from 'expo-router';
import React, { FC } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';

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
  const { mutate: removeFromWatchlist } = useRemoveFromWatchlist();
  const prefetchMedia = usePrefetchMedia();

  const kind = toMediaKind(mediaType);
  const kindLabel = MEDIA_KIND_LABEL[kind];
  const rating = toFiveStarRating(vote_average);
  const poster = tmdbImageUrl(posterUrl, 'w500');
  const genreList = genres
    .split(',')
    .map((genre) => genre.trim())
    .filter(Boolean);

  const remove = () => removeFromWatchlist(id as string);

  return (
    <Link href={mediaHref(kind, id)} asChild>
      <TouchableOpacity
        className="w-full"
        onPressIn={() => prefetchMedia(kind, id)}
        accessibilityRole="link"
        accessibilityLabel={[name, kindLabel, rating && `rated ${rating} out of 5`]
          .filter(Boolean)
          .join(', ')}
        // Screen readers can't reach a button nested inside a link, so removal is exposed as an action.
        accessibilityActions={[{ name: 'remove', label: 'Remove from watchlist' }]}
        onAccessibilityAction={(event) => {
          if (event.nativeEvent.actionName === 'remove') remove();
        }}
      >
        <ImageBackground
          source={poster ? { uri: poster } : undefined}
          className="w-full border border-gray-400 gap-6 my-2 p-2 bg-slate-400 rounded-2xl h-44"
          imageStyle={{ borderRadius: 12 }}
          resizeMode="cover"
        >
          <View className="flex-1 justify-between">
            <View className="flex flex-row items-start justify-between gap-x-2">
              <Text
                className="shrink font-semibold text-xl bg-slate-300 px-1 rounded-lg"
                numberOfLines={2}
              >
                {name} <Text className="font-light text-base">({kindLabel})</Text>
              </Text>
              <View className="flex flex-row items-center justify-center gap-x-1 bg-slate-300 rounded-xl p-0.5">
                <Text className="p-1">{rating ?? 'N/A'}</Text>
                <Image source={require('../assets/images/star.png')} className="size-4" />
              </View>
            </View>
            <View className="flex flex-row justify-between items-end gap-x-2">
              <View className="shrink flex flex-row flex-wrap gap-2">
                {genreList.map((genre) => (
                  <Text key={genre} className="text-sm bg-slate-300 py-1 px-2 rounded-xl">
                    {genre}
                  </Text>
                ))}
              </View>
              <TouchableOpacity
                onPress={remove}
                hitSlop={10}
                className="h-6 w-6 bg-red-600 rounded-full items-center justify-center"
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
              >
                <Text className="text-white">-</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Link>
  );
};

export default SavedMovieCard;
