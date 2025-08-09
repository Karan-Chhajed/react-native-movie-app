import { TvSeries, WatchData } from "@/interfaces";
import { fetchTrendingTvData, fetchTvData, fetchTvDetails, fetchWatchProviders } from "@/services/api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useTvSeries = (query: string = '') => {
    return useQuery({
        queryKey: ['PopularSeries'],
        queryFn: () => fetchTvData({query}),
        retry: 2,
        staleTime: 60*60*1000,
        gcTime: 60 * 60 * 1000 *2
    })
}

export const useTrendingTvSeries = (query: string) => {
    return useQuery({
        queryKey: ['TrendingTv', query],
        queryFn: () => fetchTrendingTvData({query}),
        retry: 2,
        staleTime: 60 * 60 * 1000,
        gcTime: 1000 * 60 * 60 * 2
    })
}

export const useTv = (query: string) => {
    return useQuery({
        queryKey: ['SearchedTv', query],
        queryFn: () => fetchTvData({query}),
        retry: 2,
        staleTime: 60 * 60 * 1000,
        gcTime: 1000 * 60 * 60 * 2
    })
}

export const useTvById = (series_id: string, options?: Partial<UseQueryOptions<any>>) => {
    return useQuery<TvSeries>({
        queryKey: ['TvDetails', series_id],
        queryFn: () => fetchTvDetails(series_id),
        enabled: !!series_id,
        retry: 2,
        staleTime: 60 * 60 * 1000,
        gcTime: 1000 * 60 * 60 * 2,
        ...options
    })
}

export const useWatchProviders = (series_id: string, platform: 'tv' | 'movie',  options?: Partial<UseQueryOptions<any>>) => {
    return useQuery<WatchData>({
        queryKey: ['WatchProviders', series_id],
        queryFn: () => fetchWatchProviders(series_id, platform),
        enabled: !!series_id,
        retry: 2,
        staleTime: 60 * 60 * 1000,
        gcTime: 1000 * 60 * 60 * 2,
        ...options
    })
}