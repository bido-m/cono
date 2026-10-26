import express from "express";
import { DBconn } from "./src/DB/connection.js";

const app = express();

DBconn();
app.use(express.json());

app.listen(5432, () => {
  console.log("server is running");
});