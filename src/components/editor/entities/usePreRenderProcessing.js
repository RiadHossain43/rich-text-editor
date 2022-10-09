import React from "react";
import noImagePlaceHolder from "assets/img/no-image-placeholder.png";
export default function usePreRenderProcessing(config) {
  let [link, setLink] = React.useState(config.src);
  React.useEffect(() => {
    async function _prepareSource() {
      /**
       * we are trying to generate the link with some meta data as a second step
       * if src is not provided. if the data can't generate link it will render
       * the empty placeholder. this feature is usefull if someone wants to generate
       * image src/link based on runtime thorugh a backend server.
       */
      if (!config.src && config.storageInfo) {
        try {
          if (!config.generateLink || typeof config.generateLink !== "function")
            throw Error("link gnerator function must be supplied");
          let link = await config.generateLink(config.storageInfo);
          if (!link)
            throw new Error(
              "link generator function must return a valid link or else provide a valid  image source"
            );
          setLink(link);
        } catch (err) {
          setLink(noImagePlaceHolder);
          console.log(err);
        }
      }
    }
    _prepareSource();
    return () => {};
  }, [config]);
  return {
    link,
  };
}
