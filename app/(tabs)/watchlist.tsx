import ExpandableCard from '@/components/SavedMovieCard';
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
    isLoadingError,
    isLoading,
  } = useFetchSaved();

  const flatSaveData = watchData?.pages.flatMap((page) => page.data) ?? [];

  if ( flatSaveData.length === 0 && !isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-black">
        <View className="font-semibold text-green-500">
          <Text className=" font-bold text-2xl text-white">How about you add some </Text>
        </View>
      </SafeAreaView>
    );
  }

  if ( isLoading ) {
    return (
      <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size='large' color={'white'}/>
      </ View>
    );
  }

  if(isError) {
     return (
      <SafeAreaView className="flex-1 items-center justify-center bg-black">
        <View className="font-semibold text-green-500">
          <Text className=" font-bold text-2xl text-red-150">Oops! Something went wrong </Text>
        </View>
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
            <View className=" pb-4">
              <Text className="text-center text-xl font-semibold text-white">Your Watch List</Text>
            </View>
          }
          renderItem={({ item }) => {
            return (
              <ExpandableCard
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
