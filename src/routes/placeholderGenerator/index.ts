import sharp from "sharp";
export default async function generatePlaceholder(req: any, res: any) {
  await sharp({
    text: {
      width: 300,
      // background: "gray",
      height: 200,
      // channels: 3,
      text: "Hello",
    },
  }).toFile("noise.png");
  res.send("worked");
}
