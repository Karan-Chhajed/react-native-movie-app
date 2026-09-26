import React, { FC } from 'react';
import { View, Image, TextInput, TextInputProps } from 'react-native';

type SearchBarProps = Pick<TextInputProps, 'onFocus' | 'onBlur' | 'placeholder'> & {
  value: string;
  onChangeText: (text: string) => void;
};

const SearchBar: FC<SearchBarProps> = ({
  value,
  onChangeText,
  onFocus,
  onBlur,
  placeholder = 'Search for movies...',
}) => {
  return (
    <View className="flex flex-row items-center justify-center bg-white p-2 rounded-lg w-full flex-1">
      <Image
        source={require('../assets/images/search.png')}
        tintColor="red"
        style={{ width: 30, height: 30 }}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#6b7280"
        className="flex-1 ml-2.5 rounded-lg p-2 min-h-14 text-black"
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        accessibilityLabel="Search"
        returnKeyType="search"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
  );
};

export default SearchBar;
