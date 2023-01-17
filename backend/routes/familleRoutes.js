import express from 'express'
import { protege, admin } from '../middleware/authMiddleware.js'

import {
  getFamilles,
  getFamilleById,
  suppFamille,
  creeFamille,
  updateFamille,
  getFamilleByNom,
} from '../controllers/familleController.js'

const router = express.Router()
router.route('/').get(getFamilles)
router.route('/:nom').get(getFamilleByNom)
router.route('/:id').get(getFamilleById)

router.route('/').post(protege, admin, creeFamille)

router.route('/:id').delete(protege, admin, suppFamille)

router.route('/:id').put(protege, admin, updateFamille)

export default router
