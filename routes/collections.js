import { Router } from 'express'
import * as collectionsCtrl from '../controllers/collections.js'
const router = Router()

router.get('/', isLoggedIn, collectionsCtrl.index)
router.get('/:id', isLoggedIn, collectionsCtrl.show)
router.patch('/:id/addToCollection', isLoggedIn, collectionsCtrl.addToCollection)
router.patch('/:id/removeFromCollection', isLoggedIn, collectionsCtrl.removeFromCollection)




function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }


  export {
      router
  }