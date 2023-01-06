import { useRef } from 'react';
import { Editor, SyntheticKeyboardEvent } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, getDefaultKeyBinding, RichUtils } from 'draft-js';
import { Box } from '@mui/material';

type Props = {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
};

export default function TextEditor(props: Props) {
  const { editorState, setEditorState } = props;
  const editor = useRef<Editor>(null);

  function focusEditor() {
    if (editor.current) {
      editor.current.focusEditor();
    }
  }

  const onHandleKeyBindings = (e: SyntheticKeyboardEvent) => {
    if (e.keyCode === 9) {
      setEditorState(RichUtils.onTab(e, editorState, 4));
    } else {
      return getDefaultKeyBinding(e);
    }
  };

  return (
    <Box
      sx={{ borderRadius: '2px', borderColor: '#ddd' }}
      onClick={focusEditor}
    >
      <Editor
        ref={editor}
        editorState={editorState}
        toolbarClassName="toolbarclassName="
        wrapperClassName="wrapperclassName="
        editorClassName="editorclass"
        onEditorStateChange={setEditorState}
        onTab={onHandleKeyBindings}
      />
    </Box>
  );
}
