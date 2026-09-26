import Artwork from '@/components/Artwork';
import { GenreComponent } from '@/components/GenreComponent';
import WatchlistButton from '@/components/WatchlistButton';
import { WhereToWatch } from '@/components/WhereToWatch';
import { useTvById, useWatchProviders } from '@/hooks/useTv';
import { tmdbImageUrl } from '@/utils/media';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const TvDetails = () => {
  const { id } = useLocalSearchParams();

  const {
    data: tvData,
    isLoading: isLoadingTvData,
    isError: isErrorTv,
    error: tvErrorData,
  } = useTvById(id as string);

  const {
    data: watchData,
    isLoading: isLoadingWatch,
    isError: isErrorWatch,
    error: watchDataError,
  } = useWatchProviders(id as string, 'tv');

  // Fade the page in only if it had to wait for data; cached pages are ready as the screen slides in.
  const [fadeInOnLoad] = useState(() => isLoadingTvData || isLoadingWatch);

  if (isLoadingTvData || isLoadingWatch) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator color="#3b82f6" size="large" />
      </View>
    );
  }

  if (isErrorTv || isErrorWatch || !tvData || !watchData) {
    const message =
      [tvErrorData?.message, watchDataError?.message].filter(Boolean).join(' | ') ||
      'Something went wrong!';

    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-red-500">{message}</Text>
      </View>
    );
  }

  const releaseYear = tvData.first_air_date?.split('-')[0];
  const networkLogoUrl = tmdbImageUrl(tvData.networks?.[0]?.logo_path, 'w92');

  return (
    <Animated.View
      style={{ flex: 1, backgroundColor: '#000000' }}
      entering={fadeInOnLoad ? FadeIn.duration(250) : undefined}
    >
    <SafeAreaView className="bg-black flex-1">
      <View className=" items-center justify-center ">
        <ScrollView
          className="w-full mb-[4.5rem] -mt-10"
          contentOffset={{ x: 0, y: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="items-center  mt-10 px-4">
            <View className="w-screen rounded-lg">
              <Artwork
                uri={tmdbImageUrl(tvData.poster_path, 'w500')}
                className="w-full rounded-lg mb-2 aspect-[2/3]"
              />
            </View>

            <View className="mt-2 flex-row items-center justify-between w-full gap-x-2">
              <Text className="shrink text-lg font-bold text-white" accessibilityRole="header">
                {tvData.name}
              </Text>
              <WatchlistButton
                media={{
                  id: tvData.id,
                  title: tvData.name,
                  overview: tvData.overview,
                  media_type: 'tv',
                  vote_average: tvData.vote_average,
                  genres: tvData.genres.map((genre) => genre.name).join(', '),
                  posterUrl: tvData.poster_path,
                }}
              />
            </View>
            <View className="mt-4">
              <View className="flex-row items-center justify-between w-full">
                <Text className="text-base font-semibold text-white">Overview</Text>
                {releaseYear ? (
                  <Text className="text-sm text-gray-400">{`Release Date: ${releaseYear}`}</Text>
                ) : null}
              </View>
              <Text className="text-sm text-gray-400 mt-2">{tvData.overview}</Text>
            </View>

            <WhereToWatch watchData={watchData} />

            {networkLogoUrl ? (
              <View
                className="flex flex-row w-full py-2 gap-x-2 items-center justify-start"
                accessible
                accessibilityLabel={`Original network: ${tvData.networks[0].name}`}
              >
                <Text className="text-sm font-medium text-white">Original Network:</Text>
                <Image source={{ uri: networkLogoUrl }} className="w-10 h-10" resizeMode="contain" />
              </View>
            ) : null}
            <GenreComponent genres={tvData.genres} />
          </View>
        </ScrollView>
        <TouchableOpacity
          className={`absolute flex-row items-center justify-center bg-red-150 p-3 w-4/5 rounded-lg ${Platform.OS === 'ios' ? 'bottom-0': 'bottom-4'}`}
          onPress={() => router.back()}
          accessibilityRole="button"
        >
          <Text className="text-white text-base font-semibold">Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </Animated.View>
  );
};

export default TvDetails;
