import * as postsCtrl from "../controllers/posts.js"
import { Router } from 'express'
const router = Router()

router.get('/', isLoggedIn, postsCtrl.index)
router.post('/', isLoggedIn, postsCtrl.create)
router.get('/:id', isLoggedIn, postsCtrl.show)
router.post('/:id', isLoggedIn, postsCtrl.reply)
router.delete('/:id', isLoggedIn, postsCtrl.delete)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }

export{
    router
}