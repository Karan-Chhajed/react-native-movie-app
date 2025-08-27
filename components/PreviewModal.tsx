import { useReviewStore } from "@/store/store";
import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import RenderHTML from "react-native-render-html";

interface PreviewModalProps {
  visible: boolean;
  onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ visible, onClose }) => {
  const { name, company, designation, email, linkedin, comments } = useReviewStore();

  const { width } = useWindowDimensions();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/70 justify-center items-center">
        <View className="bg-white w-11/12 rounded-2xl p-6 max-h-[80%]">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="text-2xl font-bold text-center mb-4">Review Preview</Text>

            <Text className="text-lg font-semibold">Name:</Text>
            <Text className="mb-2">{name}</Text>

            <Text className="text-lg font-semibold">Company:</Text>
            <Text className="mb-2">{company}</Text>

            <Text className="text-lg font-semibold">Designation:</Text>
            <Text className="mb-2">{designation}</Text>

            <Text className="text-lg font-semibold">Email:</Text>
            <Text className="mb-2">{email}</Text>

            <Text className="text-lg font-semibold">LinkedIn:</Text>
            <Text className="mb-2">{linkedin}</Text>

            <Text className="text-lg font-semibold">Comments:</Text>
            <RenderHTML contentWidth={width} source={{html: comments || "<p>No Comments!</p>"}}
            
              tagsStyles={{
                b: { fontWeight: "bold" },
                strong: { fontWeight: "bold" },
                i: { fontStyle: "italic" },
                em: { fontStyle: "italic" },
                u: { textDecorationLine: "underline" },
                p: { marginBottom: 8, color: "black", fontSize: 16 },
              }}
            >

            </RenderHTML>
          </ScrollView>

          <TouchableOpacity
            className="bg-red-150 mt-4 py-3 rounded-xl"
            onPress={onClose}
          >
            <Text className="text-white text-center text-lg font-bold">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PreviewModal;
