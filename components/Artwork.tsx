import { FC } from 'react';
import { Image, ImageResizeMode, View } from 'react-native';

interface ArtworkProps {
  uri?: string;
  className?: string;
  /** Posters fill their frame; logos should use `contain` so wide marks aren't cropped. */
  resizeMode?: ImageResizeMode;
}

/** TMDB poster or logo, with a neutral block in its place when TMDB has none. */
const Artwork: FC<ArtworkProps> = ({ uri, className = '', resizeMode = 'cover' }) =>
  uri ? (
    <Image source={{ uri }} className={className} resizeMode={resizeMode} />
  ) : (
    <View className={`bg-gray-800 ${className}`} />
  );

export default Artwork;
