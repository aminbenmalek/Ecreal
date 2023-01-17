import Commande from "../models/commandeModel.js";
import asyncHandler from "express-async-handler";

// @desc Crée nouveau commande
// @route POST /api/commandes
// @accés privé
const ajoutCommande = asyncHandler(async (req, res) => {
  const {
    client,
    chariotListe,
    livraisonAdresse,
    methodepaiement,
    articlesPrix,
    livraisonPrix,
    taxePrix,
    totalePrix,
    cod_cli,
    nom_cli,
    date_livraison,
    societe,
  } = req.body;

  if (articlesPrix && articlesPrix.length === 0) {
    res.status(400);
    throw new Error(`Pas d'articles commandée`);
    return;
  } else {
    const commande = new Commande({
      client,
      nom_cli,
      cod_cli,
      chariotListe,
      date_livraison,
      livraisonAdresse,
      methodepaiement,
      articlesPrix,
      livraisonPrix,
      taxePrix,
      totalePrix,
      societe,
    });

    const commandeCree = await commande.save();
    console.log("commande creer avec succes");
    res.status(201).json(commandeCree);
  }
});

// @desc Get Commande by ID
// @route GET /api/commandes/:id
// @accés privé
const getCommandeById = asyncHandler(async (req, res) => {
  const commande = await Commande.findById(req.params.id).populate(
    "utilisateur",
    "nom email"
  );
  if (commande) {
    res.json(commande);
  } else {
    res.status(404);
    throw new Error(`Commande n'existe pas!`);
  }
});
// @desc Mis a jour commande payée
// @route PUT /api/commandes/:id/paie
// @accés privé
/*const updateCommandePaie = asyncHandler(async (req, res) => {
  const commande = await Commande.findById(req.params.id)
  if (commande) {
    commande.isPaie = true
    commande.date_paiement = Date.now()
    commande.resultatpaiement = {
      id: req.body.id,
      etat: req.body.etat,
      update_time: req.body.update_time,
      email: req.body.payeur.email,
    }
    const updatedCommande = await commande.save()
    res.json(updatedCommande)
  } else {
    res.status(404)
    throw new Error(`Commande n'existe pas!`)
  }
})*/
// @desc liste commandes d'utilisateur
// @route GET /api/commandes/mescommandes
// @accés privé
const commandeListe = asyncHandler(async (req, res) => {
  const commandes = await Commande.find({ utilisateur: req.utilisateur._id });

  res.json(commandes);
  console.log(commandes);
});
// @desc liste commandes
// @route GET /api/commandes
// @accés privé/admin
const commandesListe = asyncHandler(async (req, res) => {
  const commandes = await Commande.find({});

  res.json(commandes);
});
// @desc liste commandes Client
// @route GET /api/commandes/client/mescommandes
// @accés privé
const clientCommandeListe = asyncHandler(async (req, res) => {
  const commandes = await Commande.find({ client: req.params.id });

  res.json(commandes);
});
// @desc delete commande Client
// @route DELETE /api/commandes/:id
// @accés privé
const commandeDelete = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const commande = await Commande.findById(req.params.id);
  if (commande) {
    await commande.remove();
    res.json({ message: "Commande supprimer avec succes" });
  } else {
    res.status(404);
    throw new Error("Commande not found");
  }
});
export {
  ajoutCommande,
  getCommandeById,
  commandeListe,
  commandesListe,
  clientCommandeListe,
  commandeDelete,
};
