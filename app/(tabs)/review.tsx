import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useReviewStore } from '@/store/store';
import { useSubmitForData } from '@/hooks/useMutations';

const Review = () => {
  const {
    name,
    company,
    designation,
    email,
    linkedin,
    comments,
    setName,
    setCompany,
    setDesignation,
    setEmail,
    setLinkedin,
    setComments,
  } = useReviewStore();

  const { mutate: submitReview } = useSubmitForData();

  //Could have been done with useState as the form is pretty small, but I wanted to demonstrate Zustand, pretty light!
  //Would use formik if the form was too big.

  return (
    <KeyboardAwareScrollView
      className="bg-black"
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      enableAutomaticScroll={Platform.OS === 'ios'}
      style={{ flexGrow: 1 }}
      extraScrollHeight={30}
    >
      <View className="flex-1 items-center ">
        <Text className="text-4xl font-semibold text-red-150 mt-1">Review !</Text>

        <View className="w-full flex mt-6 gap-y-6 items-center">
          <TextInput
            placeholder="Name"
            className="w-full border rounded-xl border-gray-400 h-14 p-4 text-white"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Company"
            className="w-full border rounded-xl border-gray-400 h-14 p-4 text-white"
            value={company}
            onChangeText={setCompany}
          />
          <TextInput
            placeholder="Designation"
            className="w-full border rounded-xl border-gray-400 h-14 p-4 text-white"
            value={designation}
            onChangeText={setDesignation}
          />
          <TextInput
            placeholder="E-mail"
            className="w-full border rounded-xl border-gray-400 h-14 p-4 text-white"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="LinkedIn Url"
            className="w-full border rounded-xl border-gray-400 h-14 p-4 text-white"
            value={linkedin}
            onChangeText={setLinkedin}
          />
          <TextInput
            placeholder="Leave a comment... or two"
            className="w-full border rounded-xl border-gray-400 h-32 p-4 text-white"
            numberOfLines={8}
            multiline
            value={comments}
            onChangeText={setComments}
          />

          {/**This multiline text input messes up the keyboard aware, solution for this needs to be found */}

          <TouchableOpacity
            className="w-3/4 flex justify-center items-center bg-red-150 h-12 rounded-lg"
            onPress={() =>
              submitReview({
                name: name,
                company: company,
                designation: designation,
                email: email,
                linkedin: linkedin,
                comments: comments,
              })
            }
          >
            <Text className="text-white font-bold text-xl">Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Review;
