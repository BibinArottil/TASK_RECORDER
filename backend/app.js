import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import { configDotenv } from "dotenv";
import "./config/dbConfig.js";
import taskRoute from "./routes/route.js";

configDotenv();
app.use(morgan("dev"));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/", taskRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
