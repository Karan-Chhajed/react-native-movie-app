import { FC } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type FormFieldProps = TextInputProps & {
  label: string;
  error?: string;
  optional?: boolean;
};

/** Labelled text input matching the review form's styling, with an inline validation message. */
const FormField: FC<FormFieldProps> = ({ label, error, optional, ...inputProps }) => (
  <View className="w-full gap-y-1">
    <Text className="text-sm text-gray-300">
      {label}
      {optional ? <Text className="text-gray-400"> (optional)</Text> : null}
    </Text>
    <TextInput
      className={`w-full border rounded-xl h-14 p-4 text-white ${error ? 'border-red-150' : 'border-gray-400'}`}
      placeholderTextColor="gray"
      accessibilityLabel={error ? `${label}, ${error}` : label}
      {...inputProps}
    />
    {error ? <Text className="text-sm text-red-150">{error}</Text> : null}
  </View>
);

export default FormField;
