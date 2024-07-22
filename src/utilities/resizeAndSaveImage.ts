import sharp, { OutputInfo } from "sharp";
import { domain } from "../constants";

export default async function ResizeAndSaveImage(
  source: string,
  target: string,
  width: number,
  height: number,
): Promise<{ code: number; err: string; url: string }> {
  const output: { code: number; err: string; url: string } = {
    code: 201,
    err: "",
    url: "",
  };
  // wrapped sharp inside a promise since it is async but hard to control it using await
  const result = await new Promise((resolve) => {
    sharp(source)
      .resize(width, height) // setting the desired dimensions
      .toFile(target, (err: Error, info: OutputInfo) => {
        if (err) {
          console.log(
            `There was an error saving the resized image to the server ${err} `,
          );
          output.code = 500;
          output.err = "Error saving the resized image to the server";
        } else {
          console.log(`Resized image saved successfully ${info}`);

          output.url = `${domain}/public/resizedImages/${target.split("/")[target.split("/").length - 1]}`;
          output.code = 201;
        }
        resolve(true);
      });
  });
  if (result) {
    return output;
  } else {
    return output;
  }
}
