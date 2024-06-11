const imgFileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];

function validImgFileType(file) {
  return imgFileTypes.includes(file.type);
}

export { validImgFileType, imgFileTypes };
