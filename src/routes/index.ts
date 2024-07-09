import { Router } from "express";
import resizeImage from "./resize";
import generatePlaceholder from "./placeholderGenerator";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.get("/generatePlaceholder", generatePlaceholder);

router.post("/ResizeImage", upload.single("image"), resizeImage);

export default router;
