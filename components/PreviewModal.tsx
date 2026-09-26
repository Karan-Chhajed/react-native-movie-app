import { useReviewStore } from '@/store/store';
import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import RenderHTML from 'react-native-render-html';
import { useShallow } from 'zustand/react/shallow';

interface PreviewModalProps {
  visible: boolean;
  onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ visible, onClose }) => {
  const { name, company, designation, email, linkedin, comments } = useReviewStore(
    useShallow(({ name, company, designation, email, linkedin, comments }) => ({
      name,
      company,
      designation,
      email,
      linkedin,
      comments,
    })),
  );

  const { width } = useWindowDimensions();
  const reduceMotion = useReducedMotion();

  const fields = [
    { label: 'Name', value: name },
    { label: 'Company', value: company },
    { label: 'Designation', value: designation },
    { label: 'Email', value: email },
    { label: 'LinkedIn', value: linkedin },
  ];

  return (
    <Modal
      visible={visible}
      animationType={reduceMotion ? 'none' : 'slide'}
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/70 justify-center items-center">
        <View className="bg-white w-11/12 rounded-2xl p-6 max-h-[80%]">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="text-2xl font-bold text-center mb-4" accessibilityRole="header">
              Review Preview
            </Text>

            {fields.map(({ label, value }) => (
              <View key={label}>
                <Text className="text-lg font-semibold">{label}:</Text>
                <Text className="mb-2">{value || '—'}</Text>
              </View>
            ))}

            <Text className="text-lg font-semibold">Comments:</Text>
            <RenderHTML
              // Matches the card: 11/12 of the screen minus the p-6 padding on both sides.
              contentWidth={(width * 11) / 12 - 48}
              source={{ html: comments || '<p>No Comments!</p>' }}
              tagsStyles={{
                b: { fontWeight: 'bold' },
                strong: { fontWeight: 'bold' },
                i: { fontStyle: 'italic' },
                em: { fontStyle: 'italic' },
                u: { textDecorationLine: 'underline' },
                p: { marginBottom: 8, color: 'black', fontSize: 16 },
              }}
            />
          </ScrollView>

          <TouchableOpacity
            className="bg-red-150 mt-4 py-3 rounded-xl"
            onPress={onClose}
            accessibilityRole="button"
          >
            <Text className="text-white text-center text-lg font-bold">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PreviewModal;
