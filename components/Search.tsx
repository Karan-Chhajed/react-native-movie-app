import { Button } from "@react-navigation/elements";
import React, { FC } from "react";
import {View, Image, TextInput} from "react-native";

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const SearchBar:FC<SearchBarProps> = ({ value, onChangeText, onFocus, onBlur}) => {
  return (
    <View className="flex flex-row items-center justify-center bg-slate-400 p-2 rounded-lg w-full flex-1">
        <Image source={require('../assets/images/search.png')}
            tintColor="#3b82f6" style={{width: 30, height: 30}}/>
        <TextInput
            placeholder="Search for movies..."
            className="rounded-lg p-2 min-h-14"
            style={{width: '80%', marginLeft: 10}}
            // onPress={onPress}
            value={value}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur = {onBlur}
            />
    </View>
  );
}

export default SearchBar;