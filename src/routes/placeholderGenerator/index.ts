import sharp from "sharp";
import path from "path";
import fs from "fs";
import { log } from "console";
export default async function generatePlaceholder(req: any, res: any) {
  const color = await req.query.c,
    height = +(await req.query.h),
    width = +(await req.query.w);
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
      const sharpInstance = sharp({
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
              (err: any) => {
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
        (err: any) => {
          log(err);
        },
      );
      // res.sendStatus(200);
      log("an image was sent from the server cache", Date.now());
    }
  });
}
