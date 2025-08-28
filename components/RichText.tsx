import { useReviewStore } from "@/store/store"
import { useEffect, useRef } from "react"
import { View } from "react-native"
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'

const Richtext = () => {
    const richText = useRef<RichEditor>(null)

    const {comments, setComments, errors} = useReviewStore()

    useEffect(() => {
        if(richText.current && comments === '') {
            richText.current.setContentHTML("")
        }
    }, [comments])
    // richtext is webview and hence doesnt automatically change content state on zustand reset, so I call it again and set it to blank using content Html 

    return(
        <View className="w-full">
            <RichEditor ref={richText} placeholder="Your Comments here..." initialContentHTML={comments} onChange={setComments} editorStyle={{contentCSSText: "min-height: 160px"}}/>
            <RichToolbar editor={richText}
                actions = {[
                    actions.setBold,
                    actions.setItalic,
                    actions.setUnderline,
                    actions.heading1,
                    actions.heading2,
                    actions.insertLink,
                    actions.insertImage,
                    actions.insertBulletsList,
                    actions.insertOrderedList,
                    actions.undo,
                    actions.redo
                ]}
            />
        </View>
    )
}

export default Richtext