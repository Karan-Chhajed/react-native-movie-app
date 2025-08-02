import { Movie } from "@/interfaces";
import { Siege } from "@rainbow6/api";

export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchMovies = async({query } : {query: string}) => {

    const endpoint = !query?.trim() ? `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc` : `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers
    });

    if(!response.ok) {
        throw new Error('Failed to fetch movies!', { cause: response.statusText })
    }

    const data = await response.json();
    return data.results;
}

export const fetchMovieDetails = async (movie_id: string): Promise<Movie> => {

    const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movie_id}?api_key=${TMDB_CONFIG.API_KEY}&language=en-US`;

    try {const response = await fetch(endpoint,  {
        method: 'GET',
        headers: TMDB_CONFIG.headers
    })
    if(!response.ok) {
        throw new Error('Failed to fetch movie details!', { cause: response.statusText });
        }
    const data = await response.json();
    return data as Movie;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw new Error('Failed to fetch movie details');
    }
}
