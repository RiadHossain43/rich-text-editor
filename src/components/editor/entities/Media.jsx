import React from "react";
import Image from "./Image";
import Link from "./Link";
import Divider from "./Divider";
import CheckListItem from "./CheckListItem";
import { ENTITY_NAME } from "./entityNames";

export default function Media({ type, data }) {
  let media = <></>;
  if (type === ENTITY_NAME.IMAGE) {
    media = <Image {...data} />;
  }
  if (type === ENTITY_NAME.LINK) {
    media = <Link {...data} />;
  }
  if (type === ENTITY_NAME.DIVIDER) {
    media = <Divider {...data} />;
  }
  if (type === ENTITY_NAME.CHECKLIST) {
    media = <CheckListItem {...data} />;
  }
  return media;
}
