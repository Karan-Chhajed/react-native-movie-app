import { Movie } from "@/interfaces"
import {View, FlatList } from "react-native"
import { MovieCard } from "./MovieCard"
import { FC } from "react"

interface HorizontalListProps {
    mediaData: Movie[]
}

const HorizontalList:FC<HorizontalListProps> = ({mediaData}) => {
    return (
        <View>
            <FlatList data={mediaData}
                      horizontal
                      keyExtractor={(movie, index) => movie.id.toString()}
                      renderItem={({item, index}) => (
                        <MovieCard id={index} title={item.title} poster_path={item.poster_path}/>
                      )}
                      contentContainerClassName="flex flex-row gap-x-4 px-2"
                      ItemSeparatorComponent={() => <View className="w-4" />}
                      showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}