import sharp, { OutputInfo } from "sharp";
import { domain } from "../constants";

export default function ResizeAndSaveImage(
  source: string,
  target: string,
  width: number,
  height: number,
): { code: number; err: string } {
  // used var instead of let to make it global
  // eslint-disable-next-line no-var
  var output: { code: number; err: string; url: string } = {
    code: 0,
    err: "",
    url: "",
  };
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
        try {
          output.url = `${domain}/public/resizedImages/${target.split("/")[target.split("/").length - 1]}`;
          output.code = 200;
        } catch (err) {
          if (err) {
            console.log(`error sending the saved image url to the user ${err}`);
            output.code = 500;
            output.err = "error sending the saved image url to the user";
          }
        }
      }
    });
  return output;
}
