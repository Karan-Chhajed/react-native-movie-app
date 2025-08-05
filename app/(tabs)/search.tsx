import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import { MovieCard } from '@/components/MovieCard';
import { useMovies, useSearchedData } from '@/hooks/useMovies';
import SearchBar from '../../components/Search';
import { updateSearchCount } from '@/services/appwrite';
import { useQuery } from '@tanstack/react-query';

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [debouncedQuery, setDebouncedQuery] = React.useState('');

  const { data: prevSearchedMovieData, isLoading: isLoadingPrevData, isError: isErrorPrevData, error: prevDataError} = useSearchedData()


  React.useEffect(() => {

    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 1000);

    return () => clearTimeout(handler); // clear on next type
  }, [searchQuery]);

  const { data: searchedMovies, isLoading, isError, error } = useMovies(debouncedQuery)

  React.useEffect(() => {
    if (searchedMovies && searchedMovies.length > 0 && searchedMovies[0]) {
      updateSearchCount(debouncedQuery, searchedMovies[0])
    }
  }, [searchQuery, searchedMovies]);

  return (

    <View className="flex-1 items-center justify-center">

      {prevSearchedMovieData !== undefined && <FlatList 
        showsVerticalScrollIndicator={false}
        data = {prevSearchedMovieData}
        keyExtractor={(item) => item.movie_id}
        renderItem={({item}) => (
          <View>
            <Text>
                {item.title}
            </Text>
          </View>
        )}
      />}

      <FlatList
        showsVerticalScrollIndicator={false}
        data={searchedMovies} // Assuming searchedMovies is defined and contains the search results
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: 'space-between', gap: 10, marginBottom: 10, paddingRight: 5, paddingLeft: 5 }}
        renderItem={({ item }) => (
          <MovieCard
            id={item.id}
            title={'title' in item ? item.title : item.name}
            overview={item.overview}
            poster_path={item.poster_path}
            release_date={'release_date' in item ? item.release_date : item.first_air_date}
            vote_average={item.vote_average}
            type={''}
          />
        )}
        stickyHeaderIndices={[0]} // To keep the header at the top
        ListHeaderComponentStyle={{ backgroundColor: 'white', borderRadius: 10, marginBottom: 20, paddingLeft: 5, paddingRight: 5 }}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20 items-center'>
              <Image className="w-12 h-12 -mt-4" source={require('../../assets/images/search.png')} />
            </View>
            <View className='my-5'>
              <SearchBar value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {isLoading && <ActivityIndicator size="large" color="#3b82f6" className='my-3' />}
            {isError && <Text className='text-red-500'>{error.message}</Text>}
            {!isError && !isLoading && searchQuery.trim() && (
              <Text className='text-lg font-bold text-center my-3'>
                Search Results for "{searchQuery}"
              </Text>
            )}
          </>
        }
      />
    </View>

  );
}

export default Search;