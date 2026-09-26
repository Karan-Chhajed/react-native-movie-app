import Artwork from '@/components/Artwork';
import { usePrefetchMedia } from '@/hooks/usePrefetchMedia';
import { MediaKind } from '@/interfaces';
import { MEDIA_KIND_LABEL, mediaHref, tmdbImageUrl, toFiveStarRating } from '@/utils/media';
import { Link } from 'expo-router';
import { FC } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface VerticalMediaCardWithLinkProps {
  id: number | string;
  title: string;
  type: MediaKind;
  release_date?: string;
  poster_path?: string;
  vote_average?: number;
}

const VerticalMediaCardWithLink: FC<VerticalMediaCardWithLinkProps> = ({
  id,
  title,
  type,
  release_date,
  poster_path,
  vote_average,
}) => {
  const prefetchMedia = usePrefetchMedia();
  const year = release_date?.split('-')[0];
  const rating = toFiveStarRating(vote_average);
  const kindLabel = MEDIA_KIND_LABEL[type];
  const accessibilityLabel = [title, kindLabel, year, rating && `rated ${rating} out of 5`]
    .filter(Boolean)
    .join(', ');

  return (
    // Link's asChild requires the pressable to be its direct child.
    <Link href={mediaHref(type, id)} asChild>
      <TouchableOpacity
        className="w-28 h-56 flex-1 my-6 py-4"
        onPressIn={() => prefetchMedia(type, id)}
        accessibilityRole="link"
        accessibilityLabel={accessibilityLabel}
      >
        <Artwork uri={tmdbImageUrl(poster_path, 'w342')} className="w-full h-40 rounded-lg mb-2" />
        <Text className="text-sm font-semibold text-white" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
          <Text className="text-sm text-white">{rating ?? 'N/A'}</Text>
          <Image source={require('../assets/images/star.png')} className="size-4" />
        </View>
        <View className="flex-row items-center justify-between mt-1">
          {year ? <Text className="text-xs text-gray-400 font-medium">{year}</Text> : null}
          <Text className="text-xs text-gray-400 font-medium">{kindLabel}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default VerticalMediaCardWithLink;
