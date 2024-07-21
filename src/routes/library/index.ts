import { Request, Response } from "express";
import fs from "fs";
import { publicDirectory } from "../../constants";
import path from "path";

export default function Library(req: Request, res: Response): void {
  const ImagesData: (Buffer | string)[] = fs.readdirSync(
    path.join(publicDirectory, "library"),
    {},
  );
  res.status(200).send(ImagesData);
}
