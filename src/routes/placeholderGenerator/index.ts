import sharp from "sharp";
import path from "path";
import fs from "fs";
import { log } from "console";
import { Request, Response } from "express";
export default async function generatePlaceholder(req: Request, res: Response) {
  const color: string = req.query.c as string,
    // @ts-expect-error 'req.query.h' is possibly 'undefined'
    height: number = +req.query.h as number,
    // @ts-expect-error 'req.query.h' is possibly 'undefined'
    width: number = +req.query.w as number;
  const imgName = `${color}-${height}-${width}.png`;
  const cachedImagesOnServer = path.join(
    __dirname,
    "../../..",
    "public",
    "cachedImagesOnServer",
  );
  const imagePath = path.join(cachedImagesOnServer, imgName);
  // log(__dirname);
  fs.access(imagePath, fs.constants.R_OK, (err) => {
    if (err) {
      sharp({
        create: {
          background: color ? color : "gray",
          width: width ? width : 100,
          height: height ? height : 100,
          channels: 3,
        },
      })
        .png()
        .toFile(path.join(cachedImagesOnServer, imgName), (err, info) => {
          if (err) {
            log("there was an error processing the image");
            log(err);
            log(info);
            res.sendStatus(404);
          } else {
            res.sendFile(
              imgName,
              {
                root: cachedImagesOnServer,
                dotfiles: "deny",
                headers: {
                  "x-timestamp": Date.now(),
                  "x-sent": true,
                },
              },
              (err: Error): void => {
                log(err);
              },
            );
            // res.sendStatus(200);
            log(
              "an image was created and saved on the server cache successfully",
              Date.now(),
            );
            log("info", info);
          }
        });
    } else {
      res.sendFile(
        imgName,
        {
          root: cachedImagesOnServer,
          dotfiles: "deny",
          headers: {
            "x-timestamp": Date.now(),
            "x-sent": true,
          },
        },
        (err: Error) => {
          log(err);
        },
      );
      // res.sendStatus(200);
      log("an image was sent from the server cache", Date.now());
    }
  });
}
