import express from 'express'
import { protege, admin } from '../middleware/authMiddleware.js'

import {
  getArticles,
  getArticleById,
  suppArticle,
  creeArticle,
  updateArticle,
  getArticleByFamille,
  getArticleByNom,evaluationArticle 
} from '../controllers/articleController.js'

const router = express.Router()

router.route('/').get(getArticles)
router.route('/').post(protege, admin, creeArticle)
router.route('/details/:id').get(getArticleById)
router.route('/:nom').get(getArticleByNom)
router.route('/:id').delete(protege, admin, suppArticle)

router.route('/:id').put(protege, admin, updateArticle)
router.route('/famille/:id').get(getArticleByFamille)
router.route('/evaluation/:id').put(evaluationArticle)
export default router
