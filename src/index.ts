import express from "express";
import router from "./routes";

const app = express();
const port = 3000;

// my logger function
const logger = (req: any, res: any, next: Function) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
};

// here I defines the main route that will lead to othre routes
app.use("/", logger, router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
