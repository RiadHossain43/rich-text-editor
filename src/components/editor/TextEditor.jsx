import "draft-js/dist/Draft.css";
import React from "react";
import { Editor } from "draft-js";
import { TextEditorContext } from "./Context";
import { editorMediaBlockRenderer } from "./entities/editorMediaBlockRenderer";
export default function TextEditor({ readOnly = false, ...props }) {
  const {
    editorState,
    handleEditorStateChange,
    handleDroppedFiles,
    handlePastedFiles,
    handleKeyCommand,
  } = React.useContext(TextEditorContext);
  return (
    <>
      <Editor
      
        blockRendererFn={editorMediaBlockRenderer}
        placeholder={props.placeholder}
        onChange={handleEditorStateChange}
        editorState={editorState}
        spellCheck={true}
        handleKeyCommand={handleKeyCommand}
        handleDroppedFiles={handleDroppedFiles}
        handlePastedFiles={handlePastedFiles}
        readOnly={readOnly}
      />
    </>
  );
}
