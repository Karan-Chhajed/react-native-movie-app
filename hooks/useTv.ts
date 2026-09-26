import { TvSeries, WatchData } from '@/interfaces';
import {
  fetchTrendingTvData,
  fetchTvData,
  fetchTvDetails,
  fetchWatchProviders,
} from '@/services/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const useTvSeries = (query: string = '') => {
  return useQuery({
    queryKey: ['PopularSeries'],
    queryFn: () => fetchTvData({ query }),
    retry: 2,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000 * 2,
  });
};

export const useTrendingTvSeries = (query: string) => {
  return useQuery({
    queryKey: ['TrendingTv', query],
    queryFn: () => fetchTrendingTvData({ query }),
    retry: 2,
    staleTime: 60 * 60 * 1000,
    gcTime: 1000 * 60 * 60 * 2,
  });
};

export const useTv = (query: string) => {
  return useQuery({
    queryKey: ['SearchedTv', query],
    queryFn: () => fetchTvData({ query }),
    retry: 2,
    enabled: query !== '',
    staleTime: 60 * 60 * 1000,
    gcTime: 1000 * 60 * 60 * 2,
  });
};

// Shared with usePrefetchMedia so a prefetch fills the exact cache entry the screen reads.
export const tvDetailsQueryOptions = (series_id: string) =>
  queryOptions({
    queryKey: ['TvDetails', series_id],
    queryFn: (): Promise<TvSeries> => fetchTvDetails(series_id),
    retry: 2,
    staleTime: 60 * 60 * 1000,
    gcTime: 1000 * 60 * 60 * 2,
  });

export const watchProvidersQueryOptions = (series_id: string, platform: 'tv' | 'movie') =>
  queryOptions({
    queryKey: ['WatchProviders', series_id],
    queryFn: (): Promise<WatchData> => fetchWatchProviders(series_id, platform),
    retry: 2,
    staleTime: 60 * 60 * 1000,
    gcTime: 1000 * 60 * 60 * 2,
  });

export const useTvById = (series_id: string) => {
  return useQuery({
    ...tvDetailsQueryOptions(series_id),
    enabled: !!series_id,
  });
};

export const useWatchProviders = (series_id: string, platform: 'tv' | 'movie') => {
  return useQuery({
    ...watchProvidersQueryOptions(series_id, platform),
    enabled: !!series_id,
  });
};
