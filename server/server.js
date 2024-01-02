import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "./app.js";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_NAME.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("Database connected successfully");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
