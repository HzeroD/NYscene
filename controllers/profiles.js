import axios from 'axios'
import { Profile } from '../models/profile.js'

function index(req,res){
    Profile.find({})
    .then(profiles => {
        console.log(profiles)
    res.render('profiles/index', {
        title: 'User Profiles',
        profiles

    })
})
}

function show(req, res) {
    // Find the profile for the user that was clicked
    Profile.findById(req.params.id)
    .populate('friends')
    .then(profile => {
      // Find the profile for the current logged in user (to check friend list)
      Profile.findById(req.user.profile)
      .then(userProfile => {
        res.render('profiles/show', {
          title: `${profile.name}'s Profile`,
          profile,
          userProfile,
          user: req.user ? req.user : null
        })
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }

export{
    index,
    show
}