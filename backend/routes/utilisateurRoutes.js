import express from 'express'
import { protege, admin } from '../middleware/authMiddleware.js'
import {
  getUtilisateurs,
  authUtilisateur,
  getProfile,
  inscUtilisateur,
  updateProfile,
  suppUtilisateur,
  getUtilisateurById,
  updateUtilisateur,
} from '../controllers/utilisateurController.js'

const router = express.Router()
router.route('/').get(protege, admin, getUtilisateurs)
router.route('/login').post(authUtilisateur)
router.route('/profile').get(protege, getProfile)
router.route('/profile').put(protege, updateProfile)
router.route('/').post(inscUtilisateur)
router.route('/:id').delete(protege, admin, suppUtilisateur)
router.route('/:id').get(protege, admin, getUtilisateurById)
router.route('/:id').put(protege, admin, updateUtilisateur)

export default router
