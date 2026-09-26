import { useReviewStore } from '@/store/store';
import { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

const Richtext = () => {
  const richText = useRef<RichEditor>(null);

  const comments = useReviewStore((state) => state.comments);
  const setComments = useReviewStore((state) => state.setComments);

  // The editor is a WebView and keeps its own content, so clear it when the store is reset.
  useEffect(() => {
    if (richText.current && comments === '') {
      richText.current.setContentHTML('');
    }
  }, [comments]);

  return (
    <View className="w-full gap-y-1">
      <Text className="text-sm text-gray-300">
        Comments<Text className="text-gray-400"> (optional)</Text>
      </Text>
      <RichEditor
        ref={richText}
        placeholder="Your Comments here..."
        initialContentHTML={comments}
        onChange={setComments}
        editorStyle={{ contentCSSText: 'min-height: 160px' }}
      />
      <RichToolbar
        editor={richText}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.heading1,
          actions.heading2,
          actions.insertLink,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.undo,
          actions.redo,
        ]}
      />
    </View>
  );
};

export default Richtext;
