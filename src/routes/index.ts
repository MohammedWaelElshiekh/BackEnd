import { Router } from "express";
import multer from "multer";
import express from "express";
import path from "path";
import resizeImage from "./resize";
import generatePlaceholder from "./placeholderGenerator";
import Library from "./library";
// import Gallery from "./gallery";

const upload = multer({ dest: "uploads/" });
const router = Router();

router.use(
  "/public",
  express.static(path.join(__dirname, `../../public/`), {}),
);
router.get("/library", Library);
router.get("/generatePlaceholder", generatePlaceholder);

router.post("/ResizeImage", upload.single("image"), resizeImage);

export default router;
