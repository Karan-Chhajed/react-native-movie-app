import { Text, View, Image, ActivityIndicator, ScrollView } from 'react-native';
import { usePopularMovies, usetrendingMovies } from '@/hooks/useMovies';
import React from 'react';
import HorizontalList from '@/components/HorizontalList';
import { useTrendingTvSeries, useTvSeries } from '@/hooks/useTv';

export default function Index() {
  const {
    data: movieData,
    isLoading: isPopularMoviesLoading,
    isError: isPopularMoviesError,
    error: popularMoviesDataError,
  } = usePopularMovies('');

  const {
    data: trendingMoviesData,
    isLoading: isTrendingMovieDataLoading,
    isError: isTrendingMovieDataError,
    error: trendingMovieDataError,
  } = usetrendingMovies('day');

  const {
    data: tvData,
    isLoading: isLoadingTv,
    isError: isTVError,
    error: tvErrorData,
  } = useTvSeries('');

  const {
    data: trendingTvData,
    isLoading: isLoadingTvData,
    isError: isTrendingTvError,
    error: trendingTvError,
  } = useTrendingTvSeries('day');

  return (
    <View className="flex-1 items-center justify-start px-4 bg-black">
      <Image
        source={require('../../assets/images/cinema.png')}
        className="w-20 h-20 mb-6"
        resizeMode="contain"
      />

      {isPopularMoviesError && (
        <Text className="text-red-500">{popularMoviesDataError?.message}</Text>
      )}
      {isTrendingMovieDataError && (
        <Text className="text-red-500">{trendingMovieDataError?.message}</Text>
      )}
      {isTVError && <Text className="text-red-500">{tvErrorData?.message}</Text>}
      {isTrendingTvError && <Text className="text-red-500">{trendingTvError?.message}</Text>}
      {isPopularMoviesLoading || isLoadingTv || isTrendingMovieDataLoading || isLoadingTvData ? (
        <ActivityIndicator size="large" color="#FFFFFF" />
      ) : (
        <ScrollView>
          <HorizontalList mediaData={movieData} listTitle="Popular Movies" type="MOVIE" />
          <HorizontalList mediaData={trendingMoviesData} listTitle="Trending Movies" type="MOVIE" />
          <HorizontalList mediaData={tvData} listTitle="Popular TV Shows" type="TV" />
          <HorizontalList mediaData={trendingTvData} listTitle="Trending TV Series" type="TV" />
        </ScrollView>
      )}
    </View>
    // ScrollView is good for static, Flatlist is virtualized. I know its bad practice to render, but I wanted to demonstrate that while its possible
    // it comes with a downside, you lose the virtualization ability of flatlist. On prod, when I have limited elements, Scrollview is the way to go
  );
}
