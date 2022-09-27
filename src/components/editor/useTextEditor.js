import React from "react";
import { EditorState, RichUtils, AtomicBlockUtils } from "draft-js";
import { ELEMENT_TYPES } from "./elementTypes";
export default function useTextEditor() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const [activeTools, setActiveTools] = React.useState({});
  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    const urlValue = window.prompt("Paste Link");
    const linkText = window.prompt("Paste Link Text");
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "link",
      "IMMUTABLE",
      { href: urlValue, linkText }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
      "create-entity"
    );
    handleEditorStateChange(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
  };
  const handleKeyCommand = (command, editorState) => {
    let newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleEditorStateChange(newState);
      return "handled";
    }
    return "not-handled";
  };
  const _buttonHandlers = {
    [ELEMENT_TYPES.INLINE_DEFAULT]: (command) =>
      handleEditorStateChange(
        RichUtils.toggleInlineStyle(editorState, command)
      ),
    [ELEMENT_TYPES.BLOCK_DEFAULT]: (command) =>
      handleEditorStateChange(RichUtils.toggleBlockType(editorState, command)),
    [ELEMENT_TYPES.BLOCK_ENTITY]: (command) => {},
  };
  const handleToolClick = (tool) => {
    if (!tool?.element) return null;
    _buttonHandlers[tool.element](tool.style);
  };
  return {
    activeTools,
    editorState,
    handleEditorStateChange,
    handleKeyCommand,
    handleToolClick,
  };
}
