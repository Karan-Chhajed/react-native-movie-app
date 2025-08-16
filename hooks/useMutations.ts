import { SavedMedia } from "@/interfaces";
import { saveMediaToWatchlist, deleSavedMedia } from "@/services/appwrite";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import {toast} from 'react-hot-toast'

export const useAddToWatchlist = () => {
    const queryClient = useQueryClient();
    return useMutation({
    mutationFn: (media: SavedMedia) => saveMediaToWatchlist(media),

    onMutate: async (newMedia) => {
  await queryClient.cancelQueries({ queryKey: ['savedMedia'] });

  const prevData = queryClient.getQueryData<InfiniteData<{ documents: SavedMedia[] }>>(['savedMedia']);

  queryClient.setQueryData<InfiniteData<{ documents: SavedMedia[] }>>(
    ['savedMedia'],
    (old) => {
      if (!old) return { pages: [{ documents: [newMedia] }], pageParams: [] };

      return {
        ...old,
        pages: old.pages.map((page, i) =>
          i === 0
            ? {
                ...page,
                documents: page.documents.some((m) => m.id === newMedia.id)
                  ? page.documents
                  : [newMedia, ...page.documents],
              }
            : page
        ),
      };
    }
  );

  return { prevData };
},
    onError: (error, _newMedia, context) => {
        if(context?.prevData) {
            queryClient.setQueryData(['savedMedia'], context.prevData)
        }
        toast.error('Something went wrong! Try again!')
        console.error('Error saving media to watchlist:', error);
    },

    onSuccess: () => {
        toast.success('Movie Added to Watchlist!')
    },

    onSettled: () => {
        queryClient.invalidateQueries({queryKey: ['savedMedia']})
    }
})
}

export const useRemoveFromWatchlist = () => {
    const queryClient = useQueryClient();
    return useMutation({
    mutationFn: (id: string) => deleSavedMedia(id),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['savedMedia'] })
    },
    onError: (error) => {
        console.error('Error removing media from watchlist:', error);
    },
})
}

