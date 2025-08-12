import { ActivityIndicator, FlatList, View, Text } from "react-native"
import HorizontalMediaCardWithLink from "./HorizontalMediaCardWithLink"
import { useSearchedData } from "@/hooks/useMovies"
import { FC } from "react"

export const SearchHistory:FC = () => {

    const { data: prevSearchedData, isLoading: isLoadingPrevData, isError: isErrorPrevData, error: prevDataError } = useSearchedData()

    if(isLoadingPrevData) {
      return(
        <ActivityIndicator size={"large"} color="#3b82f6"/>
      )
    }

    else if(isErrorPrevData) {
      return(
        <View className="flex-1 w-full justify-center items-center">
          <Text>
            Error Loading search data!
          </Text>
        </View>
      )
    }

    return (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={prevSearchedData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HorizontalMediaCardWithLink name={item.title} poster_path={item.posterUrl} id={item.id} overview={item.overview} type={item.media_type} vote_average={item.vote_average} />
          )}
        />
    )
}