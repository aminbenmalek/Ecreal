import {
  creePersonnel,
  listePersonnel,
  updatePersonnel,
  detailsPersonnel,
  deletePersonnel,
} from "../controllers/personnelController.js";
import express from "express";

const router = express.Router();

router.route("/").post(creePersonnel);
router.route("/").get(listePersonnel);
router.route("/:id").put(updatePersonnel);
router.route("/:id").get(detailsPersonnel);
router.route("/:id").delete(deletePersonnel);
export default router;
