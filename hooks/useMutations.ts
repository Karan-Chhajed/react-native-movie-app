import { SavedMedia } from "@/interfaces";
import { saveMediaToWatchlist, deleSavedMedia } from "@/services/appwrite";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddToWatchlist = () => {
    const queryClient = useQueryClient();
    return useMutation({
    mutationFn: (media: SavedMedia) => saveMediaToWatchlist(media),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['savedMedia'] })
    },
    onError: (error) => {
        console.error('Error saving media to watchlist:', error);
    },
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

