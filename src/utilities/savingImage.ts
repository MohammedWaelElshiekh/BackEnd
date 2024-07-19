import { Response } from "express";
import sharp from "sharp";
export default function SaveImage(
  src: string,
  target: string,
  res: Response,
): void {
  sharp(src).toFile(target, (err, info) => {
    if (err) {
      console.log(`There was an error saving the image to the server ${err} `);
      res.status(500).send({
        err: "there was an error creating the image on the server",
      });
    } else {
      console.log(`Image saved successfully in the library ${info}`);
    }
  });
}
