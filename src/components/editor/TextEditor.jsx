import React from "react";
import { Editor } from "draft-js";
import { TextEditorContext } from "./Context";
import "draft-js/dist/Draft.css";

export default function TextEditor(props) {
  const { editorState, handleEditorStateChange, handleKeyCommand } =
    React.useContext(TextEditorContext);

  return (
    <Editor
      blockRendererFn={() => {}}
      placeholder={props.placeholder}
      onChange={handleEditorStateChange}
      editorState={editorState}
      spellCheck={true}
      handleKeyCommand={handleKeyCommand}
    />
  );
}
