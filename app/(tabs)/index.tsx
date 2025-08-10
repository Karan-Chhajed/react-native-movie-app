import { Text, View, Image, ActivityIndicator, ScrollView } from "react-native";
import { usePopularMovies, usetrendingMovies } from "@/hooks/useMovies";
import React from "react";
import HorizontalList from "@/components/HorizontalList";
import { useTrendingTvSeries, useTvSeries } from "@/hooks/useTv";


export default function Index() {

  const { data: movieData, isLoading: isPopularMoviesLoading, isError: isPopularMoviesError, error: popularMoviesDataError } = usePopularMovies('')

  const { data: trendingMoviesData, isLoading: isTrendingMovieDataLoading, isError: isTrendingMovieDataError, error: trendingMovieDataError } = usetrendingMovies('day');

  const { data: tvData, isLoading: isLoadingTv, isError: isTVError, error: tvErrorData } = useTvSeries('')

  const { data: trendingTvData, isLoading: isLoadingTvData, isError: isTrendingTvError, error: trendingTvError } = useTrendingTvSeries('day')

  return (
    <View className="flex-1 items-center justify-start bg-white pt-20 px-4">
      <Image
        source={require("../../assets/images/movie-picker.png")}
        className="w-20 h-20 mb-6"
        resizeMode="contain"
      />

      {(isPopularMoviesError) && <Text className="text-red-500">{popularMoviesDataError?.message}</Text>}
      {(isTrendingMovieDataError) && <Text className="text-red-500">{trendingMovieDataError?.message}</Text>}
      {(isTVError) && <Text className="text-red-500">{tvErrorData?.message}</Text>}
      {(isTrendingTvError) && <Text className="text-red-500">{trendingTvError?.message}</Text>}
      {(isPopularMoviesLoading || isLoadingTv || isTrendingMovieDataLoading || isLoadingTvData) ? <ActivityIndicator size="large" color="#3b82f6" /> :
        <ScrollView>
          <HorizontalList mediaData={movieData} listTitle="Popular Movies" type="MOVIE" />
          <HorizontalList mediaData={trendingMoviesData} listTitle="Trending Movies" type="MOVIE" />
          <HorizontalList mediaData={tvData} listTitle="Popular TV Shows" type="TV" />
          <HorizontalList mediaData={trendingTvData} listTitle="Trending TV Series" type="TV" />
        </ScrollView>
      }
    </View>

  );
}
