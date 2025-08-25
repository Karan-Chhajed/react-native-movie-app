import React, { FC } from 'react';
import { View, Image, TextInput } from 'react-native';

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const SearchBar: FC<SearchBarProps> = ({ value, onChangeText, onFocus, onBlur }) => {
  return (
    <View className="flex flex-row items-center justify-center bg-white p-2 rounded-lg w-full flex-1">
      <Image
        source={require('../assets/images/search.png')}
        tintColor="red"
        style={{ width: 30, height: 30 }}
      />
      <TextInput
        placeholder="Search for movies..."
        placeholderTextColor={'gray'}
        className="rounded-lg p-2 min-h-14 text-black"
        style={{ width: '80%', marginLeft: 10 }}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </View>
  );
};

export default SearchBar;
