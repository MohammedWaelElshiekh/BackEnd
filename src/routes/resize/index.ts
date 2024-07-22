import { Request, Response } from "express";
import { projectPath, publicDirectory, domain } from "../../constants";
import path from "path";
import fs from "fs";
import SaveImage from "../../utilities/savingImage";
import ResizeAndSaveImage from "../../utilities/resizeAndSaveImage";
export default async function resizeImage(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    if (req.file != undefined) {
      const imagePath: string = req.file.path;
      const imageName: string = req.file.originalname;
      const newHeight: number = +req.body.height;
      const newWidth: number = +req.body.width;
      const resizedImageName: string = `${imageName}-${newHeight}x${newWidth}.jpg`;
      const newImagePath: string = path.join(
        publicDirectory,
        "library",
        imageName,
      );
      const resizedImagePath: string = path.join(
        publicDirectory,
        "resizedImages",
        resizedImageName,
      );
      if (!fs.existsSync(newImagePath)) {
        SaveImage(path.join(projectPath, "..", imagePath), newImagePath, res);
      } else {
        console.log("The image exists on the sever");
      }
      if (!fs.existsSync(resizedImagePath)) {
        const result = await ResizeAndSaveImage(
          path.join(projectPath, "..", imagePath),
          resizedImagePath,
          newWidth,
          newHeight,
        );

        if (result.code == 201) {
          res.status(201).send({
            url: result.url,
          });
        } else {
          res.status(result.code).send({
            err: result.err,
          });
        }
      } else {
        console.log("The resized image exists on the server");
        res.status(200).send({
          url: `${domain}/public/resizedImages/${resizedImageName}`,
        });
      }
    } else if (req.body.selectedImage) {
      const selectedImage: string = decodeURI(req.body.selectedImage);
      const selectedImageName =
        selectedImage.split("/")[selectedImage.split("/").length - 1];
      const newHeight: number = +req.body.height;
      const newWidth: number = +req.body.width;
      const resizedImageName: string = `${selectedImageName}-${newHeight}x${newWidth}.jpg`;
      const selectedImagePath: string = path.join(
        publicDirectory,
        "library",
        selectedImageName,
      );
      const resizedImagePath: string = path.join(
        publicDirectory,
        "resizedImages",
        resizedImageName,
      );
      if (fs.existsSync(selectedImagePath)) {
        if (!fs.existsSync(resizedImagePath)) {
          const result = await ResizeAndSaveImage(
            selectedImagePath,
            resizedImagePath,
            newWidth,
            newHeight,
          );

          if (result.code == 201) {
            res.status(201).send({
              url: result.url,
            });
          } else {
            res.status(result.code).send({
              err: result.err,
            });
          }
        } else {
          console.log("The resized image exists on the server");
          res.status(200).send({
            url: `${domain}/public/resizedImages/${resizedImageName}`,
          });
        }
      } else {
        console.log("The selected image does not exist on the server");
        res.status(404).send("The resized or selected image does not exist.");
        return;
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while resizing the image.");
  }
}
