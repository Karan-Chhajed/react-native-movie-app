import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import React from 'react';
import VerticalMediaCardWithLink from '@/components/VerticalMediaCardWithLink';
import { useMovies } from '@/hooks/useMovies';
import SearchBar from '../../components/Search';
import { checkSearchData } from '@/services/appwrite';
import { useTv } from '@/hooks/useTv';

import { MediaType } from '@/interfaces';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchHistory } from '@/components/SearchHistory';

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [debouncedQuery, setDebouncedQuery] = React.useState('');
  const [showHistory, setShowHistory] = React.useState<boolean>(true)
  const [mediaType, setmediaType] = React.useState<MediaType>({ mediaType: 'Movie' })

  const insets = useSafeAreaInsets()

  React.useEffect(() => {

    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 1000);

    return () => clearTimeout(handler)
  }, [searchQuery]);

  const { data: searchedData, isLoading: isLoadingsearchedData, isError: isErrorsearchedData, error: searchedMovieError } = mediaType.mediaType === 'Movie' ? useMovies(debouncedQuery) : useTv(debouncedQuery)

  React.useEffect(() => {
    if (searchedData && searchedData.length > 0 && searchedData[0]) {
      checkSearchData(debouncedQuery, searchedData[0], mediaType.mediaType)
    }
  }, [searchQuery, searchedData]);

  const shouldShowHistory = showHistory || searchQuery.trim().length === 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }} edges={['bottom']}>
      <View className=''>
        <View className='w-full flex-row justify-center mt-20 items-center'>
          <Image className="w-12 h-12 -mt-4" source={require('../../assets/images/search.png')} />
        </View>
        <View className='m-6 h-16'>
          <SearchBar value={searchQuery}
            onChangeText={(text: string) => setSearchQuery(text)}
            onFocus={() => setShowHistory(false)}
            onBlur={() => {
              if (searchQuery.trim().length !== 0) {
                setShowHistory(false)
              } else {
                setShowHistory(true)
              }
            }}
          />
        </View>
        <View className='flex flex-row gap-x-4 px-4 mb-2'>
          <TouchableOpacity className={`w-24 h-10 disabled:bg-slate-400 bg-green-600 justify-center items-center rounded-2xl`} disabled={mediaType.mediaType === 'Movie'} onPressIn={() => setmediaType({ mediaType: 'Movie' })}><Text>Movies</Text></TouchableOpacity>
          <TouchableOpacity className='w-24 h-10 disabled:bg-slate-400 justify-center bg-green-600 items-center rounded-2xl' disabled={mediaType.mediaType === 'TV'} onPressIn={() => setmediaType({ mediaType: 'TV' })}><Text>TV</Text></TouchableOpacity>
        </View>

        {isErrorsearchedData && <Text className='text-red-500'>{`Something went wrong! ${isErrorsearchedData} `}</Text>}

        <Text className='text-lg font-bold text-center my-3 flex flex-row'>
          {!(isErrorsearchedData) && !(isLoadingsearchedData) && searchQuery.trim() ? `Search Results for "${searchQuery}"` : isLoadingsearchedData ? `Searching for ${searchQuery}` : 'Previous Search Results'}
          {isLoadingsearchedData && <ActivityIndicator color="#3b82f6" className='m-3' />}
        </Text>
      </View>
      <View className='flex-1'>
        {shouldShowHistory ? <SearchHistory /> :
          <FlatList
            showsVerticalScrollIndicator={false}
            className='flex-1'
            data={searchedData}
            numColumns={3}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={{ justifyContent: 'space-between', gap: 10, marginBottom: 10, paddingRight: 5, paddingLeft: 5 }}
            contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
            renderItem={({ item }) => (
              <VerticalMediaCardWithLink
                id={item.id}
                title={'title' in item ? item.title : item.name}
                overview={item.overview}
                poster_path={item.poster_path}
                release_date={'release_date' in item ? item.release_date : item.first_air_date}
                vote_average={item.vote_average}
                type={mediaType.mediaType}
              />
            )}
          />
        }
      </View>
    </SafeAreaView>
  )
}


export default Search;