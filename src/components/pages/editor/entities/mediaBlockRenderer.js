import React from "react";
export const mediaBlockRenderer = (block) => {
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
};

const Image = (props) => {
  if (!!props.src) {
    return <img src={props.src} alt="..." />;
  }
  return null;
};
const Link = (props) => {
  if (!!props.href) {
    return (
      <a
        href={props.href}
        title={props.linkText}
        target="_blank"
        rel="noreferrer"
      >
        {props.linkText}
      </a>
    );
  }
  return null;
};

const Media = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src, href, linkText } = entity.getData();
  const type = entity.getType();

  let media;

  if (type === "image") {
    media = <Image src={src} />;
  }
  if (type === "link") {
    media = <Link href={href} linkText={linkText} />;
  }
  if (type === "divider") {
    media = <hr className="dark:border-gray-700 my-2"></hr>;
  }

  return media;
};
