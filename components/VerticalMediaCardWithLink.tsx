import { Link } from 'expo-router';
import { FC } from 'react';
import VerticalMediaCard from '@/components/VerticalMediaCard';
import { TouchableOpacity } from 'react-native';

interface VerticalMediaCardProps {
  id: number | string;
  title: string;
  release_date?: string;
  overview?: string;
  poster_path?: string;
  vote_average?: number;
  type: string;
}

const VerticalMediaCardWithLink: FC<VerticalMediaCardProps> = ({
  id,
  title,
  release_date,
  vote_average,
  overview,
  poster_path,
  type,
}) => {
  const mediaType = type.toLowerCase();
  // Expo router nuance, Link will only work if if the immediate child is a Pressable or Touchable ! So weird! Will not work if its a different child
  // even though the parent on nested element is Touchable or pressable!
  if (mediaType === 'movie') {
    return (
      <Link href={`/movies/${id}`} asChild className="py-4">
        <TouchableOpacity className="w-28 h-56 flex-1 my-6">
          <VerticalMediaCard
            title={title}
            release_date={release_date}
            vote_average={vote_average}
            overview={overview}
            poster_path={poster_path}
            type={type}
          />
        </TouchableOpacity>
      </Link>
    );
  } else if (mediaType === 'tv') {
    return (
      <Link href={`/tv/${id}`} asChild className="py-4">
        <TouchableOpacity className="w-28 h-56 flex-1 my-6">
          <VerticalMediaCard
            title={title}
            poster_path={poster_path}
            vote_average={vote_average}
            type={type}
            overview={overview}
          />
        </TouchableOpacity>
      </Link>
    );
  }
};

export default VerticalMediaCardWithLink;
