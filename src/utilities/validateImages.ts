import { Request, Response } from "express";
import {
  allowedImageExtensions,
  allowedFileTypes,
  allowedImageSize,
} from "../constants";

export default function validateImages(
  req: Request,
  res: Response,
  next: Function,
): void {
  // @ts-ignore
  const image: Express.Multer.File = req.file,
    height: number = +req.body.height,
    width: number = +req.body.width,
    selectedImage: string = req.body.selectedImage; // th selected image from the gallery
  // validate if either the image or selectedImage is defined
  console.log(selectedImage, typeof selectedImage);

  if (
    (!image && (selectedImage == "undefined" || selectedImage == "null")) ||
    (image && selectedImage != "undefined" && selectedImage != "null")
  ) {
    res.status(400).send({
      err: "No Selected Or uploaded images, Please make sure to select an image from the library or upload your own using the upload button",
    });
    throw new Error(
      "Neither the image was uploaded nor an image was selected from the gallery or both of them was provided",
    );
  }
  // validation of the height and width entered by the user
  if (
    width === undefined ||
    width === null ||
    typeof width != "number" ||
    height === undefined ||
    height === null ||
    typeof height != "number"
  ) {
    res.status(400).send({ err: "Invalid dimensions provided" });
    throw new Error("Invalid dimensions provided");
  }
  // if there is a selected image, then skip validating the uploaded image since it will be undefined and will not be used in the second step
  if (
    selectedImage == undefined ||
    selectedImage == null ||
    selectedImage == "undefined"
  ) {
    // validation of the extension
    const file_extension = image?.originalname.slice(
      ((image?.originalname.lastIndexOf(".") - 1) >>> 0) + 2,
    );
    if (!allowedImageExtensions.includes(file_extension)) {
      res.status(400).send({
        err: "Invalid file type. Only PNG, JPEG, and JPG are supported.",
      });
      throw new Error(
        "Invalid file type. Only PNG, JPEG, and JPG are supported.",
      );
    }

    // validation of the file type
    if (!allowedFileTypes.includes(image?.mimetype)) {
      res.status(400).send({
        err: " Invalid file type. Only images (PNG, JPEG, and JPG) are supported.",
      });
      throw new Error(
        "Invalid file type. Only images (PNG, JPEG, and JPG) are supported.",
      );
    }
    // checking of the file size
    if (image?.size > allowedImageSize * 1024 * 1024) {
      res.status(400).send({ err: "File size exceeds the limit of 5MB." });
      throw new Error("File size exceeds the limit of 5MB.");
    }
  }
  // checking if the height and width are within the allowed range
  if (height < 1 || height > 10000 || width < 1 || width > 10000) {
    res.status(400).send({
      err: "Image dimensions should be between 1x1 and 10000x10000 pixels.",
    });
    throw new Error(
      "Image dimensions should be between 1x1 and 10000x10000 pixels.",
    );
  }
  console.log("The image passed all the verifications successfully");

  // moving to the processing step if there is no errors
  next();
}
