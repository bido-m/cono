import express from "express";
import { DBconn } from "./src/DB/connection.js";
import { config } from "dotenv";
import{ setupRelation } from "./src/DB/run.js";

config();
const app = express();

setupRelation();
await DBconn();
app.use(express.json());

app.listen(5432, () => {
  console.log("server is running");
});