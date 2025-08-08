import { useTvById } from "@/hooks/useTv";
import { TvSeries } from "@/interfaces";
import { router, useLocalSearchParams } from "expo-router";
import React, { FC } from "react";
import {View, Text, ScrollView, ActivityIndicator, Image, TouchableOpacity} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";


const TvDetails:FC<TvSeries> = () => {

  const { id } = useLocalSearchParams();

  const {data: tvData, isLoading: isLoadingTvData, isError: isErrorTv, error: tvErrorData} = useTvById(id as string );
 
  return (
    <SafeAreaProvider>
    <View className="flex-1 items-center justify-center bg-white">
      
      <ScrollView className="w-full mb-[4.5rem] -mt-10" contentOffset={{x: 0, y: 100}} showsVerticalScrollIndicator={false}>

        {isLoadingTvData && <ActivityIndicator color='#3b82f6' size='large'/>}
        
        {isErrorTv && <Text className="text-red-500">{tvErrorData.message}</Text>}


        {!isLoadingTvData && !isErrorTv && tvData  && (
           <View className="items-center bg-white mt-10 px-4">
                  <View className="w-screen rounded-lg">
                    <Image 
                          source={{ uri: tvData.poster_path ? `https://image.tmdb.org/t/p/w500${tvData.poster_path}` : 'https://via.placeholder.com/150' }}
                          className="w-full rounded-lg mb-2"
                          resizeMode="cover"
                          style={{aspectRatio: 2/3}}
                      />
                  </View>
          
                  <View className="mt-2 flex-col items-center justify-between w-full">
                      <View className="flex-col items-start">
                        <Text className="text-lg font-bold">
                          {tvData.name}
                        </Text>  
                      </View>
                      <View className="flex-row items-center justify-between w-full">
                        <View>
                          <Text className="text-sm text-gray-400">{tvData.last_air_date}</Text>
                        {/* <Text className="text-sm text-gray-400">{movieDetailsData.release_date.split('-')[0] ?? 'N/A'}</Text> */}
                        </View>
                        
                      </View>
                  </View>
                  <View className="mt-4">
                    <Text className="text-base font-semibold">Overview</Text>
                    <Text className="text-sm text-gray-600 mt-2">{tvData.overview}</Text>
                  </View>
                  <View>

                  </View>
              </View>
        )}
     
      </ScrollView>
      
      <TouchableOpacity className="absolute bottom-5 flex-row items-center justify-center bg-blue-500 p-3 w-4/5 rounded-lg" onPress={() => router.back()}>
          <Text className="text-black text-base font-semibold">Go Back</Text>
      </TouchableOpacity>

    </View>
    </SafeAreaProvider>
  );
}

export default TvDetails;