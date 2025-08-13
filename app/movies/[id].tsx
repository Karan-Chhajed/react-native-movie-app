import { GenreComponent } from "@/components/GenreComponent";
import { WhereToWatch } from "@/components/WhereToWatch";
import { useMovieDetails } from "@/hooks/useMovies";
import { useAddToWatchlist } from "@/hooks/useMutations";
import { useWatchProviders } from "@/hooks/useTv";
import { Movie, MediaType } from "@/interfaces";
import { router, useLocalSearchParams } from "expo-router";
import React, { FC } from "react";
import {View, Text, ScrollView, ActivityIndicator, Image, TouchableOpacity, Pressable, Button} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";


const MovieDetails:FC<Movie> = () => {

  const { id } = useLocalSearchParams();

  const {data: movieData, isLoading: isLoadingMovieData, isError: isErrorMovie, error: isMovieErrorData} = useMovieDetails(id as string );

  const {data: watchData, isLoading: isLoadingWatchData, isError: isErrorWatch, error: isWatchErrorData} = useWatchProviders(id as string, 'movie')

  const {mutate: addToWatchlist} = useAddToWatchlist();

  if(isLoadingMovieData || isLoadingWatchData) {
    return(
          <View className="flex-1 items-center justify-center bg-white">
            <ActivityIndicator color='#3b82f6' size='large' />
          </View>
        )
  }

  if(isErrorMovie || isErrorWatch || !watchData || !movieData) {
    const message = [isMovieErrorData?.message, isWatchErrorData?.message].filter(Boolean).join(' | ') || 'Something went wrong!'
    return (
      <View className="flex-1 items-center justify-center bg-white">
              <Text className="text-red-500">{message}</Text>
            </View>
    )
  }  

  return (
    <SafeAreaProvider>
    <View className="flex-1 items-center justify-center bg-white">
      
      <ScrollView className="w-full mb-[4.5rem] -mt-10" contentOffset={{x: 0, y: 100}} showsVerticalScrollIndicator={false} >
           <View className="items-center bg-white mt-10 px-4">
                  <View className="w-screen rounded-lg">
                    <Image 
                          source={{ uri: movieData.poster_path ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}` : 'https://via.placeholder.com/150' }}
                          className="w-full rounded-lg mb-2"
                          resizeMode="cover"
                          style={{aspectRatio: 2/3}}
                      />
                  </View>
          
                  <View className="mt-2 flex-col items-center justify-between w-full">
                      <View className="flex-col items-start">
                        <Text className="text-lg font-bold">
                          {movieData.title}
                        </Text>  
                        <Button  
                        title="Add to Watchlist"
                        onPress={() => addToWatchlist({
                          id: movieData.id,
                          title: movieData.title,
                          posterUrl: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
                          overview: movieData.overview,
                          media_type: 'Movie',
                          vote_average: movieData.vote_average
                        })}/>
                        
                        
                      </View>
                      <View className="flex-row items-center justify-between w-full py-2">
                        
                          <Text className="text-sm text-gray-400 ">Runtime: {movieData.runtime} mins</Text>
                        {/* <Text className="text-sm text-gray-400">{movieDetailsData.release_date.split('-')[0] ?? 'N/A'}</Text> */}
                        
                        <View className="flex-row items-center justify-center gap-x-1">
                          <Image source={require('../../assets/images/star.png')} className="size-4"/>
                          <Text className="text-sm">{movieData.vote_average ? Math.round(movieData.vote_average / 2) : 'N/A'} / 5</Text>
                        </View>
                      </View>
                  </View>
                  <View className="mt-4">
                    <Text className="text-base font-semibold">Overview</Text>
                    <Text className="text-sm text-gray-600 mt-2">{movieData.overview}</Text>
                  </View>
                  <WhereToWatch watchData={watchData}/>
                  <View className="w-full my-2">
                      <GenreComponent genres={movieData.genres}/>
                  </View>
              </View>
     
      </ScrollView>
      
      <TouchableOpacity className="absolute bottom-5 flex-row items-center justify-center bg-blue-500 p-3 w-4/5 rounded-lg" onPress={() => router.back()}>
          <Text className="text-black text-base font-semibold">Go Back</Text>
      </TouchableOpacity>

    </View>
    </SafeAreaProvider>
  );
}

export default MovieDetails;