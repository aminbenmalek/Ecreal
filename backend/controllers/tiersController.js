import asyncHandler from "express-async-handler";
import Tiers from "../models/tiersModels.js";

//@type:POST
//@desc:Creer une nouvelle société
//@api:/api/societe/
const creeTiers = asyncHandler(async (req, res) => {
  const {
    cod_tiers,
    nom_tiers,
    pren_tiers,
    cin_tiers,
    tel_tiers,
    email_tiers,
    adr_tiers,
  } = req.body;
  //console.log(code_soc);
  const tiers = await Tiers.findOne({ cod_tiers });
  if (tiers) {
    //console.log(tiers);
    res.json({ message: "Tiers déja existante!" });
  } else {
    const createdTiers = await Tiers.create({
      cod_tiers,
      nom_tiers,
      pren_tiers,
      cin_tiers,
      tel_tiers,
      adr_tiers,
      email_tiers,
    });
    res.json(createdTiers);
  }
});
//@type:GET
//@desc:récupération de la liste sociétés
//@api:/api/societe/
const listeTiers = asyncHandler(async (req, res) => {
  try {
    const tiers = await Tiers.find();
    res.json(tiers);
  } catch (error) {
    res.json({ message: error.message });
  }
});
//@type:PUT
//@desc:mis a jour des donnés
//@api:/api/societe/:id
const updateTiers = asyncHandler(async (req, res) => {
  try {
    //const { mat_pers, nom_pers, pren_pers, cin_pers } = req.body;
    const {
      cod_tiers,
      nom_tiers,
      pren_tiers,
      cin_tiers,
      tel_tiers,
      adr_tiers,
      email_tiers,
    } = req.body;
    const tiers = await Tiers.findById(req.params.id);
    if (!tiers) {
      throw new Error("Tiers n'existe pas!");
    } else {
      tiers.cod_tiers = cod_tiers;
      tiers.nom_tiers = nom_tiers;
      tiers.pren_tiers = pren_tiers;
      tiers.cin_tiers = cin_tiers;
      tiers.tel_tiers = tel_tiers;
      tiers.adr_tiers = adr_tiers;
      tiers.email_tiers = email_tiers;
      const updatedTiers = await tiers.save();
      res.json(updatedTiers);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});
//@type:GET
//@desc:détails de societes
//@api:/api/societe/:id

const detailsTiers = asyncHandler(async (req, res) => {
  const tiers = await Tiers.findById(req.params.id);
  if (tiers) {
    res.json(tiers);
  } else {
    res.status(404).json("Tiers n'existe pas!");
  }
});

const deleteTiers = asyncHandler(async (req, res) => {
  const tiers = await Tiers.findById(req.params.id);
  if (tiers) {
    await tiers.deleteOne();
    res.json("Tiers supprimé avec succé...");
  } else {
    res.status(404).json("Tiers n'existe pas!");
  }
});

export { creeTiers, listeTiers, updateTiers, detailsTiers, deleteTiers };
