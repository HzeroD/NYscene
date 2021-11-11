import * as reviewsCtrl from "../controllers/reviews.js"
import { Router } from 'express'
const router = Router()

// http://localhost:3000/reviews/:id
router.post('/:id', isLoggedIn, reviewsCtrl.create)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

export {
  router
}