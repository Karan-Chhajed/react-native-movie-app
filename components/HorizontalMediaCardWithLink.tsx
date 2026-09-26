import Artwork from '@/components/Artwork';
import { usePrefetchMedia } from '@/hooks/usePrefetchMedia';
import { MediaKind } from '@/interfaces';
import { MEDIA_KIND_LABEL, mediaHref, tmdbImageUrl } from '@/utils/media';
import { Link } from 'expo-router';
import { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface HorizontalMediaCardWithLinkProps {
  id: string | number;
  name: string;
  type: MediaKind;
  poster_path: string;
  overview?: string;
}

const HorizontalMediaCardWithLink: FC<HorizontalMediaCardWithLinkProps> = ({
  id,
  name,
  type,
  poster_path,
  overview,
}) => {
  const prefetchMedia = usePrefetchMedia();
  const kindLabel = MEDIA_KIND_LABEL[type];

  return (
    // Link's asChild requires the pressable to be its direct child.
    <Link href={mediaHref(type, id)} asChild>
      <TouchableOpacity
        className="w-full p-4"
        onPressIn={() => prefetchMedia(type, id)}
        accessibilityRole="link"
        accessibilityLabel={`${name}, ${kindLabel}`}
      >
        <View className="flex flex-row items-start gap-6">
          <Artwork uri={tmdbImageUrl(poster_path, 'w342')} className="w-24 h-40 rounded-lg" />
          <View className="flex-1 flex-col gap-y-2">
            <Text className="text-base font-bold text-white" numberOfLines={2}>
              {name}
            </Text>
            <Text className="text-sm text-white" numberOfLines={6}>
              {overview}
            </Text>
          </View>
        </View>
        <View className="flex flex-row justify-between items-center my-2">
          <Text className="text-xs text-gray-400 font-medium">{kindLabel}</Text>
          <Text className="text-sm font-light text-white">Tap to know more...</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default HorizontalMediaCardWithLink;
