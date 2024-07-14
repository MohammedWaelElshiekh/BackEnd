import { Request, Response } from "express";
import sharp from "sharp";
import { projectPath, publicDirectory, domain } from "../../constants";
import path from "path";
import fs from "fs";
export default function resizeImage(req: Request, res: Response): void {
  try {
    if (req.file != undefined) {
      // @ts-ignore
      const imagePath: string = req.file.path; // vs code gives and error of maybeing undefined
      // @ts-ignore
      const imageName: string = req.file.originalname;
      const newHeight: number = +req.body.height,
        newWidth: number = +req.body.width;
      const resizedImageName: string = `${imageName}-${newHeight}x${newWidth}.jpg`; // the extension is repeated twice in the name, it will not affect eh code function
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
      // checking the the image exists in the library, if not, creates it
      if (!fs.existsSync(newImagePath)) {
        sharp(path.join(projectPath, "..", imagePath)).toFile(
          newImagePath,
          (err, info) => {
            if (err) {
              console.log(
                `There was an error saving the image to the server ${err} `,
              );
              res.status(500).send({
                err: "there was an error creating the image on the server",
              });
            } else {
              console.log(`Image saved successfully in the library ${info}`);
            }
          },
        );
      } else {
        console.log("The image exists on the sever");
      }
      // chaks if the resized image exists on the server, if not create it and send it, if yes just will send it
      if (!fs.existsSync(resizedImagePath)) {
        sharp(path.join(projectPath, "..", imagePath))
          .resize(newWidth, newHeight) // setting the desired dimensions
          .toFile(resizedImagePath, (err: Error, info: any) => {
            if (err) {
              console.log(
                `There was an error saving the resized image to the server ${err} `,
              );
              res
                .status(500)
                .send({ err: "Error saving the resized image to the server" });
            } else {
              console.log(`Resized image saved successfully ${info}`);
              // res.sendFile(resizedImagePath, (err: Error) => {
              //   if (err) {
              //     console.log(
              //       `There Was an error sending resized image ${err}`,
              //     );
              //     res
              //       .sendStatus(500)
              //       .send("there was an error creating the resized image");
              //   }
              // });
              try {
                res.status(201).send({
                  url: `${domain}/public/resizedImages/${resizedImageName}`,
                });
              } catch (err) {
                if (err) {
                  console.log(
                    `error sending the saved image url to the user ${err}`,
                  );
                  res.status(500).send({
                    err: "error sending the saved image url to the user",
                  });
                }
              }
            }
          });
      } else {
        console.log("The resized image exists on the server");
        // res.sendFile(resizedImagePath, (err: Error) => {
        //   if (err) {
        //     console.log(`There Was an error sending resized image ${err}`);
        //     res
        //       .sendStatus(500)
        //       .send("there was an error creating the resized image");
        //   }
        // });
        try {
          res.status(200).send({
            url: `${domain}/public/resizedImages/${resizedImageName}`,
          });
        } catch (err) {
          if (err) {
            console.log(`error sending the image url to the user ${err}`);
            res
              .status(500)
              .send({ err: "error sending the image url to the user" });
          }
        }
      }
    } else if (req.body.selectedImage) {
      // Else if the user choosed an image from the provided library
      const selectedImage: string = req.body.selectedImage;
      const selectedImageName =
        selectedImage.split("/")[selectedImage.split("/").length - 1];
      const newHeight: number = +req.body.height,
        newWidth: number = +req.body.width;

      const resizedImageName: string = `${selectedImageName}-${newHeight}x${newWidth}.jpg`; // the extension is repeated twice in the name, it will not affect eh code function
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
      // chek if the selected image exists on the server
      if (fs.existsSync(selectedImagePath)) {
        // chaecks if the resizef image exists on the server
        console.log("the selected image exists on the server");

        if (!fs.existsSync(resizedImagePath)) {
          sharp(selectedImagePath)
            .resize(newWidth, newHeight) // setting the desired dimensions
            .toFile(resizedImagePath, (err, info) => {
              if (err) {
                console.log(
                  `There was an error saving the resized image to the server ${err} `,
                );
                res.sendStatus(500).send({
                  err: "there was an error creating the image on the server",
                });
              } else {
                console.log(`Resized image saved successfully ${info}`);
                // res.sendFile(resizedImagePath, (err: Error) => {
                //   if (err) {
                //     console.log(
                //       `There Was an error sending resized image ${err}`,
                //     );
                //     res
                //       .sendStatus(500)
                //       .send("there was an error creating the resized image");
                //   }
                // });
                try {
                  res.status(201).send({
                    url: `${domain}/public/resizedImages/${resizedImageName}`,
                  });
                } catch (err) {
                  if (err) {
                    console.log(
                      `error sending the image url to the user ${err}`,
                    );
                    res.status(500).send({
                      err: "error sending the resized image url to the user",
                    });
                  }
                }
              }
            });
        } else {
          console.log("The resized image exists on the server");
          // res.sendFile(resizedImagePath, (err: Error) => {
          //   if (err) {
          //     console.log(`There Was an error sending resized image ${err}`);
          //     res
          //       .sendStatus(500)
          //       .send("there was an error creating the resized image");
          //   }
          // });
          try {
            res.status(200).send({
              url: `${domain}/public/resizedImages/${resizedImageName}`,
            });
          } catch (err) {
            if (err) {
              console.log(
                `error sending the resized image url to the user ${err}`,
              );
              res.status(500).send({
                err: "error sending the resized image url to the user",
              });
            }
          }
        }
      } else {
        console.log(
          "The resized or selected image does not exist on the server",
        );
        res.status(404).send("The resized or selected image does not exist.");
        return;
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while resizing the image.");
  }
}
