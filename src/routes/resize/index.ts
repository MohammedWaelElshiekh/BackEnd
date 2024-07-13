import express, { Request, Response } from "express";
import sharp from "sharp";
import { projectPath, publicDirectory } from "../../constants";
import path from "path";
import fs from "fs";
export default async function resizeImage(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    console.log(req.body);

    // @ts-ignore
    const imagePath: string = req.file.path; // vs code gives and error of maybeing undefined
    // @ts-ignore
    const imageName: string = req.file.originalname;
    const newHeight: number = +req.body.height,
      newWidth: number = +req.body.width;
    const resizedImageName: string = `${imageName}-${newHeight}x${newWidth}.png`; // the extension is repeated twice in the name, it will not affect eh code function
    // checking the the image exists in the library, if not, creates it
    if (!fs.existsSync(path.join(publicDirectory, "library", imageName))) {
      sharp(path.join(projectPath, "..", imagePath)).toFile(
        path.join(publicDirectory, "library", imageName),
        (err, info) => {
          if (err) {
            console.log(
              `There was an error saving the image to the server ${err} `,
            );
            res.sendStatus(500);
          } else {
            console.log(`Image saved successfully in the library ${info}`);
          }
        },
      );
    } else {
      console.log("The image exists on the sever");
    }
    // chaks if the resized image exists on the server, if not create it and send it, if yes just will send it
    if (
      !fs.existsSync(
        path.join(publicDirectory, "resizedImages", resizedImageName),
      )
    ) {
      const output = await sharp(path.join(projectPath, "..", imagePath))
        .resize(newWidth, newHeight) // setting the desired dimensions
        .toFile(
          path.join(publicDirectory, "resizedImages", resizedImageName),
          (err, info) => {
            if (err) {
              console.log(
                `There was an error saving the resized image to the server ${err} `,
              );
              res.sendStatus(500);
            } else {
              console.log(`Resized image saved successfully ${info}`);
              res.sendFile(
                path.join(publicDirectory, "resizedImages", resizedImageName),
                (err: Error) => {
                  if (err) {
                    console.log(
                      `There Was an error sending resized image ${err}`,
                    );
                    res
                      .sendStatus(500)
                      .send("there was an error creating the resized image");
                  }
                },
              );
            }
          },
        );
    } else {
      console.log("The resized image exists on the server");
      res.sendFile(
        path.join(publicDirectory, "resizedImages", resizedImageName),
        (err: Error) => {
          if (err) {
            console.log(`There Was an error sending resized image ${err}`);
            res
              .sendStatus(500)
              .send("there was an error creating the resized image");
          }
        },
      );
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while resizing the image.");
  }
}
