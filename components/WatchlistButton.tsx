import { useSavedMediaExists } from '@/hooks/useMedia';
import { useAddToWatchlist, useRemoveFromWatchlist } from '@/hooks/useMutations';
import { SavedMedia } from '@/interfaces';
import { FC } from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

interface WatchlistButtonProps {
  /** The record stored when the title is added. */
  media: SavedMedia;
}

const WatchlistButton: FC<WatchlistButtonProps> = ({ media }) => {
  const { data: isSaved, isLoading, isError } = useSavedMediaExists(Number(media.id));
  const { mutate: addToWatchlist, isPending: isAdding } = useAddToWatchlist();
  const { mutate: removeFromWatchlist, isPending: isRemoving } = useRemoveFromWatchlist();

  if (isLoading) {
    return <ActivityIndicator size="small" color="#3b82f6" />;
  }

  const disabled = isError || isAdding || isRemoving;

  return (
    <TouchableOpacity
      className={`rounded-lg border border-gray-400 px-2 ${isSaved ? 'bg-white' : ''}`}
      disabled={disabled}
      hitSlop={8}
      onPress={() => (isSaved ? removeFromWatchlist(String(media.id)) : addToWatchlist(media))}
      accessibilityRole="button"
      accessibilityLabel="Watchlist"
      accessibilityHint={
        isSaved ? 'Removes this title from your watchlist' : 'Adds this title to your watchlist'
      }
      accessibilityState={{ selected: !!isSaved, disabled }}
    >
      <Text className={`text-sm font-light ${isSaved ? 'text-black' : 'text-white'}`}>
        {isSaved ? '✓ Watchlist' : '+ Watchlist'}
      </Text>
    </TouchableOpacity>
  );
};

export default WatchlistButton;
