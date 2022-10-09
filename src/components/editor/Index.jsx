import React from "react";
import TextEditor from "./TextEditor";
import TextEditorContextProvider from "./Context";
import ToolBar from "./Toolbar";
export default function Index(props) {
  return (
    <TextEditorContextProvider>
      <div className="sm:container sm:mx-auto px-5">
        <div className="my-1 py-2 border-b dark:border-gray-700 border-gray-200">
          <ToolBar />
        </div>
        <div className="border-b dark:border-gray-700  mb-5 p-5">
          <TextEditor placeholder="Lets create something amzing today..." />
        </div>
      </div>
    </TextEditorContextProvider>
  );
}
