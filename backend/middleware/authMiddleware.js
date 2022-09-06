import jwt from 'jsonwebtoken'
import Utilisateur from '../models/utilisateurModel.js'
import asyncHandler from 'express-async-handler'

const protege = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.utilisateur = await Utilisateur.findById(decoded.id).select('-mdp')
      console.log(req.utilisateur)
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new error('token non authorisé')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('accés non authorisé')
  }
})
const admin = (req, res, next) => {
  if (req.utilisateur && req.utilisateur.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('accés non authorisé')
  }
}
export { protege, admin }
