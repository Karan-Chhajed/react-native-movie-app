import {FlatList, Text, View, Image, ActivityIndicator} from 'react-native';
import React, { FC } from 'react';
import ExpandableCard from '@/components/ExpandableCard';
import { useFetchSaved } from '@/hooks/useMedia';

const WatchList:FC = () => {

const {data: watchData, fetchNextPage, hasNextPage, isFetchingNextPage} = useFetchSaved()

const flatSaveData = watchData?.pages.flat() ??[]

  return (
    <View className="flex-1 w-full bg-white">
      <FlatList data={flatSaveData}
                keyExtractor={item => item.id}
                ListHeaderComponent={<Text>Your Watch List</Text>}
                renderItem={({item}) =>
                  <ExpandableCard name={item.title} overview={item.overview} posterUrl={item.posterUrl} mediaType={item.media_type} vote_average={item.vote_average}/>
                  }
                onEndReached={() => {
                  if(hasNextPage && !isFetchingNextPage) {
                    fetchNextPage()
                  }
                }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size={'small'} color="#3b82f6" /> : null}
                />
    </View>

  );
}

export default WatchList;