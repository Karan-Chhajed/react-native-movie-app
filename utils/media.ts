import type { MediaKind } from '@/interfaces';
import type { Href } from 'expo-router';

// Poster sizes are chosen per surface: w342 covers a 112pt card at 3x density,
// w92 covers the small provider/network logos.
type TmdbImageSize = 'w92' | 'w342' | 'w500';

/**
 * Builds a TMDB image URL from a `poster_path`/`logo_path`.
 * Older saved records store an absolute URL instead of a path, so those are passed through.
 */
export const tmdbImageUrl = (path: string | null | undefined, size: TmdbImageSize) => {
  if (!path) return undefined;
  return path.startsWith('http') ? path : `https://image.tmdb.org/t/p/${size}${path}`;
};

export const MEDIA_KIND_LABEL: Record<MediaKind, string> = {
  movie: 'Movie',
  tv: 'TV',
};

/** Normalises the media type strings stored in Appwrite ('Movie', 'movie', 'tv'). */
export const toMediaKind = (value: string): MediaKind =>
  value.toLowerCase() === 'tv' ? 'tv' : 'movie';

export const mediaHref = (kind: MediaKind, id: string | number): Href =>
  kind === 'movie' ? `/movies/${id}` : `/tv/${id}`;

/** TMDB scores are out of 10; the UI shows a rounded score out of 5. */
export const toFiveStarRating = (voteAverage?: number) =>
  voteAverage ? Math.round(voteAverage / 2) : undefined;
