import { SavedMedia } from "@/interfaces";
import { getSavedMedia, saveMediaExists } from "@/services/appwrite";
import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

export const useFetchSaved = () => {
  const limit = 10;
  return useInfiniteQuery<
    { data: SavedMedia[]; total: number }, // TQueryFnData
    Error,
    InfiniteData<{ data: SavedMedia[]; total: number }>,
    ["savedMedia"],
    number
  >({
    queryKey: ["savedMedia"],
    queryFn: ({ pageParam = 1 }) => getSavedMedia({ pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.total / limit);
      return allPages.length < totalPages ? allPages.length + 1 : undefined;
    },
  });
};

export const useSavedMediaExists = (id: number) => {
  return useQuery({
    queryKey: ["savedMediaExists", id],
    queryFn: () => saveMediaExists(Number(id)),
    enabled: !!id,
  });
};
