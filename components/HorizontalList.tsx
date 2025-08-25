import { Movie, TvSeries } from "@/interfaces";
import { View, FlatList, Text } from "react-native";
import { FC } from "react";
import VerticalMediaCardWithLink from "./VerticalMediaCardWithLink";

type MediaData = Movie | TvSeries;

interface HorizontalListProps {
  mediaData: MediaData[];
  listTitle: string;
  type: string;
}

const HorizontalList: FC<HorizontalListProps> = ({
  mediaData,
  listTitle,
  type,
}) => {
  return (
    <View className="my-2">
      <Text className="px-2 font-semibold text-lg text-white">{listTitle}</Text>
      <FlatList
        data={mediaData}
        horizontal
        keyExtractor={(movie) => movie.id.toString()}
        renderItem={({ item }) => (
          <VerticalMediaCardWithLink
            id={item.id}
            title={"title" in item ? item.title : item.name}
            poster_path={item.poster_path}
            vote_average={item.vote_average}
            release_date={
              "release_date" in item ? item.release_date : item.first_air_date
            }
            type={type}
          />
        )}
        contentContainerClassName="flex flex-row gap-x-4 px-2"
        ItemSeparatorComponent={() => <View className="w-4" />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default HorizontalList;
