import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(
  `mongodb://root:root@localhost:27017`
);

let db = mongoose.connection;

export default db;