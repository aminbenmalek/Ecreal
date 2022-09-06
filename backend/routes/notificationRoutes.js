import {
  ajoutNotif,
  detailsNotification,
  listeNotifications,
} from "../controllers/notificationController.js";
import express from "express";

const router = express.Router();

router.route("/").post(ajoutNotif);
router.route("/").get(listeNotifications);
router.route("/:id").get(detailsNotification);
export default router;
