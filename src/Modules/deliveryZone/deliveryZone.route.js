import { Router } from "express";
import * as deliveryZone from "./deliveryZone.controller.js";
import { authorization } from "../../middleware/authorization.middle.js";
import { authentication } from "../../middleware/authentication.middle.js";
import { validationMiddle } from "../../middleware/validation.middle.js";
import { deliveryZoneSchema, updateDeliverySchema } from "./deliveryZone.validation.js";

const router = Router();

router.route("/")
.post(validationMiddle(deliveryZoneSchema),deliveryZone.add)
.get(deliveryZone.getAll);

router.route("/:id")
.get(deliveryZone.getOne)
.put(validationMiddle(updateDeliverySchema),deliveryZone.update)
.patch(deliveryZone.switchAvailable)
.delete(deliveryZone.remove);

export default router;