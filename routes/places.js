
import * as placesCtrl from "../controllers/places.js"
import { Router } from 'express'
const router = Router()


router.get('/', isLoggedIn, placesCtrl.toBoroughs)
router.get('/:id', isLoggedIn, placesCtrl.show)
router.post('/activities', isLoggedIn, placesCtrl.toActivities)
router.post('/list', isLoggedIn, placesCtrl.list)
router.patch('/:id/addToCollection', isLoggedIn, placesCtrl.addToCollection)
router.patch('/:id/removeFromCollection', isLoggedIn, placesCtrl.removeFromCollection )


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }


export {
    router
}
