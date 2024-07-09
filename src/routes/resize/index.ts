import express from "express";
import sharp from "sharp";

export default async function resizeImage(req: any, res: any) {
  try {
    const image = req.file.path;
    const resizedImagePath = `resized-${image}`;

    await sharp(image)
      .resize(200, 200) // set the desired dimensions
      .toFile(resizedImagePath);

    res.sendFile(resizedImagePath);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while resizing the image.");
  }
}
