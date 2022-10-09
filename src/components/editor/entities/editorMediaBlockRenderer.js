import React, { useContext } from "react";
import usePreRenderProcessing from "./usePreRenderProcessing";
import { TextEditorContext } from "../Context";
import Media from "./Media";
export const editorMediaBlockRenderer = (block) => {
  if (block.getType() === "atomic") {
    return {
      component: ProcessedMedia,
      editable: false,
    };
  }
  return null;
};
const ProcessedMedia = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const type = entity.getType();
  const { generateLink } = useContext(TextEditorContext);
  let processedResults = usePreRenderProcessing({
    generateLink,
    ...entity.getData(),
  });
  return (
    <Media
      type={type}
      data={{
        ...entity.getData(),
        ...processedResults,
      }}
    />
  );
};
