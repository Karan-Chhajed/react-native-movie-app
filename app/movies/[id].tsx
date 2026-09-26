import Artwork from '@/components/Artwork';
import { GenreComponent } from '@/components/GenreComponent';
import WatchlistButton from '@/components/WatchlistButton';
import { WhereToWatch } from '@/components/WhereToWatch';
import { useOrientation } from '@/hooks/useDevice';
import { useMovieDetails } from '@/hooks/useMovies';
import { useWatchProviders } from '@/hooks/useTv';
import { tmdbImageUrl, toFiveStarRating } from '@/utils/media';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movieData,
    isLoading: isLoadingMovieData,
    isError: isErrorMovie,
    error: isMovieErrorData,
  } = useMovieDetails(id as string);

  const {
    data: watchData,
    isLoading: isLoadingWatchData,
    isError: isErrorWatch,
    error: isWatchErrorData,
  } = useWatchProviders(id as string, 'movie');

  const orientation = useOrientation();

  // Fade the page in only if it had to wait for data; cached pages are ready as the screen slides in.
  const [fadeInOnLoad] = useState(() => isLoadingMovieData || isLoadingWatchData);

  if (isLoadingMovieData || isLoadingWatchData) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator color="#3b82f6" size="large" />
      </View>
    );
  }

  if (isErrorMovie || isErrorWatch || !watchData || !movieData) {
    const message =
      [isMovieErrorData?.message, isWatchErrorData?.message].filter(Boolean).join(' | ') ||
      'Something went wrong!';
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-red-500">{message}</Text>
      </View>
    );
  }

  const posterUrl = tmdbImageUrl(movieData.poster_path, 'w500');
  const rating = toFiveStarRating(movieData.vote_average);

  return (
    <Animated.View
      style={{ flex: 1, backgroundColor: '#000000' }}
      entering={fadeInOnLoad ? FadeIn.duration(250) : undefined}
    >
    <SafeAreaView className=" flex-1 bg-black">
      <ImageBackground className="items-center justify-center flex-1 portrait:-mt-14 bg-black -bottom-4" source={orientation === 'landscape' && posterUrl ? { uri: posterUrl } : undefined} resizeMode='cover'>
        <ScrollView
          className="w-full mb-[4.5rem]"
          contentOffset={{ x: 0, y: 180 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="items-center  landscape:mt-10 px-4">
            <View className="w-screen rounded-lg landscape:hidden">
              <Artwork uri={posterUrl} className="w-full rounded-lg mb-2 aspect-[2/3]" />
            </View>

            <View className="mt-2 flex-col items-center justify-between w-full">
              <View className="flex-row items-center justify-between w-full">
                <Text className="text-lg font-bold text-white flex-[2]" accessibilityRole="header">
                  {movieData.title}
                </Text>
                <WatchlistButton
                  media={{
                    id: movieData.id,
                    title: movieData.title,
                    posterUrl: movieData.poster_path,
                    overview: movieData.overview,
                    media_type: 'Movie',
                    vote_average: movieData.vote_average,
                    genres: movieData.genres.map((genre) => genre.name).join(', '),
                  }}
                />
              </View>
              <View className="flex-row items-center justify-between w-full py-2">
                <Text className="text-sm text-gray-400 ">Runtime: {movieData.runtime} mins</Text>
                <View
                  className="flex-row items-center justify-center gap-x-1"
                  accessible
                  accessibilityLabel={rating ? `Rated ${rating} out of 5` : 'Not rated'}
                >
                  <Image source={require('../../assets/images/star.png')} className="size-4" />
                  <Text className="text-sm text-white">{rating ? `${rating} / 5` : 'N/A'}</Text>
                </View>
              </View>
            </View>
            <View className="mt-4">
              <Text className="text-base font-semibold text-white">Overview</Text>
              <Text className="text-sm text-gray-400 mt-2">{movieData.overview}</Text>
            </View>
            <WhereToWatch watchData={watchData} />
            <View className="w-full my-2">
              <GenreComponent genres={movieData.genres} />
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          className={`absolute flex-row items-center justify-center bg-red-150 p-3 w-4/5 rounded-lg ${Platform.OS === 'ios' ? 'bottom-2' : 'bottom-8'}`}
          onPress={() => router.back()}
          accessibilityRole="button"
        >
          <Text className="text-white text-base font-semibold">Go Back</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
    </Animated.View>
  );
};

export default MovieDetails;
