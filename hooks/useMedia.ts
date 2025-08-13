import { SavedMedia } from "@/interfaces";
import { getSavedMedia } from "@/services/appwrite"
import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query"

export const useFetchSaved = () => {
    const limit = 10;
    return useInfiniteQuery<SavedMedia[], Error, InfiniteData<SavedMedia[]>, ['savedMedia'], number>({
        queryKey: ['savedMedia'],
        queryFn : ({ pageParam = 1 }: { pageParam?: number }) => getSavedMedia({ pageParam, limit }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage || lastPage.length < limit) return undefined;
            return allPages.length + 1;
        },
    });
}