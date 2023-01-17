import {
  creeTiers,
  listeTiers,
  updateTiers,
  detailsTiers,
  deleteTiers,
} from "../controllers/tiersController.js";
import express from "express";

const router = express.Router();

router.route("/").post(creeTiers);
router.route("/").get(listeTiers);
router.route("/:id").put(updateTiers);
router.route("/:id").get(detailsTiers);
router.route("/:id").delete(deleteTiers);
export default router;
