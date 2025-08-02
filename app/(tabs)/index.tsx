import { Text, View, Image, ScrollView, TextInput, Alert, ActivityIndicator, FlatList } from "react-native";
import { useMovies, usePopularMovies, usetrendingMovies } from "@/hooks/useMovies";
import { MovieCard } from "@/components/MovieCard";
import { Siege, SearchPlatform, allStats, Platform } from "@rainbow6/api";
import { useEffect } from "react";

export default function Index() {

  const { data: movieData, isLoading, isError, error } = usePopularMovies('')

  const {data: trendingMoviesData, isLoading: isTrendingMovieDataLoading, isError: isTrendingMovieDataError, error: trendingMovieDataError } = usetrendingMovies();

  return (
    <View className="flex-1 items-center justify-start bg-white pt-20 px-1">
      <Image
        source={require("../../assets/images/movie-picker.png")}
        className="w-20 h-20 mb-6"
        resizeMode="contain"
      />
      {(isLoading || isTrendingMovieDataLoading) && <ActivityIndicator size="large" color="#3b82f6" />}
      {(isError || isTrendingMovieDataError) && <Text className="text-red-500">{error?.message || trendingMovieDataError?.message}</Text>}

      <Text className="text-base font-bold mb-8">Here is top trending Movies</Text>

      <FlatList
        data={trendingMoviesData}
        horizontal
        ItemSeparatorComponent={() => <View className="w-4" />}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.movie_id.toString() + index.toString()}
        className="w-full mb-4"
        renderItem={({ item, index }) => (
          <MovieCard id={index} title={item.title} poster_path={item.posterUrl}/>
        )}
        contentContainerClassName="flex flex-row gap-x-4 px-2"
      />

      <Text className="text-base font-bold mb-8">Discover Movies</Text>
        <FlatList
          data={movieData}
          numColumns={3}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={{ justifyContent: 'space-between', gap: 12, marginBottom: 10, paddingRight: 5, paddingLeft: 5 }}
          className="w-full"
          renderItem={({ item }) => (
            <MovieCard id={item.id} title={item.title} overview={item.overview} poster_path={item.poster_path} release_date={item.release_date} vote_average={item.vote_average} />
          )}
        />
      
    </View>

  );
}
