import { GenreComponent } from "@/components/GenreComponent";
import { WhereToWatch } from "@/components/WhereToWatch";
import { useTvById, useWatchProviders } from "@/hooks/useTv";
import { TvSeries } from "@/interfaces";
import { router, useLocalSearchParams } from "expo-router";
import React, { FC } from "react";
import { View, Text, ScrollView, ActivityIndicator, Image, TouchableOpacity, Linking } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";


const TvDetails: FC<TvSeries> = () => {

  const { id } = useLocalSearchParams();

  const { data: tvData, isLoading: isLoadingTvData, isError: isErrorTv, error: tvErrorData } = useTvById(id as string);

  const { data: watchData, isLoading: isLoadingWatch, isError: isErrorWatch, error: watchDataError } = useWatchProviders(id as string, 'tv')

  if(isLoadingTvData || isLoadingWatch) {
    return(
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator color='#3b82f6' size='large' />
      </View>
    )
  }

  if( isErrorTv || isErrorWatch || !tvData || !watchData ) {
    const message = [
    tvErrorData?.message,
    watchDataError?.message
  ]
    .filter(Boolean)
    .join(" | ") || "Something went wrong!";

    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-red-500">{message}</Text>
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <View className="flex-1 items-center justify-center bg-white">

        <ScrollView className="w-full mb-[4.5rem] -mt-10" contentOffset={{ x: 0, y: 100 }} showsVerticalScrollIndicator={false}>

            <View className="items-center bg-white mt-10 px-4">
              <View className="w-screen rounded-lg">
                <Image
                  source={{ uri: tvData.poster_path ? `https://image.tmdb.org/t/p/w500${tvData.poster_path}` : 'https://via.placeholder.com/150' }}
                  className="w-full rounded-lg mb-2"
                  resizeMode="cover"
                  style={{ aspectRatio: 2 / 3 }}
                />
              </View>

              <View className="mt-2 flex-col items-center justify-between w-full">
                <Text className="text-lg font-bold">
                  {tvData.name}
                </Text>
              </View>
              <View className="mt-4">
                <View className="flex-row items-center justify-between w-full">
                  <Text className="text-base font-semibold">Overview</Text>
                  <Text className="text-sm text-gray-400">{`Release Date: ${tvData.first_air_date.split('-')[0]}`}</Text>
                </View>
                <Text className="text-sm text-gray-600 mt-2">{tvData.overview}</Text>
              </View>

              <WhereToWatch watchData={watchData} />

              <View className="flex flex-row w-full py-2 gap-x-2 items-center justify-start" >
                <Text className="text-sm font-medium">Original Network:</Text>
                <Image source={{
                  uri: tvData.networks[0].logo_path
                    ? `https://image.tmdb.org/t/p/w500${tvData.networks[0].logo_path}`
                    : 'https://via.placeholder.com/150'
                }}
                  className="w-10 h-10 " resizeMode="contain" />
              </View>
              <GenreComponent genres={tvData.genres} />
            </View>
          
        </ScrollView>
        <TouchableOpacity className="absolute bottom-5 flex-row items-center justify-center bg-blue-500 p-3 w-4/5 rounded-lg" onPress={() => router.back()}>
          <Text className="text-black text-base font-semibold">Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
}

export default TvDetails;