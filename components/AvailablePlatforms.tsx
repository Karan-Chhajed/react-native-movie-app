import { ProviderData } from "@/interfaces";
import { FC } from "react";
import { View, Text, Image } from "react-native";

interface AvailablePlatformsProps {
  title: string;
  platformData: ProviderData[];
}

export const AvailablePlatforms: FC<AvailablePlatformsProps> = ({
  title,
  platformData,
}) => {
  return (
    <View className="flex flex-row my-2 items-center justify-start w-full gap-x-3">
      <Text className="text-sm font-medium text-white">{title}</Text>
      {platformData.map(
        (item: { provider_name: string; logo_path: string }, index: number) => (
          <View key={index}>
            <Image
              source={{
                uri: item.logo_path
                  ? `https://image.tmdb.org/t/p/w500${item.logo_path}`
                  : "https://via.placeholder.com/150",
              }}
              className="w-7 h-7 rounded-full"
              resizeMode="contain"
            />
          </View>
        )
      )}
    </View>
  );
};
