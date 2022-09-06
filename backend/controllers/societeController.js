import asyncHandler from "express-async-handler";
import Societe from "../models/societeModel.js";

//@type:POST
//@desc:Creer une nouvelle société
//@api:/api/societe/
const creerSociete = asyncHandler(async (req, res) => {
  const { code_soc, nom_soc, abrv_soc, adr_soc, tva_soc, tel_soc, logo_soc } =
    req.body;
  //console.log(code_soc);
  const societe = await Societe.findOne({ code_soc });
  if (societe) {
    console.log(societe);
    res.json({ message: "Sociéte déja existante!" });
  } else {
    const createdSociete = await Societe.create({
      code_soc,
      nom_soc,
      abrv_soc,
      adr_soc,
      tva_soc,
      tel_soc,
      logo_soc,
    });
    res.json(createdSociete);
  }
});
//@type:GET
//@desc:récupération de la liste sociétés
//@api:/api/societe/
const listeSocietes = asyncHandler(async (req, res) => {
  try {
    const societes = await Societe.find();
    res.json(societes);
  } catch (error) {
    res.json({ message: error.message });
  }
});
//@type:PUT
//@desc:mis a jour des donnés
//@api:/api/societe/:id
const updateSociete = asyncHandler(async (req, res) => {
  try {
    const { code_soc, nom_soc, abrv_soc, adr_soc, tel_soc, tva_soc } = req.body;
    const societe = await Societe.findById(req.params.id);
    if (!societe) {
      throw new Error("Société n'existe pas!");
    } else {
      societe.code_soc = code_soc;
      societe.nom_soc = nom_soc;
      societe.abrv_soc = abrv_soc;
      societe.adr_soc = adr_soc;
      societe.tel_soc = tel_soc;
      societe.tva_soc = tva_soc;
      const updatedSociete = await societe.save();
      res.json(updatedSociete);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});
//@type:GET
//@desc:détails de societes
//@api:/api/societe/:id

const detailsSociete = asyncHandler(async (req, res) => {
  const societe = await Societe.findById(req.params.id);
  if (societe) {
    res.json(societe);
  } else {
    res.status(404).json("Société n'existe pas!");
  }
});
export { creerSociete, listeSocietes, updateSociete, detailsSociete };
