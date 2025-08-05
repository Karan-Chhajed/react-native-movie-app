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

export interface MediaType {
  mediaType: 'Movie' | 'TV'
}

export interface SearchedMedia {
    searchtTerm: string;
    id: string;
    count: number;
    title: string; 
    posterUrl: string;
    overview: string;
    media_type: string;
    vote_average:number;
}

export interface TvSeries {
  id: string;
  name: string;
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  overview: string
  poster_path: string
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
}