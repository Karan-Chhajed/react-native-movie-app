import { WatchData } from '@/interfaces';
import { FC } from 'react';
import { Text, View } from 'react-native';
import { AvailablePlatforms } from './AvailablePlatforms';

interface WatchDataProps {
  watchData: WatchData;
}

export const WhereToWatch: FC<WatchDataProps> = ({ watchData }) => {
  if (!watchData.IN) {
    return (
      <View className="flex flex-row my-2 items-center justify-start w-full gap-x-3">
        <Text className="text-sm font-medium text-white">Where To Watch:</Text>
        <Text className="text-sm font-light text-white">Not available in your country</Text>
      </View>
    );
  }

  const platformSections = [
    { key: 'rent', title: 'Where to Rent' },
    { key: 'buy', title: 'Where to Buy' },
    { key: 'flatrate', title: 'Where to Stream' },
  ] as const;

  return (
    <>
      {platformSections.map(({ key, title }) =>
        watchData.IN[key] ? (
          <AvailablePlatforms key={key} title={title} platformData={watchData.IN[key]!} />
        ) : null,
      )}
    </>
  );
};
