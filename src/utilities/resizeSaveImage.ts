import sharp from "sharp";
import { Response } from "express";
import { domain } from "../constants";

export default function ResizeAndSaveImage(
  source: string,
  target: string,
  res: Response,
  width: number,
  height: number,
): void {
  sharp(source)
    .resize(width, height) // setting the desired dimensions
    .toFile(target, (err: Error, info: any) => {
      if (err) {
        console.log(
          `There was an error saving the resized image to the server ${err} `,
        );
        res
          .status(500)
          .send({ err: "Error saving the resized image to the server" });
      } else {
        console.log(`Resized image saved successfully ${info}`);
        try {
          res.status(201).send({
            url: `${domain}/public/resizedImages/${target.split("/")[target.split("/").length - 1]}`,
          });
        } catch (err) {
          if (err) {
            console.log(`error sending the saved image url to the user ${err}`);
            res.status(500).send({
              err: "error sending the saved image url to the user",
            });
          }
        }
      }
    });
}
