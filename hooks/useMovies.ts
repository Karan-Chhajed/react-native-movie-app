import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchMovieDetails, fetchMovies, fetchTrendingMovies } from '@/services/api';
import { getSearchedMovies } from '@/services/appwrite';

export const usePopularMovies = (query: string = '') => {
  return useQuery({
    queryKey: ['popularMovies'],
    queryFn: () => fetchMovies({ query }),
    retry: 2,
  });
};

export const useTrendingMovies = (time_window: string) => {
  return useQuery({
    queryKey: ['trendingMovies', time_window],
    queryFn: () => fetchTrendingMovies({ time_window }),
    retry: 2,
    staleTime: 1000 * 60 * 60,
  });
};

export const useMovies = (query: string) => {
  return useQuery({
    queryKey: ['searchMovies', query],
    queryFn: () => fetchMovies({ query }),
    retry: 2,
    enabled: query !== '', // Only fetch if search query is non-empty
  });
};

// Shared with usePrefetchMedia so a prefetch fills the exact cache entry the screen reads.
export const movieDetailsQueryOptions = (movie_id: string) =>
  queryOptions({
    queryKey: ['movieDetails', movie_id],
    queryFn: () => fetchMovieDetails(movie_id),
    retry: 2,
    staleTime: 1000 * 60 * 60,
  });

export const useMovieDetails = (movie_id: string) => {
  return useQuery({
    ...movieDetailsQueryOptions(movie_id),
    enabled: !!movie_id,
    refetchOnWindowFocus: false,
  });
};

export const useSearchedData = () => {
  return useQuery({
    queryKey: ['Searched'],
    queryFn: () => getSearchedMovies(),
    retry: 2,
    gcTime: 60 * 60 * 1000 * 2,
  });
};
