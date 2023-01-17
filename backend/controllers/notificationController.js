import Notification from "../models/notificationModel.js";
import asyncHandler from "express-async-handler";

const ajoutNotif = asyncHandler(async (req, res) => {
  const { cod_notif, libelle, categorie } = req.body;
  const notification = await Notification.findOne({ cod_notif });
  if (notification) {
    console.log(notification);
    throw new Error("Notification existe déja!");
  } else {
    const createdNotif = await Notification.create({
      cod_notif,
      libelle,
      categorie,
    });
    res.json(createdNotif);
  }
});

const detailsNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (notification) {
    res.json(notification);
  } else {
    res.status(404).json({ message: "Notification n'existe pas!" });
  }
});

const listeNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find();
  res.json(notifications);
});
export { ajoutNotif, detailsNotification, listeNotifications };
