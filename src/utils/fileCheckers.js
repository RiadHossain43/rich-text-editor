
export const checkFileSize = (file, sizeLimit = 2500000) => {
  if (file.size > sizeLimit) {
    console.log("file size limit exeeded");
    return false;
  }
  return true;
};
