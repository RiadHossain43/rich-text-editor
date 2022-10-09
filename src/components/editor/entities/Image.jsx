import React from "react";
export default function Image(props) {
  if (props.src || props.link) {
    return (
      <img
        /**
         * the follwoing inline style will be removed because we will introduce a aligner
         * component
         */
        style={{ maxWidth: 300 }}
        src={props.src || props.link}
        alt={props.alt || props.storageInfo?.Key || "..."}
      />
    );
  }
  return null;
}
