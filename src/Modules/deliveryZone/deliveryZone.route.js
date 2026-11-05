import { Router } from "express";
import * as deliveryZone from "./deliveryZone.controller.js";
import { authorization } from "../../middleware/authorization.middle.js";
import { authentication } from "../../middleware/authentication.middle.js";

const router = Router();

router.route("/").post(deliveryZone.add).get(deliveryZone.getAll);
router.route("/:id").get(deliveryZone.getOne).put(deliveryZone.update).patch(deliveryZone.switchAvailable).delete(deliveryZone.remove);

export default router;