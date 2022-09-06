import Client from "../models/clientModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

// @desc Selectionner tous les clients
// @route GET /api/clients
// @accés public/Admin

const getClients = asyncHandler(async (req, res) => {
  const clients = await Client.find({});

  res.json(clients);
});
// @desc authentifier utilisateur et get token
// @route POST /api/utilisateurs/login
// @accés post
const authClient = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { nom_cli, cod_cli } = req.body;

  console.log(nom_cli);

  /* test requet */

  const client = await Client.findOne({ nom_cli, cod_cli });
  console.log(client);
  if (client) {
    res.json({
      _id: client._id,
      cod_cli: client.cod_cli,
      nom_cli: client.nom_cli,
      adr_cli: client.adr_cli,
      email_cli: client.email_cli,
      tel_cli: client.tel_cli,
      tarif_cli: client.tarif_cli,
      photo_cli: client.photo_cli,
      cod_tarif: client.cod_tarif,
      is_Rep: client.is_Rep,
      cod_rep: client.cod_rep,
      token: generateToken(client._id),
    });
  } else {
    res.status(401);
    throw new Error("nom ou code client invalide");
  }
});
// @desc retourner le profile de l'utilisateur
// @route GET /api/utilisateurs/profile
// @accés Privé
const getProfile = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.client._id);
  if (client) {
    res.json({
      _id: client._id,
      cod_cli: client.cod_cli,
      nom_cli: client.nom_cli,
      adr_cli: client.adr_cli,
      tel_cli: client.tel_cli,
      email_cli: client.email_cli,
      tarif_cli: client.tarif_cli,
      photo_cli: client.photo_cli,
    });
  } else {
    res.status(404);
    throw new Error("Client non existant");
  }
});
// @desc inscription nouveau utilisateur
// @route POST /api/utilisateurs
// @accés public
const inscClient = asyncHandler(async (req, res) => {
  const {
    cod_cli,
    nom_cli,
    adr_cli,
    tel_cli,
    photo_cli,
    cod_tarif,
    email_cli,
    cod_rep,
    is_Rep,
  } = req.body;

  const clientExist = await Client.findOne({ cod_cli });
  if (clientExist) {
    res.status(400);
    throw new Error("Client existe déja ....");
  }
  const client = await Client.create({
    cod_cli,
    nom_cli,
    adr_cli,
    tel_cli,
    photo_cli,
    email_cli,
    cod_tarif,
    cod_rep,
    is_Rep,
  });
  if (client) {
    res.status(201).json({
      _id: client._id,
      cod_cli: client.cod_cli,
      nom_cli: client.nom_cli,
      email_cli: client.email_cli,
      adr_cli: client.adr_cli,
      tel_cli: client.tel_cli,
      cod_tarif: client.cod_tarif,
      photo_cli: client.photo_cli,
      cod_rep: client.cod_rep,
      is_Rep: client.is_Rep,
      token: generateToken(client._id),
    });
  } else {
    res.status(400);
    throw new Error("Données invalides");
  }
});
// @desc Mis a jour le profile de l'utilisateur
// @route PUT /api/utilisateurs/profile
// @accés Privé
const updateProfile = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (client) {
    client.nom_cli = req.body.nom_cli || client.nom_cli;
    client.email_cli = req.body.email_cli || client.email_cli;
    client.tel_cli = req.body.tel_cli || client.tel_cli;
    client.photo_cli = req.body.photo_cli || client.photo_cli;
    client.adr_cli = req.body.adr_cli || client.adr_cli;
    client.tarif_cli = req.body.tarif_cli || client.tarif_cli;
    client.is_Rep = req.body.is_Rep;
    if (req.body.cod_cli) {
      client.cod_cli = req.body.cod_cli;
    }
    if (!req.body.cod_rep) {
      client.cod_rep = "";
    } else {
      client.cod_rep = req.body.cod_rep || client.cod_rep;
    }
    const updatedClient = await client.save();
    res.json({
      _id: updatedClient._id,
      cod_cli: updatedClient.cod_cli,
      nom_cli: updatedClient.nom_cli,
      email_cli: updatedClient.email_cli,
      adr_cli: updatedClient.adr_cli,
      tel_cli: updatedClient.tel_cli,
      tarif_cli: updatedClient.tarif_cli,
      photo_cli: updatedClient.photo_cli,
      is_Rep: updatedClient.is_Rep,

      token: generateToken(updatedClient._id),
    });
    console.log(updatedClient);
  } else {
    res.status(404);
    throw new Error("Client non existantes");
  }
});
// @desc Supprimer un utilisateur
// @route DELETE /api/utilisateurs/:id
// @accés Privé/Admin
const suppClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (client) {
    await client.remove();
    res.json({ message: "Client supprimer!" });
  } else {
    res.status(404);
    throw new Error("Client non existant!");
  }
});

// @desc Selectionner client  by id
// @route GET /api/utilisateurs/:id
// @accés privé/Admin
const getClientById = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (client) {
    res.json(client);
  } else {
    res.status(404);
    throw new Error("Client non existant!");
  }
});
// @desc Mis a jour  client
// @route PUT /api/utilisateurs/:id
// @accés Privé/admin
const updateClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);
  console.log(req.body);
  if (client) {
    console.log(req.body);
    client.nom_cli = req.body.nom_cli || client.nom_cli;
    client.email_cli = req.body.email_cli || client.email_cli;
    client.tel_cli = req.body.tel_cli || client.tel_cli;
    client.photo_cli = req.body.photo_cli || client.photo_cli;
    client.adr_cli = req.body.adr_cli || client.adr_cli;
    client.tarif_cli = req.body.tarif_cli || client.tarif_cli;
    client.cod_rep = req.body.cod_rep || client.cod_rep;
    client.is_Rep = req.body.is_Rep || client.is_Rep;
    const updatedClient = await client.save();
    res.json({
      _id: updatedClient._id,
      cod_cli: updatedClient.cod_cli,
      nom_cli: updatedClient.nom_cli,
      email_cli: updatedClient.email_cli,
      adr_cli: updatedClient.adr_cli,
      tel_cli: updatedClient.tel_cli,
      tarif_cli: updatedClient.tarif_cli,
      photo_cli: updatedClient.photo_cli,
      cod_rep: updatedClient.cod_rep,
      is_Rep: updatedClient.is_Rep,
    });
  } else {
    res.status(404);
    throw new Error("Client non existant");
  }
});

export {
  getClients,
  authClient,
  getProfile,
  inscClient,
  updateProfile,
  suppClient,
  getClientById,
  updateClient,
};
