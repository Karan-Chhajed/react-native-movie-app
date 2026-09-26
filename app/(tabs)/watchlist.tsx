import SavedMovieCard from '@/components/SavedMovieCard';
import { useFetchSaved } from '@/hooks/useMedia';
import React, { FC } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WatchList: FC = () => {
  const {
    data: watchData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useFetchSaved();

  const flatSaveData = watchData?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (isError) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-black">
        <Text className="font-bold text-2xl text-red-150">Oops! Something went wrong</Text>
      </SafeAreaView>
    );
  }

  if (flatSaveData.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center gap-y-2 bg-black px-6">
        <Text className="font-bold text-2xl text-white text-center">Your watch list is empty</Text>
        <Text className="text-base text-gray-400 text-center">
          Save a movie or TV show and it will show up here.
        </Text>
      </SafeAreaView>
    );
  }

  if (watchData) {
    return (
      <SafeAreaView className="flex-1 px-4 bg-black">
        <FlatList
          data={flatSaveData}
          keyExtractor={(item) => item.id}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={
            <View className="pb-4 bg-black">
              <Text
                className="text-center text-xl font-semibold text-white"
                accessibilityRole="header"
              >
                Your Watch List
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            return (
              <SavedMovieCard
                vote_average={item.vote_average}
                name={item.title}
                mediaType={item.media_type}
                genres={item.genres}
                posterUrl={item.posterUrl}
                id={item.id}
              />
            );
          }}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator size={'small'} color="#3b82f6" /> : null
          }
        />
      </SafeAreaView>
    );
  }
};

export default WatchList;
