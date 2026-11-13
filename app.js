import express from "express";
import { DBconn } from "./src/DB/connection.js";
import "dotenv/config";
import { setupRelation } from "./src/DB/run.js";
import * as allRouter from "./src/index.route.js";
import { globalError } from "./src/middleware/globalError.middle.js";
import { config } from "dotenv";
config();
const app = express();
setupRelation();
await DBconn();
app.use(express.json());

app.use("/auth", allRouter.authRouter);
app.use("/branch", allRouter.branchRouter);
app.use("/delivery", allRouter.deliveryZoneRouter);
app.use("/user", allRouter.userRouter);
app.use("/addition", allRouter.additionRouter);
app.use("/category", allRouter.categoryRouter);
app.use("/discount", allRouter.discountRouter);
app.use("/product", allRouter.productRouter);
app.use("/size", allRouter.sizeRouter);
app.use("/product-size", allRouter.productSizeRouter);
app.use("/product-addition", allRouter.productAdditionRouter);
app.get("/", (req, res) => {
  return res.status(200).json({
    succses: true,
    message: "Server Running",
  });
});
app.use(globalError);
app.listen(3000, () => {
  console.log("server is running");
});
