import { Router } from "express";
import generatePlaceholder from "./placeholderGenerator";
const router = Router();

router.get("/", function (req, res) {
  res.send("home page");
});

router.get("/generatePlaceholder", generatePlaceholder);

// About page route.
router.get("/about", function (req, res) {
  res.send("About!");
});

export default router;
