import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchMovieDetails, fetchMovies, fetchTrendingMovies } from '@/services/api';
import { getSearchedMovies } from '@/services/appwrite';
import { Movie } from '@/interfaces';

export const usePopularMovies = (query: string = '') => {
  return useQuery({
    queryKey: ['popularMovies'],
    queryFn: () => fetchMovies({ query }),
    retry: 2,
  });
};

export const usetrendingMovies = (time_window: string) => {
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

export const useMovieDetails = (movie_id: string, options?: Partial<UseQueryOptions<Movie>>) => {
  return useQuery({
    queryKey: ['movieDetails', movie_id],
    queryFn: () => fetchMovieDetails(movie_id),
    retry: 2,
    enabled: !!movie_id,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    ...options,
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
