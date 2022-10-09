import React from "react";
import {
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from "draft-js";
import { ELEMENT_TYPES } from "./elementTypes";
import { checkFileSize } from "utils/fileCheckers";
import { ENTITY_NAME } from "./entities/entityNames";

export default function useTextEditor(config) {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const [activeTools, setActiveTools] = React.useState({});
  /**
   * the following effect block handles if the component is being
   * controlled by outside values.
   */
  const handleEditorStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    setEditorState(editorState);
    config.onDataStructureChange(JSON.stringify(convertToRaw(contentState)));
  };
  React.useEffect(() => {
    let currentContent;
    try {
      if (typeof config.value === "string") {
        currentContent = JSON.parse(config.value);
      }
      if (typeof config.value === "object") {
        currentContent = config.value;
      }
    } catch (err) {
      console.log(err);
      /**
       * here we are handling if the content parsing failes because if preexisting
       * plain text, we are converting that into a draft data structure for future
       * this is usefull for handling legacy data or automatic migration to draft data
       * structure
       */
      if (typeof config.value === "string")
        return handleEditorStateChange(
          EditorState.createWithContent(
            ContentState.createFromText(config.value)
          )
        );
    }
    if (config.value || currentContent)
      return handleEditorStateChange(
        EditorState.set(editorState, {
          currentContent: convertFromRaw(currentContent),
        })
      );
    return handleEditorStateChange(EditorState.createEmpty());
  }, [config.value]);
  const fileInput = React.useRef(null);
  const _toggleActiveTool = (style) => {
    if (activeTools[style])
      setActiveTools((currenActivated) => {
        delete currenActivated[style];
        return currenActivated;
      });
    else
      setActiveTools((currenActivated) => {
        currenActivated[style] = true;
        return currenActivated;
      });
  };
  const _openFilePrompt = () => fileInput.current.click();
  const _createEntity = (command, data) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      command,
      "IMMUTABLE",
      { ...data }
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
  /**
   * this function allows this component user to define own link generator.
   * usefull if someone wants to preprocess a file through a backend before
   * using as am image src or achor href
   * @param {*} metaData
   * @returns {Promise}
   */
  const generateLink = async (metaData) => {
    if (!config.linkGeneratorFn || typeof config.linkGeneratorFn !== "function")
      return null;
    return config.linkGeneratorFn(metaData);
  };

  const handleKeyCommand = (command, editorState) => {
    let newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleEditorStateChange(newState);
      return "handled";
    }
    return "not-handled";
  };
  const _handleFiles = async (files) => {
    if (!config.handleUpload)
      return console.log("Uploader function not specified");
    let areImages = files.every((file) => file.type.split("/")[0] === "image");
    if (!files.every((file) => checkFileSize(file)))
      return console.log("one or mutiple files exceed the limit");
    if (!areImages) return console.log("All files has to be images");
    try {
      let storageInformations = await Promise.all(
        files.map((file) => config.handleUpload(file))
      );
      console.log(storageInformations);
      if (!storageInformations.every((storageInfo) => storageInfo))
        console.log("one or mutiple files don't have storage info");
      storageInformations.map((storageInfo) =>
        _createEntity(ENTITY_NAME.IMAGE, {
          storageInfo,
        })
      );
    } catch (err) {
      return console.log(err);
    }
  };
  const _handleFileInputChange = (e) => {
    e.preventDefault();
    let files = e.target.files;
    _handleFiles(Array.from(files));
  };
  const getFileInputProps = () => ({
    ref: fileInput,
    onChange: _handleFileInputChange,
  });
  const _atomicEntityController = {
    [ENTITY_NAME.IMAGE]: _openFilePrompt,
    [ENTITY_NAME.LINK]: () => {
      let link = window.prompt("Paste the link bellow:");
      let linkText = window.prompt("Paste the link-text bellow:");
      _createEntity(ENTITY_NAME.LINK, { href: link, linkText });
    },
    [ENTITY_NAME.DIVIDER]: () => _createEntity(ENTITY_NAME.DIVIDER, {}),
    [ENTITY_NAME.MENTION]: () => {},
    [ENTITY_NAME.CHECKLIST]: () => {
      _createEntity(ENTITY_NAME.CHECKLIST, {});
    },
  };
  const _buttonHandlers = {
    [ELEMENT_TYPES.INLINE_DEFAULT]: (command) =>
      handleEditorStateChange(
        RichUtils.toggleInlineStyle(editorState, command)
      ),
    [ELEMENT_TYPES.BLOCK_DEFAULT]: (command) =>
      handleEditorStateChange(RichUtils.toggleBlockType(editorState, command)),
    [ELEMENT_TYPES.ATOMIC_ENTITY]: (command) => {
      _atomicEntityController[command]();
    },
  };
  const handleToolClick = (tool) => {
    if (false) _toggleActiveTool(tool.style);
    if (!tool?.element) return null;
    _buttonHandlers[tool.element](tool.style);
  };
  const handleDroppedFiles = (selection, files) => _handleFiles(files);
  const handlePastedFiles = (files) => _handleFiles(files);
  return {
    activeTools,
    editorState,
    getFileInputProps,
    generateLink,
    handleDroppedFiles,
    handlePastedFiles,
    handleEditorStateChange,
    handleKeyCommand,
    handleToolClick,
  };
}
