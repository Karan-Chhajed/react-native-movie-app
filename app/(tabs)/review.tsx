import FormField from '@/components/FormField';
import PreviewModal from '@/components/PreviewModal';
import Richtext from '@/components/RichText';
import { useSubmitForData } from '@/hooks/useMutations';
import { useReviewStore } from '@/store/store';
import { useState } from 'react';
import { ActivityIndicator, Platform, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

const Review = () => {
  const {
    name,
    company,
    designation,
    email,
    linkedin,
    comments,
    errors,
    setName,
    setCompany,
    setDesignation,
    setEmail,
    setLinkedin,
  } = useReviewStore();

  const { mutate: submitReview, isPending } = useSubmitForData();
  const [previewVisible, setPreviewVisible] = useState(false);

  //Could have been done with useState as the form is pretty small, but I wanted to demonstrate Zustand, pretty light!
  //Would use formik if the form was too big.

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-black">
      <View className="w-full flex items-center justify-center">
        <Text
          className="text-4xl font-semibold text-red-150 portrait:mt-4"
          accessibilityRole="header"
        >
          Review !
        </Text>
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
          <View className="w-full flex mt-6 gap-y-4 items-center">
            <FormField
              label="Name"
              placeholder="Your name"
              value={name}
              onChangeText={setName}
              error={errors.name}
              autoCapitalize="words"
              autoComplete="name"
              textContentType="name"
            />
            <FormField
              label="Company"
              placeholder="Where you work"
              value={company}
              onChangeText={setCompany}
              error={errors.company}
              textContentType="organizationName"
            />
            <FormField
              label="Designation"
              placeholder="Your role"
              value={designation}
              onChangeText={setDesignation}
              error={errors.designation}
              textContentType="jobTitle"
            />
            <FormField
              label="E-mail"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
            />
            <FormField
              label="LinkedIn URL"
              placeholder="https://linkedin.com/in/…"
              value={linkedin}
              onChangeText={setLinkedin}
              error={errors.linkedin}
              optional
              keyboardType="url"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="URL"
            />

            <Richtext />
            <View className="flex flex-row items-center justify-center gap-x-4 w-full mb-6">
              <TouchableOpacity
                className={`w-2/5 flex justify-center items-center bg-red-150 h-12 rounded-lg ${isPending ? 'opacity-60' : ''}`}
                disabled={isPending}
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
                accessibilityRole="button"
                accessibilityLabel="Submit"
                accessibilityState={{ disabled: isPending, busy: isPending }}
              >
                {isPending ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-bold text-xl">Submit</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                className="w-2/5 flex justify-center items-center bg-red-150 h-12 rounded-lg"
                onPress={() => setPreviewVisible(true)}
                accessibilityRole="button"
              >
                <Text className="text-white font-bold text-xl">Preview</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <PreviewModal visible={previewVisible} onClose={() => setPreviewVisible(false)} />
    </SafeAreaView>
  );
};

export default Review;
