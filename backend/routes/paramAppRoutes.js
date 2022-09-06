import express from 'express'
import {
  creeParam,
  listeParam,
  paramsParCli,
  updateParam,
  detailsParam,
  suppParam,
} from '../controllers/paramAppController.js'

const router = express.Router()
router.route('/').post(creeParam)
router.route('/').get(listeParam)
router.route('/nom/:id').get(paramsParCli)
router.route('/:id').put(updateParam)
router.route('/:id').get(detailsParam)
router.route('/:id').delete(suppParam)

export default router
