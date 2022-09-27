import React from "react";
import useTextEditor from "./useTextEditor";
export const TextEditorContext = React.createContext();
const TextEditorContextProvider = ({ children }) => {
  let { ...editorUtils } = useTextEditor();
  return (
    <TextEditorContext.Provider
      value={{
        ...editorUtils,
      }}
    >
      {children}
    </TextEditorContext.Provider>
  );
};
export default TextEditorContextProvider;
