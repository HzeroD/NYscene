
import * as placesCtrl from "../controllers/places.js"
import { Router } from 'express'
const router = Router()


router.get('/', isLoggedIn, placesCtrl.toBoroughs)
router.post('/activities', isLoggedIn, placesCtrl.toActivities)
router.post('/:id', isLoggedIn, placesCtrl.list)
router.post('/:id', isLoggedIn, placesCtrl.show)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }


export {
    router
}
