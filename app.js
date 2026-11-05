import express from "express";
import { DBconn } from "./src/DB/connection.js";
import { config } from "dotenv";
import{ setupRelation } from "./src/DB/run.js";
import * as allRouter from "./src/index.route.js";
import { globalError } from "./src/middleware/globalError.middle.js";

config();
const app = express();

setupRelation();
await DBconn();
app.use(express.json());

app.use("/auth",allRouter.authRouter);
app.use("/branch",allRouter.branchRouter);
app.use("/delivery",allRouter.deliveryZoneRouter);
app.use("/user",allRouter.userRouter);

app.use(globalError);
app.listen(3000, () => {
  console.log("server is running");
});