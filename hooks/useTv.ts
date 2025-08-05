import { fetchTrendingTvData, fetchTvData } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

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