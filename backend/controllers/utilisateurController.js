import Utilisateur from '../models/utilisateurModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

// @desc Selectionner tous les utilisateurs
// @route GET /api/utilisateurs
// @accés public/Admin
const getUtilisateurs = asyncHandler(async (req, res) => {
  const utilisateurs = await Utilisateur.find({})

  res.json(utilisateurs)
})
// @desc authentifier utilisateur et get token
// @route POST /api/utilisateurs/login
// @accés post
const authUtilisateur = asyncHandler(async (req, res) => {
  const { email, mdp } = req.body
  console.log(req.body)

  const utilisateur = await Utilisateur.findOne({ email })
 
  if (utilisateur && (await utilisateur.mdpVerif(mdp))) {
    res.json({
      _id: utilisateur._id,
      nom: utilisateur.nom,
      email: utilisateur.email,
      isAdmin: utilisateur.isAdmin,
      token: generateToken(utilisateur._id),
    })
  } else {
    res.status(401)
    throw new Error('email ou mot de passe invalide')
  }
})
// @desc retourner le profile de l'utilisateur
// @route GET /api/utilisateurs/profile
// @accés Privé
const getProfile = asyncHandler(async (req, res) => {
  const utilisateur = await Utilisateur.findById(req.utilisateur._id)
  if (utilisateur) {
    res.json({
      _id: utilisateur._id,
      nom: utilisateur.nom,
      email: utilisateur.email,
      isAdmin: utilisateur.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('Utilisateur non existant')
  }
})
// @desc inscription nouveau utilisateur
// @route POST /api/utilisateurs
// @accés public
const inscUtilisateur = asyncHandler(async (req, res) => {
  const { nom, email, mdp } = req.body

  const utilisateurExist = await Utilisateur.findOne({ email })
  if (utilisateurExist) {
    res.status(400)
    throw new Error('Utilisateur déja existant')
  }
  const utilisateur = await Utilisateur.create({
    nom,
    email,
    mdp,
  })
  if (utilisateur) {
    res.status(201).json({
      _id: utilisateur._id,
      nom: utilisateur.nom,
      email: utilisateur.email,
      isAdmin: utilisateur.isAdmin,
      token: generateToken(utilisateur._id),
    })
  } else {
    res.status(400)
    throw new Error('Données invalides')
  }
})
// @desc Mis a jour le profile de l'utilisateur
// @route PUT /api/utilisateurs/profile
// @accés Privé
const updateProfile = asyncHandler(async (req, res) => {
  const utilisateur = await Utilisateur.findById(req.utilisateur._id)
  if (utilisateur) {
    utilisateur.nom = req.body.nom || utilisateur.nom
    utilisateur.email = req.body.email || utilisateur.email
    if (req.body.mdp) {
      utilisateur.mdp = req.body.mdp
    }
    const updatedUtilisateur = await utilisateur.save()
    res.json({
      _id: updatedUtilisateur._id,
      nom: updatedUtilisateur.nom,
      email: updatedUtilisateur.email,
      isAdmin: updatedUtilisateur.isAdmin,
      token: generateToken(updatedUtilisateur._id),
    })
  } else {
    res.status(404)
    throw new Error('Utilisateur non existant')
  }
})
// @desc Supprimer un utilisateur
// @route DELETE /api/utilisateurs/:id
// @accés Privé/Admin
const suppUtilisateur = asyncHandler(async (req, res) => {
  const utilisateur = await Utilisateur.findById(req.params.id)
  if (utilisateur) {
    await utilisateur.remove()
    res.json({ message: 'Utilisateur supprimer!' })
  } else {
    res.status(404)
    throw new Error('Utilisateur non existant!')
  }
})

// @desc Selectionner utilisateur  by id
// @route GET /api/utilisateurs/:id
// @accés privé/Admin
const getUtilisateurById = asyncHandler(async (req, res) => {
  const utilisateur = await Utilisateur.findById(req.params.id).select('-mdp')
  if (utilisateur) {
    res.json(utilisateur)
  } else {
    res.status(404)
    throw new Error('Utilisateur non existant!')
  }
})
// @desc Mis a jour  l'utilisateur
// @route PUT /api/utilisateurs/:id
// @accés Privé/admin
const updateUtilisateur = asyncHandler(async (req, res) => {
  const utilisateur = await Utilisateur.findById(req.params.id)
  if (utilisateur) {
    utilisateur.nom = req.body.nom || utilisateur.nom
    utilisateur.email = req.body.email || utilisateur.email
    utilisateur.isAdmin = req.body.isAdmin
    const updatedUtilisateur = await utilisateur.save()
    res.json({
      _id: updatedUtilisateur._id,
      nom: updatedUtilisateur.nom,
      email: updatedUtilisateur.email,
      isAdmin: updatedUtilisateur.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('Utilisateur non existant')
  }
})

export {
  getUtilisateurs,
  authUtilisateur,
  getProfile,
  inscUtilisateur,
  updateProfile,
  suppUtilisateur,
  getUtilisateurById,
  updateUtilisateur,
}
