import path, { dirname } from "path";

export const projectPath = path.join(__dirname); //this constant points to the current code folder either src or dist
export const publicDirectory = path.join(__dirname, "../public");
export const allowedImageExtensions = ["png", "jpeg", "jpg"]; // allowedfiles that pass the validation of the uploaded inages
export const allowedFileTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
]; // for more security, the types that comes with the image
export const allowedImageSize = 5; // in MBs
