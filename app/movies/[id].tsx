import { GenreComponent } from "@/components/GenreComponent";
import { WhereToWatch } from "@/components/WhereToWatch";
import { useSavedMediaExists } from "@/hooks/useMedia";
import { useMovieDetails } from "@/hooks/useMovies";
import {
  useAddToWatchlist,
  useRemoveFromWatchlist,
} from "@/hooks/useMutations";
import { useWatchProviders } from "@/hooks/useTv";
import { Movie, Genres } from "@/interfaces";
import { router, useLocalSearchParams } from "expo-router";
import React, { FC } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const MovieDetails: FC<Movie> = () => {

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
  } = useWatchProviders(id as string, "movie");

  const {
    data: isSavedData,
    isLoading: isLoadingSavedExists,
    isError: isErrorSavedExists,
  } = useSavedMediaExists(Number(id));

  const { mutate: addToWatchlist } = useAddToWatchlist();

  const { mutate: removeFromWatchlist } = useRemoveFromWatchlist();
  

  if (isLoadingMovieData || isLoadingWatchData) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color="#3b82f6" size="large" />
      </View>
    );
  }

  if (
    isErrorMovie ||
    isErrorWatch ||
    !watchData ||
    !movieData
  ) {
    const message =
      [isMovieErrorData?.message, isWatchErrorData?.message]
        .filter(Boolean)
        .join(" | ") || "Something went wrong!";
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">{message}</Text>
      </View>
    );
  }

  const genresFlatData = movieData.genres.map((genre: Genres) => (genre.name)).join(", ")

  return (
    <SafeAreaView className=" flex-1 bg-black">
      <View className="items-center justify-center -mt-16 bg-black -bottom-4">
        <ScrollView
          className="w-full mb-[4.5rem]"
          contentOffset={{ x: 0, y: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="items-center  mt-10 px-4">
            <View className="w-screen rounded-lg">
              <Image
                source={{
                  uri: movieData.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
                    : "https://via.placeholder.com/150",
                }}
                className="w-full rounded-lg mb-2"
                resizeMode="cover"
                style={{ aspectRatio: 2 / 3 }}
              />
            </View>

            <View className="mt-2 flex-col items-center justify-between w-full">
              <View className="flex-row items-center justify-between w-full">
                <Text className="text-lg font-bold text-white">{movieData.title}</Text>

                {isLoadingSavedExists ? (
                  <>
                    <ActivityIndicator size="small" color="#3b82f6" />
                  </>
                ) :
                  <TouchableOpacity
                    className={`rounded-lg border border-gray-400 px-2 ${isSavedData ? "bg-white" : ""}`}
                    onPress={() => {
                      if (isSavedData ) {
                        removeFromWatchlist(id as string);
                      
                      } else {
                        addToWatchlist({
                          id: movieData.id,
                          title: movieData.title,
                          posterUrl: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
                          overview: movieData.overview,
                          media_type: "Movie",
                          vote_average: movieData.vote_average,
                          genres: genresFlatData
                        });
                       
                      }
                    }}
                  >
                    <Text className={`text-sm font-light ${isSavedData ? 'text-black' : 'text-white'}`}>Watchlist</Text>
                  </TouchableOpacity>
                }
              </View>
              <View className="flex-row items-center justify-between w-full py-2">
                <Text className="text-sm text-gray-400 ">
                  Runtime: {movieData.runtime} mins
                </Text>
                {/* <Text className="text-sm text-gray-400">{movieDetailsData.release_date.split('-')[0] ?? 'N/A'}</Text> */}

                <View className="flex-row items-center justify-center gap-x-1">
                  <Image
                    source={require("../../assets/images/star.png")}
                    className="size-4"
                  />
                  <Text className="text-sm text-white">
                    {movieData.vote_average
                      ? Math.round(movieData.vote_average / 2)
                      : "N/A"}{" "}
                    / 5
                  </Text>
                </View>
              </View>
            </View>
            <View className="mt-4">
              <Text className="text-base font-semibold text-white">Overview</Text>
              <Text className="text-sm text-gray-600 mt-2">
                {movieData.overview}
              </Text>
            </View>
            <WhereToWatch watchData={watchData} />
            <View className="w-full my-2">
              <GenreComponent genres={movieData.genres} />
            </View>
          </View>
        </ScrollView>
          
        <TouchableOpacity
          className="absolute flex-row items-center justify-center bg-[#ff0000] p-3 w-4/5 rounded-lg bottom-0"
          onPress={() => router.back()}
        >
          <Text className="text-white text-base font-semibold">Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MovieDetails;
