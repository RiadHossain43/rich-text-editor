import React from "react";
import Image from "./Image";
import Link from "./Link";
import Divider from "./Divider";
export const mediaBlockRenderer = (block) => {
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: false,
    };
  }
  return null;
};
const Media = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const type = entity.getType();
  let media;
  if (type === "image") {
    media = <Image {...entity.getData()} />;
  }
  if (type === "link") {
    media = <Link {...entity.getData()} />;
  }
  if (type === "divider") {
    media = <Divider {...entity.getData()} />;
  }
  return media;
};
