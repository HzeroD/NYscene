import * as profilesCtrl from "../controllers/profiles.js"
import { Router } from 'express'
const router = Router()

router.get('/', isLoggedIn, profilesCtrl.index)
router.get('/:id', isLoggedIn, profilesCtrl.show)
router.patch('/:id/friend', isLoggedIn, profilesCtrl.addFriend)
router.patch('/:id/unfriend', isLoggedIn, profilesCtrl.removeFriend)


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }


export{
    router
}