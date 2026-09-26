import Artwork from '@/components/Artwork';
import { ProviderData } from '@/interfaces';
import { tmdbImageUrl } from '@/utils/media';
import { FC } from 'react';
import { View, Text } from 'react-native';

interface AvailablePlatformsProps {
  title: string;
  platformData: ProviderData[];
}

export const AvailablePlatforms: FC<AvailablePlatformsProps> = ({ title, platformData }) => {
  const providerNames = platformData.map((provider) => provider.provider_name).join(', ');

  return (
    // Logos carry no text, so the row is announced as one element listing the providers.
    <View
      className="flex flex-row flex-wrap my-2 items-center justify-start w-full gap-x-3 gap-y-2"
      accessible
      accessibilityLabel={`${title}: ${providerNames}`}
    >
      <Text className="text-sm font-medium text-white">{title}</Text>
      {platformData.map((provider) => (
        <Artwork
          key={provider.provider_id}
          uri={tmdbImageUrl(provider.logo_path, 'w92')}
          className="w-7 h-7 rounded-full"
          resizeMode="contain"
        />
      ))}
    </View>
  );
};
