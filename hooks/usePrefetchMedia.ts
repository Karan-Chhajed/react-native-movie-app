import { MediaKind } from '@/interfaces';
import { useQueryClient } from '@tanstack/react-query';
import { movieDetailsQueryOptions } from './useMovies';
import { tvDetailsQueryOptions, watchProvidersQueryOptions } from './useTv';

/**
 * Starts loading a title's detail screen data as soon as its card is touched,
 * so the first visit renders with data instead of a loading state mid-transition.
 */
export const usePrefetchMedia = () => {
  const queryClient = useQueryClient();

  return (kind: MediaKind, id: string | number) => {
    // Detail screens read the id from route params, which are strings.
    const mediaId = String(id);

    if (kind === 'movie') {
      queryClient.prefetchQuery(movieDetailsQueryOptions(mediaId));
    } else {
      queryClient.prefetchQuery(tvDetailsQueryOptions(mediaId));
    }
    queryClient.prefetchQuery(watchProvidersQueryOptions(mediaId, kind));
  };
};
