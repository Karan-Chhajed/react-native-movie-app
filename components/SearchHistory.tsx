import { ActivityIndicator, FlatList, View, Text } from 'react-native';
import HorizontalMediaCardWithLink from './HorizontalMediaCardWithLink';
import { useSearchedData } from '@/hooks/useMovies';
import { toMediaKind } from '@/utils/media';
import { FC } from 'react';

export const SearchHistory: FC = () => {
  const {
    data: prevSearchedData,
    isLoading: isLoadingPrevData,
    isError: isErrorPrevData,
    error: prevDataError,
  } = useSearchedData();

  if (isLoadingPrevData) {
    return <ActivityIndicator size={'large'} color="#3b82f6" />;
  } else if (isErrorPrevData) {
    return (
      <View className="flex-1 w-full flex-col justify-center items-center">
        <Text className="text-red-150 text-sm">Error Loading search data!</Text>
        <Text className="text-sm text-red-150">{prevDataError.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={prevSearchedData}
      // The same title can be stored under several search terms, so the TMDB id isn't unique here.
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <HorizontalMediaCardWithLink
          name={item.title}
          poster_path={item.posterUrl}
          id={item.id}
          overview={item.overview}
          type={toMediaKind(item.media_type)}
        />
      )}
      ListEmptyComponent={
        <Text className="text-sm text-gray-400 text-center mt-6">No recent searches yet.</Text>
      }
    />
  );
};
