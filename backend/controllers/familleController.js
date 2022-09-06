import express from 'express'
import Famille from '../models/familleModel.js'
import asyncHandler from 'express-async-handler'

const getFamilles = asyncHandler(async (req, res) => {
  const familles = await Famille.find({})

  res.json(familles)
})

// @desc Selectionner un article par son ID
// @route GET /api/articles/:id
// @accés public
const getFamilleById = asyncHandler(async (req, res) => {
  const famille = await Famille.findById(req.params.id)
  if (famille) {
    res.json(famille)
  } else {
    res.status(404).json({ message: 'Famille non existant' })
  }
})
// @desc    Supp article
// @route   DELETE /api/articles/:id
// @access  Private/Admin
const suppFamille = asyncHandler(async (req, res) => {
  const famille = await Famille.findById(req.params.id)

  if (famille) {
    await famille.remove()
    res.json({ message: 'famille removed' })
  } else {
    res.status(404)
    throw new Error('famille not found')
  }
})

// @desc    Crée article
// @route   POST /api/articles
// @access  Private/Admin
const creeFamille = asyncHandler(async (req, res) => {
  const famille = new Famille({
    lib_fam: 'Sample name',
    image: 'sample image',
    description: 'Sample description',
    utilisateur: req.utilisateur._id,
  })
  const familleCree = await famille.save()
  res.status(201).json(familleCree)
})
// @desc    mis a jour article
// @route   PUT /api/articles/:id
// @access  Private/Admin
const updateFamille = asyncHandler(async (req, res) => {
  const { lib_fam, image, description } = req.body
  const famille = await Famille.findById(req.params.id)
  if (famille) {
    famille.lib_fam = lib_fam
    famille.image = image
    famille.description = description
    const familleUpdated = await famille.save()
    res.status(201).json(familleUpdated)
  } else {
    res.status(404)
    throw new Error(`Famille n'existe pas!`)
  }
})
// @desc Selectionner un famille par son Nom
// @route GET /api/famille/:nom
// @accés public
const getFamilleByNom = asyncHandler(async (req, res) => {
  console.log('Debut requette')

  console.log(req.params.nom)
  const famille = req.params.nom.toUpperCase()
  //const co = lib_fam.substr(0, famille.length)

  const familles = await Famille.find({
    lib_fam: { $regex: famille, $options: 'i' },
  })
  if (familles) {
    res.json(familles)
  } else {
    res.status(404).json({ message: 'Articles de ce famille non existant' })
  }
})
export {
  getFamilles,
  getFamilleById,
  suppFamille,
  creeFamille,
  updateFamille,
  getFamilleByNom,
}
