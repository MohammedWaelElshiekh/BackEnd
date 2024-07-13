import express, { Request, Response } from "express";
import sharp from "sharp";
import { projectPath } from "../../constants";
import path from "path";
export default async function resizeImage(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    // console.log(req.body);
    // console.log(req.file);
    // @ts-ignore
    const imagePath = req.file.path;
    // @ts-ignore
    const imageName = req.file.originalname;
    const newHeight = req.body.height,
      newWidth = req.body.width;
    const resizedImageName = `${imageName}-${newHeight}x${newWidth}.png`;

    await sharp(path.join(projectPath, "..", imagePath))
      .resize(200, 200) // set the desired dimensions
      .toFile(
        path.join(projectPath, "..", "public/resizedImages", resizedImageName),
      );
    res
      .status(201)
      .download(
        path.join(projectPath, "..", "public/resizedImages", resizedImageName),
        (err) => {
          if (err) console.log(err);
        },
      );
    console.log(res.attachment());
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while resizing the image.");
  }
}
