import express from "express";
import morgan from "morgan";
import cors from "cors";

import router from "./routes/userRoutes.js";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/api/users", router);

export default app;
