import express from "express";
import router from "./routes";
import bodyParser from "body-parser";
import cors from "cors";
import { port } from "./constants";

const app = express();

// my logger function
const logger = (req: any, res: any, next: Function) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
};

// here I defines the main route that will lead to othre routes
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use("/", logger, cors(), router);

app.get("/health", (req: any, res: any) => {
  res.status(200).send("Server is up and running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
