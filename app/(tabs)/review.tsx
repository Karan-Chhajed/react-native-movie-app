import PreviewModal from '@/components/PreviewModal';
import Richtext from '@/components/RichText';
import { useSubmitForData } from '@/hooks/useMutations';
import { useReviewStore } from '@/store/store';
import { useState } from 'react';
import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
  } = useReviewStore();

  const { mutate: submitReview } = useSubmitForData();
  const [previewVisible, setPreviewVisible] = useState(false);

  //Could have been done with useState as the form is pretty small, but I wanted to demonstrate Zustand, pretty light!
  //Would use formik if the form was too big.

  return (
    <View className='flex-1'>
      <View className='w-full bg-black flex items-center justify-center'>
      <Text className="text-4xl font-semibold text-red-150 portrait:mt-10">Review !</Text>
      </View>

    <KeyboardAwareScrollView
      className="bg-black"
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      enableAutomaticScroll={Platform.OS === 'ios'}
      style={{ flex: 1 }}
      extraScrollHeight={30}
    >
      <View className="flex-1 items-center landscape:px-14 px-6">
        

        <View className="w-full flex mt-6 gap-y-6 items-center">
          <TextInput
            placeholder="Name"
            className="w-full border rounded-xl border-gray-400 h-14 p-4 text-white"
            value={name}
            onChangeText={setName}
            placeholderTextColor={'gray'}
          />
          <TextInput
            placeholder="Company"
            className="w-full border rounded-xl border-gray-400 h-14 p-4 text-white"
            value={company}
            onChangeText={setCompany}
            placeholderTextColor={'gray'}
          />
          <TextInput
            placeholder="Designation"
            className="w-full border rounded-xl border-gray-400 h-14 p-4 text-white"
            value={designation}
            onChangeText={setDesignation}
            placeholderTextColor={'gray'}
          />
          <TextInput
            placeholder="E-mail"
            className="w-full border rounded-xl border-gray-400 h-14 p-4 text-white"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={'gray'}
          />
          <TextInput
            placeholder="LinkedIn Url"
            className="w-full border rounded-xl border-gray-400 h-14 p-4 text-white"
            value={linkedin}
            onChangeText={setLinkedin}
            placeholderTextColor={'gray'}
          />

          <Richtext />
          <View className='flex flex-row items-center justify-center gap-x-4 w-full'>
          <TouchableOpacity
            className="w-2/5 flex justify-center items-center bg-red-150 h-12 rounded-lg"
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
          <TouchableOpacity
            className="w-2/5 flex justify-center items-center bg-red-150 h-12 rounded-lg"
            onPress={() => setPreviewVisible(true)}
          >
            <Text className="text-white font-bold text-xl">Preview</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
     <PreviewModal
        visible={previewVisible}
        onClose={() => setPreviewVisible(false)}
      />
    </View>
  );
};

export default Review;
