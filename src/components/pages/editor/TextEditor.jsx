import React from "react";
import {
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  convertToRaw,
} from "draft-js";
import Editor from "@draft-js-plugins/editor";
import "draft-js/dist/Draft.css";
import { mediaBlockRenderer } from "./entities/mediaBlockRenderer";
import { ButtonSeparator } from "./ButtonSperator";
export const TextEditor = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleEditorStateChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    const urlValue = window.prompt("Paste Image Link");
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "image",
      "IMMUTABLE",
      { src: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
      "create-entity"
    );
    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
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
    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
  };
  const handleDeviderClick = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "divider",
      "IMMUTABLE"
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
      "create-entity"
    );
    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
  };

  const handleUnderlineClick = () => {
    handleEditorStateChange(
      RichUtils.toggleInlineStyle(editorState, "UNDERLINE")
    );
  };

  const handleBoldClick = () => {
    handleEditorStateChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const handleH1Click = () => {
    handleEditorStateChange(
      RichUtils.toggleBlockType(editorState, "header-one")
    );
  };

  const handleH2Click = () => {
    handleEditorStateChange(
      RichUtils.toggleBlockType(editorState, "header-two")
    );
  };
  const handleH3Click = () => {
    handleEditorStateChange(
      RichUtils.toggleBlockType(editorState, "header-three")
    );
  };

  const handleItalicClick = () => {
    handleEditorStateChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const handleUnorderedListClick = () => {
    handleEditorStateChange(
      RichUtils.toggleBlockType(editorState, "unordered-list-item")
    );
  };

  const handleBlockquoteClick = () => {
    handleEditorStateChange(
      RichUtils.toggleBlockType(editorState, "blockquote")
    );
  };

  const handleCodeBlockClick = () => {
    handleEditorStateChange(
      RichUtils.toggleBlockType(editorState, "code-block")
    );
  };

  const handleOrderedListClick = () => {
    handleEditorStateChange(
      RichUtils.toggleBlockType(editorState, "ordered-list-item")
    );
  };

  const convertDataForSaving = () => {
    let contentState = editorState.getCurrentContent();
    let note = { content: convertToRaw(contentState) };
    note["content"] = JSON.stringify(note.content);
  };

  return (
    <div className="sm:container sm:mx-auto px-5">
      <div className="my-5 py-2 border-b dark:border-gray-700 border-gray-200">
        <button
          className="text-gray-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 mx-1 rounded-md"
          onClick={handleUnderlineClick}
        >
          <i className="fa-solid fa-underline"></i>
        </button>
        <button
          className="text-gray-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 mx-1 rounded-md"
          onClick={handleBoldClick}
        >
          <i className="fa-solid fa-bold"></i>
        </button>
        <button
          className="text-gray-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 mx-1 rounded-md"
          onClick={handleItalicClick}
        >
          <i className="fa-solid fa-italic"></i>
        </button>
        <ButtonSeparator />
        <button
          className="text-gray-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 mx-1 rounded-md"
          onClick={handleH1Click}
        >
          H1
        </button>
        <button
          className="text-gray-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 mx-1 rounded-md"
          onClick={handleH2Click}
        >
          H2
        </button>
        <button
          className="text-gray-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 mx-1 rounded-md"
          onClick={handleH3Click}
        >
          H3
        </button>
        <ButtonSeparator />
        <button
          className="text-gray-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 mx-1 rounded-md"
          onClick={handleUnorderedListClick}
        >
          <i className="fa-solid fa-list"></i>
        </button>
        <button
          className="text-gray-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 mx-1 rounded-md"
          onClick={handleOrderedListClick}
        >
          <i className="fa-solid fa-list-ol"></i>
        </button>
        <ButtonSeparator />
        <button
          className="text-gray-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 mx-1 rounded-md"
          onClick={handleAddImage}
        >
          <i className="fa-solid fa-images"></i>
        </button>
        <button
          className="text-gray-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 mx-1 rounded-md"
          onClick={handleAddLink}
        >
          <i className="fa-solid fa-link"></i>
        </button>
        <ButtonSeparator />
        <button
          className="text-gray-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 mx-1 rounded-md"
          onClick={handleCodeBlockClick}
        >
          <i className="fa-solid fa-code"></i>
        </button>
        <button
          className="text-gray-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 mx-1 rounded-md"
          onClick={handleBlockquoteClick}
        >
          <i className="fa-solid fa-quote-left"></i>
        </button>
        <button
          className="text-gray-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 mx-1 rounded-md"
          onClick={handleDeviderClick}
        >
          ---
        </button>
      </div>
      <div className="border-b dark:border-gray-700  mb-5 p-5">
        <Editor
          blockRendererFn={mediaBlockRenderer}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={handleEditorStateChange}
          
        />
      </div>
      <button
        className="text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 mx-1 rounded-md"
        onClick={convertDataForSaving}
      >
        Convert <i className="fa-solid fa-right-long"></i>
      </button>
    </div>
  );
};
