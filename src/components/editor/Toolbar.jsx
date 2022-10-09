import React from "react";
import { TextEditorContext } from "./Context";
import toolTypes from "./toolTypes";
import ButtonSeparator from "./ButtonSeparator";
import FilePicker from "./FilePicker";
export default function ToolBar(props) {
  const { getFileInputProps, handleToolClick } =
    React.useContext(TextEditorContext);
  return (
    <>
      <FilePicker {...getFileInputProps()} />
      {Object.keys(toolTypes).map((type, index) => {
        return (
          <React.Fragment key={type}>
            {toolTypes[type]?.map((tool) => {
              return (
                <button
                  className={
                    "text-gray-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 mx-1 rounded-md "
                  }
                  type="button"
                  key={tool?.style}
                  onClick={(e) => handleToolClick(tool)}
                >
                  {tool.icon ? <i className={tool.icon} /> : tool?.label}
                </button>
              );
            })}
            {index < Object.keys(toolTypes).length - 1 && <ButtonSeparator />}
          </React.Fragment>
        );
      })}
    </>
  );
}
