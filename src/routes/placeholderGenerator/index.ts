import sharp from "sharp";
import { promises as fsPromises } from "fs";
export default async function generatePlaceholder(req: any, res: any) {
  const color = await req.query.c,
    height = await +req.query.h,
    width = await +req.query.w;
  const imgName = `./cachedImagesOnServer/${color}-${await height}-${await width}.png`;
  fsPromises.appendFile(imgName, "").then(async (data) => {
    await sharp({
      create: {
        background: color ? color : "gray",
        width: width ? width : 100,
        height: height ? height : 100,
        channels: 3,
      },
    }).toFile(imgName);

    res.send("done");
  });
}
