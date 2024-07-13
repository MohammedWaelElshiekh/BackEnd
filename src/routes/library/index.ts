import { Request, Response } from "express";
import fs from "fs";
import { publicDirectory } from "../../constants";
import path from "path";

export default async function Library(req: Request, res: Response) {
  let ImagesData: (Buffer | String)[] = fs.readdirSync(
    path.join(publicDirectory, "library"),
    {},
  );
  res.status(200).send(ImagesData);
}
