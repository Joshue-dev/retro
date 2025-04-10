export const removeFileExtension = (fileName) => {
  return fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
};
