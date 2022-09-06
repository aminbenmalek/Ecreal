import {
  ajoutMouv,
  detailsMouvement,
  listeMouvements,
  suppMouvement,
  updateMouvement,
} from "../controllers/mouvementController.js";
import express from "express";

const router = express.Router();

router.route("/").post(ajoutMouv);
router.route("/").get(listeMouvements);
router.route("/:id").get(detailsMouvement);
router.route("/:id").delete(suppMouvement);
router.route("/:id").put(updateMouvement);
export default router;
