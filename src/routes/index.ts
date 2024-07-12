import { Router } from "express";
import multer from "multer";
import express from "express";
import path from "path";
import resizeImage from "./resize";
import generatePlaceholder from "./placeholderGenerator";
// import Gallery from "./gallery";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.get("/generatePlaceholder", generatePlaceholder);
router.use(
  "/gallery",
  express.static(
    path.join(__dirname, `../../public/cachedImagesOnServer/`),
    {},
  ),
);

router.post("/ResizeImage", upload.single("image"), resizeImage);

export default router;
