import express from "express";
import {
  listeTiers,
  listeParCritere,
} from "../controllers/oracleController.js";

const router = express.Router();
router.route("/liste").get(listeTiers);
router.route("/:crit/:data").get(listeParCritere);
export default router;
