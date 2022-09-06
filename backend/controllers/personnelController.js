import asyncHandler from "express-async-handler";
import Personnel from "../models/personnelModel.js";

//@type:POST
//@desc:Creer une nouvelle société
//@api:/api/societe/
const creePersonnel = asyncHandler(async (req, res) => {
  const { mat_pers, nom_pers, pren_pers, cin_pers } = req.body;
  //console.log(code_soc);
  const personnel = await Personnel.findOne({ mat_pers });
  if (personnel) {
    console.log(personnel);
    res.json({ message: "Personnel déja existante!" });
  } else {
    const createdPersonnel = await Personnel.create({
      mat_pers,
      nom_pers,
      pren_pers,
      cin_pers,
    });
    res.json(createdPersonnel);
  }
});
//@type:GET
//@desc:récupération de la liste sociétés
//@api:/api/societe/
const listePersonnel = asyncHandler(async (req, res) => {
  try {
    const personnels = await Personnel.find();
    res.json(personnels);
  } catch (error) {
    res.json({ message: error.message });
  }
});
//@type:PUT
//@desc:mis a jour des donnés
//@api:/api/societe/:id
const updatePersonnel = asyncHandler(async (req, res) => {
  try {
    const { mat_pers, nom_pers, pren_pers, cin_pers } = req.body;
    const personnel = await Personnel.findById(req.params.id);
    if (!personnel) {
      throw new Error("Personnel n'existe pas!");
    } else {
      personnel.mat_pers = mat_pers;
      personnel.nom_pers = nom_pers;
      personnel.pren_pers = pren_pers;
      personnel.cin_pers = cin_pers;
      const updatedPersonnel = await personnel.save();
      res.json(updatedPersonnel);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});
//@type:GET
//@desc:détails de societes
//@api:/api/societe/:id

const detailsPersonnel = asyncHandler(async (req, res) => {
  const personnel = await Personnel.findById(req.params.id);
  if (personnel) {
    res.json(personnel);
  } else {
    res.status(404).json("Personnel n'existe pas!");
  }
});

const deletePersonnel = asyncHandler(async (req, res) => {
  const personnel = await Personnel.findById(req.params.id);
  if (personnel) {
    await personnel.deleteOne();
    res.json("Personnel supprimé avec succé...");
  } else {
    res.status(404).json("Personnel n'existe pas!");
  }
});

export {
  creePersonnel,
  listePersonnel,
  updatePersonnel,
  detailsPersonnel,
  deletePersonnel,
};
