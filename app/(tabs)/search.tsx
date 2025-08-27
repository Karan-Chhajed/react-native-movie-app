import { SearchHistory } from '@/components/SearchHistory';
import VerticalMediaCardWithLink from '@/components/VerticalMediaCardWithLink';
import { useOrientation } from '@/hooks/useDevice';
import { useMovies } from '@/hooks/useMovies';
import { useTv } from '@/hooks/useTv';
import { checkSearchData } from '@/services/appwrite';
import React from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from '../../components/Search';

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [debouncedQuery, setDebouncedQuery] = React.useState('');
  const [showHistory, setShowHistory] = React.useState<boolean>(true);
  const [mediaType, setmediaType] = React.useState<string>('movie');

  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const {
    data: searchedData,
    isLoading: isLoadingsearchedData,
    isError: isErrorsearched,
    error: searchedMovieError,
  } = mediaType === 'movie' ? useMovies(debouncedQuery) : useTv(debouncedQuery);

  React.useEffect(() => {
    if (searchedData && searchedData.length > 0 && searchedData[0]) {
      checkSearchData(debouncedQuery, searchedData[0], mediaType);
    }
  }, [searchQuery, searchedData]);

  const shouldShowHistory = showHistory || searchQuery.trim().length === 0;

  const orientation = useOrientation()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }} edges={['bottom']} className = {`landscape:px-8 pt-10`}>
      <View>
        <View className="w-full flex-row justify-center items-center gap-x-4">
          <Image
            className="w-12 h-12"
            source={require('../../assets/images/search.png')}
            tintColor={'red'}
          />
          <Text className="text-red-600 text-2xl">Find what to watch!</Text>
        </View>
        <View className='landscape:flex-row landscape:justify-center landscape:items-center'>
        <View className="m-6 h-16 landscape:flex-[2]">
          <SearchBar
            value={searchQuery}
            onChangeText={(text: string) => setSearchQuery(text)}
            onFocus={() => setShowHistory(false)}
            onBlur={() => {
              if (searchQuery.trim().length !== 0) {
                setShowHistory(false);
              } else {
                setShowHistory(true);
              }
            }}
          />
        </View>
        <View className="flex flex-row gap-x-4 px-4 mb-2">
          <TouchableOpacity
            className={`w-24 h-10 disabled:bg-red-600 bg-white justify-center items-center rounded-2xl`}
            disabled={mediaType === 'movie'}
            onPressIn={() => setmediaType('movie')}
          >
            <Text>Movies</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-24 h-10 disabled:bg-red-600 justify-center bg-white items-center rounded-2xl"
            disabled={mediaType === 'tv'}
            onPressIn={() => setmediaType('tv')}
          >
            <Text>TV</Text>
          </TouchableOpacity>
        </View>
        </View>

        {isErrorsearched && (
          <Text className="text-red-500">{`Something went wrong! ${searchedMovieError.message} `}</Text>
        )}

       {orientation === 'potrait' ? <Text className={`text-lg font-bold text-center my-3 flex flex-row text-white`}>
          {!isErrorsearched && !isLoadingsearchedData && searchQuery.trim()
            ? `Search Results for "${searchQuery}"`
            : isLoadingsearchedData
              ? `Searching for ${searchQuery}`
              : 'Previous Search Results'}
          {isLoadingsearchedData && <ActivityIndicator color="#3b82f6" className="m-3" />}
        </Text> : null}
      </View>
      <View className="flex-1">
        {shouldShowHistory ? (
          <SearchHistory />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            className="flex-1"
            data={searchedData}
            numColumns={3}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              gap: 10,
              marginBottom: 10,
              paddingRight: 5,
              paddingLeft: 5,
            }}
            contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
            renderItem={({ item }) => (
              <VerticalMediaCardWithLink
                id={item.id}
                title={'title' in item ? item.title : item.name}
                overview={item.overview}
                poster_path={item.poster_path}
                release_date={'release_date' in item ? item.release_date : item.first_air_date}
                vote_average={item.vote_average}
                type={mediaType}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Search;
