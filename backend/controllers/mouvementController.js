import Mouvement from "../models/MouvementModel.js";
import asyncHandler from "express-async-handler";

const ajoutMouv = asyncHandler(async (req, res) => {
  const { notification, libelle_mouv, date_mouv, duree, etat } = req.body;
  const mouvement = await Mouvement.findOne({ libelle_mouv });
  if (mouvement) {
    console.log(mouvement);
    throw new Error("Mouvement existe déja!");
  } else {
    const createdMouv = await Mouvement.create({
      notification,
      libelle_mouv,
      date_mouv,
      duree,
      etat,
    });
    res.json(createdMouv);
  }
});

const detailsMouvement = asyncHandler(async (req, res) => {
  const mouvement = await Mouvement.findById(req.params.id);
  if (mouvement) {
    res.json(mouvement);
  } else {
    res.status(404).json({ message: "Mouvement n'existe pas!" });
  }
});

const listeMouvements = asyncHandler(async (req, res) => {
  const mouvements = await Mouvement.find();
  res.json(mouvements);
});

const suppMouvement = asyncHandler(async (req, res) => {
  const mouvement = await Mouvement.findById(req.params.id);
  if (mouvement) {
    await mouvement.remove();
    res.json({ message: "Mouvement supprimer!" });
  } else {
    res.status(404).json({ message: "Article n'existe pas!" });
  }
});

const updateMouvement = asyncHandler(async (req, res) => {
  const mouvement = await Mouvement.findById(req.params.id);
  if (mouvement) {
    mouvement.notification = req.body.notification;
    mouvement.libelle_mouv = req.body.libelle_mouv;
    mouvement.date_mouv = req.body.date_mouv;
    mouvement.etat = req.body.etat;
    mouvement.duree = req.body.duree;
    const updatedMouvement = await mouvement.save();
    res.json(updatedMouvement);
  } else {
    res.status(404).json({ message: "Mouvement n'existe pas!" });
  }
});
export {
  ajoutMouv,
  detailsMouvement,
  listeMouvements,
  suppMouvement,
  updateMouvement,
};
