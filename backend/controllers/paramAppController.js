//import asyncHandler from 'express-async-Handler'
import ParamApp from "../models/paramAppModel.js";

//@desc:cree nouveau paramétre d'application
//@route: POST /api/paramApp/
const creeParam = async (req, res) => {
  const { client, code_param, nom_param, desc_param, valeur } = req.body;
  console.log(client);
  const param = await ParamApp.findOne({
    client: client,
    nom_param: nom_param,
  });
  console.log("param:" + param);
  if (!param) {
    //nParam:variable qui contient les nouveaux parametres ajoutée dans la table param app

    const nParam = await ParamApp.create({
      code_param: code_param,
      nom_param: nom_param,
      desc_param: desc_param,
      valeur: valeur,
      client: client,
    });
    res.json(nParam);
  } else {
    res.json("Parametre deja existe");
  }
};
//@desc récuperer liste des paramétres
//@route GET /api/paramApp

const listeParam = async (req, res) => {
  const param = await ParamApp.find({});
  res.json(param);
};

//@desc récupérer param par nom_cli
//@route GET /api/paramApp/nom/:id

const paramsParCli = async (req, res) => {
  const params = await ParamApp.find({ client: req.params.id });
  if (params) {
    res.status(201).json(params);
  } else {
    res.status(404).json({ message: "paramétres non existante!" });
  }
};

//@desc update paramétre
//@route PUT /api/paramApp/:id

const updateParam = async (req, res) => {
  const { client, code_param, nom_param, desc_param, valeur } = req.body;
  console.log("client:");
  console.log(client);
  const param = await ParamApp.findOne({
    _id: req.params.id,
  });
  console.log("found");
  console.log(param);
  if (param) {
    param.code_param = code_param;
    param.nom_param = nom_param;
    param.desc_param = desc_param;
    param.valeur = valeur;
    param.client = client;
    console.log("updated");
    console.log(param);
    const updatedParam = await param.save();

    res.json(updatedParam);
  } else {
    res.status(404).json({ message: "Paramétre non existante!" });
  }
};
//@desc récuperer paramétre par id
//@route GET /api/paramApp/:id

const detailsParam = async (req, res) => {
  try {
    const param = await ParamApp.findById(req.params.id);
    res.json(param);
  } catch (error) {
    res.json(error);
  }
};

//@desc supprimer paramétre par id
//@route DELETE /api/paramApp/:id

const suppParam = async (req, res) => {
  try {
    const param = await ParamApp.findById(req.params.id);
    await param.delete();
    res.json({ message: "Paramétre supprimer avec Succes!" });
  } catch (error) {
    res.json(error);
  }
};
export {
  creeParam,
  listeParam,
  paramsParCli,
  updateParam,
  detailsParam,
  suppParam,
};
