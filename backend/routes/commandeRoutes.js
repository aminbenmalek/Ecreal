import express from "express";
import { protege, admin } from "../middleware/authMiddleware.js";
import {
  ajoutCommande,
  getCommandeById,
  commandeListe,
  commandesListe,
  clientCommandeListe,
  commandeDelete,
} from "../controllers/commandeController.js";

const router = express.Router();
router.route("/").post(ajoutCommande);
router.route("/mescommandes").get(commandeListe);
router.route("/client/mescommandes/:id").get(protege, clientCommandeListe);
router.route("/:id").get(getCommandeById);
/*router.route('/:id/paie').put(protege, updateCommandePaie)*/
router.route("/").get(protege, commandesListe);
router.route("/:id").delete(protege, commandeDelete);

export default router;
