import HorizontalList from '@/components/HorizontalList';
import { useOrientation } from '@/hooks/useDevice';
import { usePopularMovies, useTrendingMovies } from '@/hooks/useMovies';
import { useTrendingTvSeries, useTvSeries } from '@/hooks/useTv';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  } = useTrendingMovies('day');

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

  const orientation = useOrientation()

  return (
    <SafeAreaView className={`flex-1 items-center justify-start h-full bg-black`}>
      {orientation === 'potrait' ? 
      
      <Image
        source={require('../../assets/images/cinema.png')}
        className="w-20 h-20 mb-6"
        resizeMode="contain"
      /> :
        <View className='flex flex-row w-full justify-center items-center gap-x-6 mt-0'>
            <Image
        source={require('../../assets/images/cinema.png')}
        className="w-12 h-12 mb-4"
        resizeMode="contain"
      />
       <Text className='text-lg font-bold text-white'>Movie Pal</Text>
        </View>
      }

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
    </SafeAreaView>
    // ScrollView is good for static, Flatlist is virtualized. I know its bad practice to render, but I wanted to demonstrate that while its possible
    // it comes with a downside, you lose the virtualization ability of flatlist. On prod, when I have limited elements, Scrollview is the way to go
  );
}
