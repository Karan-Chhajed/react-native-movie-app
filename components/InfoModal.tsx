import { FC } from "react";
import { Modal, View, Text, ScrollView, Pressable, Linking } from "react-native";

interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
}

const InfoModal: FC<InfoModalProps> = ({ visible, onClose }) => {
  const techs = ["TypeScript", "React Native", "TailwindCSS", "Appwrite(BaaS)"];
  const details = [
    { key: "Name", value: "Karan Chhajed" },
    { key: "Email", value: "karan0513c@gmail.com" },
    {
      key: "Title",
      value: "Software Developer / Web Developer / Frontend Developer",
    },
    { key: "Exp", value: "4.5+ Years" },
  ];

  const hitLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.log(err))
  }

  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/70 justify-center items-center">
        <View className="bg-black w-11/12 max-h-[80%] rounded-2xl p-6 border border-white">
          <Pressable
  className="absolute top-3 right-3 z-10 h-6 w-6 border bg-white border-white rounded-full items-center justify-center"
  onPress={onClose}
>
  <Text className="text-black text-sm font-bold">X</Text>
</Pressable>
          <ScrollView showsVerticalScrollIndicator={false} className="py-6">
            <View className="mb-4">
              <Text className="text-white text-lg font-bold">
                Movie Pal - Your entertainment buddy
              </Text>
            </View>

            <View className="mb-4">
              <Text className="text-white font-semibold">Disclaimer</Text>
              <Text className="text-gray-300">
                The project is for the sole purpose of demonstrating a frontend
                project. While this is the first draft of what can be done in
                limited time, I will update it over time. Stay Tuned!
              </Text>
            </View>

            <View className="mb-4">
              <Text className="text-white font-semibold">Tech Used</Text>
              {techs.map((tech, index) => (
                <View key={index} className="flex-row items-start">
                  <Text className="text-white mr-2">•</Text>
                  <Text className="text-gray-300">{tech}</Text>
                </View>
              ))}
            </View>

            <View className="mb-4">
              {details.map((detail, index) => (
                <Text key={index} className="font-semibold text-white">
                  {detail.key}:{" "}
                  <Text className="text-white font-normal">{detail.value}</Text>
                </Text>
              ))}
              <Text className="font-semibold text-white">LinkedIn: <Text className="text-blue-500" onPress={() => hitLink('https://www.linkedin.com/in/karan-chhajed-317853177/')}>Karan Chhajed</Text></Text>
            </View>

            <View>
              <Text className="text-white font-semibold">Project Details</Text>
              <Text className="text-gray-300">
                This is Movie Pal, a project designed to help you keep up to
                date with the latest movies and TV shows.
              </Text>
              
              <Text className="text-gray-300">
                Project link can be found{" "}
             
                    <Text className="text-blue-500" onPress={() => hitLink('https://github.com/Karan-Chhajed/react-native-movie-app')}>here</Text>
                
              </Text>
              
              <Text className="text-gray-300">
                Please leave a review, the project can always be improved.
              </Text>
              <Text className="text-gray-300">
                Drop your details to contact and collaborate.
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default InfoModal;
