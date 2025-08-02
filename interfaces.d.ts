export interface Movie {
  id: string;
  title: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime?: number;
}

export interface TrendingMovies {
    searchtTerm: string;
    movie_id: string;
    count: number;
    title: string; 
    posterUrl: string;
}