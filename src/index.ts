import express from "express";
import router from "./routes";
import bodyParser from "body-parser";

const app = express();
const port = 3001;

// my logger function
const logger = (req: any, res: any, next: Function) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
};

// here I defines the main route that will lead to othre routes
app.use("/", logger, router);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
