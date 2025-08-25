import { ReviewData, SavedMedia } from "@/interfaces";
import {
  saveMediaToWatchlist,
  deleteSavedMedia,
  postReview,
} from "@/services/appwrite";
import { useReviewStore } from "@/store/store";
import {
  InfiniteData,
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ID } from "react-native-appwrite";
import Toast from "react-native-toast-message";

export const useAddToWatchlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (media: SavedMedia) => saveMediaToWatchlist(media),

    onMutate: async (newMedia) => {
      await queryClient.cancelQueries({ queryKey: ["savedMedia"] });
      await queryClient.cancelQueries({
        queryKey: ["savedMediaExists", newMedia.id],
      });

      const prevData = queryClient.getQueryData<
        InfiniteData<{ data: SavedMedia[] }>
      >(["savedMedia"]);

      queryClient.setQueryData<InfiniteData<{ data: SavedMedia[] }>>(
        ["savedMedia"],
        (old) => {
          if (!old) {
            return { pages: [{ data: [newMedia] }], pageParams: [1] };
          }
          return {
            ...old,
            pages: old.pages.map((page, i) =>
              i === 0
                ? {
                    ...page,
                    data: page.data.some((m) => m.id === newMedia.id.toString())
                      ? page.data
                      : [newMedia, ...page.data],
                  }
                : page
            ),
            pageParams: old.pageParams,
          };
        }
      );
      queryClient.setQueryData(["savedMediaExists", newMedia.id], true);
      return { prevData, newMedia };
    },
    onError: (error, _newMedia, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(["savedMedia"], context.prevData);
      }
      queryClient.setQueryData(
        ["savedMediaExists", context?.newMedia.id],
        false
      );
      console.error("Error saving media to watchlist:", error);
    },

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Successfully added to Watchlist!",
      });
    },

    onSettled: (_data, _variable, context) => {
      queryClient.invalidateQueries({ queryKey: ["savedMedia"] });
      queryClient.invalidateQueries({
        queryKey: ["savedMediaExists", context.id],
      });
    },
  });
};

export const useRemoveFromWatchlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (media_id: string) => deleteSavedMedia(media_id),

    onMutate: async (media_id) => {
      await queryClient.cancelQueries({ queryKey: ["savedMedia"] });
      await queryClient.cancelQueries({
        queryKey: ["savedMediaExists", media_id],
      });

      queryClient.setQueryData(["savedMediaExists", media_id], false);

      const prevData = queryClient.getQueryData<
        InfiniteData<{ data: SavedMedia[] }>
      >(["savedMedia"]);

      queryClient.setQueryData<InfiniteData<{ data: SavedMedia[] }>>(
        ["savedMedia"],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page, i) =>
              i === 0
                ? {
                    ...page,
                    documents: page.data.filter((m) => m.id !== media_id),
                  }
                : page
            ),
          };
        }
      );
      return { prevData, media_id };
    },

    onError: (error, _vars, context) => {
      if (context) {
        queryClient.setQueryData(["savedMedia"], context.prevData);
        queryClient.setQueryData(["savedMediaExists", context.media_id], true);
      }
      console.error("Error deleting media from watchlist:", error);
    },

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Successfully removed from watchlist!",
      });
    },

    onSettled: (_data, _variable, context) => {
      queryClient.invalidateQueries({
        queryKey: ["savedMediaExists", Number(context)],
      });
      queryClient.invalidateQueries({ queryKey: ["savedMedia"] });
    },
  });
};

export const useSubmitForData = () => {
  const { reset, validate } = useReviewStore();
  return useMutation({
    mutationFn: async (formData: ReviewData) => {
      const isValid = validate();
      if (!isValid) throw new Error("Check your form");
      return postReview(formData);
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Something went wrong! Check the fields",
      });
    },
    onSuccess: () => {
      reset();
      Toast.show({
        type: "success",
        text1: "Review successfully submitted!",
      });
    },
  });
};
