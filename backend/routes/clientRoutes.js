import express from "express";
import { protege, admin } from "../middleware/authMiddleware.js";
import {
  getClients,
  authClient,
  getProfile,
  inscClient,
  updateProfile,
  suppClient,
  getClientById,
  updateClient,
} from "../controllers/clientController.js";

const router = express.Router();
router.route("/").get(getClients);
router.route("/login").post(authClient);
router.route("/profile").get(getProfile);
router.route("/profile").put(updateClient);
router.route("/").post(inscClient);
router.route("/:id").delete(suppClient);
router.route("/:id").get(getClientById);
router.route("/:id").put(updateProfile);

export default router;
