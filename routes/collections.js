import { Router } from 'express'
import * as collectionsCtrl from '../controllers/collections.js'
const router = Router()

router.get('/', isLoggedIn, collectionsCtrl.index)



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }


  export {
      router
  }