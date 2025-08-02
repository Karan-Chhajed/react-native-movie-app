import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails, fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";

export const usePopularMovies = (query: string = '') => {
  return useQuery({
    queryKey: ['popularMovies'],
    queryFn: () => fetchMovies({ query}), // Or hardcode endpoint
    retry: 2,
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

export const usetrendingMovies = () => {
  return useQuery({
    queryKey: ['tredingMovies'],
    queryFn: () => getTrendingMovies(),
    retry: 2,
    staleTime: 1000 * 60 * 60,
  })
}


export const useMovieDetails = (movie_id: string) => {
  return useQuery({
    queryKey: ['movieDetails', movie_id],
    queryFn: () => fetchMovieDetails(movie_id),
    retry: 2,
    enabled: !!movie_id, // Only fetch if movie_id is provided
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  })
}