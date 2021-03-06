import axios from 'axios'
import { Profile } from '../models/profile.js'
import { Place } from '../models/place.js'

function index(req,res){
    Profile.find({})
    .then(profiles => {
        console.log(profiles)
    res.render('profiles/index', {
        title: 'User Profiles',
        profiles,
        user: req.user ? req.user : null

    })
})
}

function show(req, res) {
    // Find the profile for the user that was clicked
    Profile.findById(req.params.id)
    .populate('friends')
    .then(profile => {
      Place.find({addedBy: req.params.id})
      .then(places => {
      // Find the profile for the current logged in user (to check friend list)
      Profile.findById(req.user.profile)
      .then(userProfile => {
        

        res.render('profiles/show', {
          title: `${profile.name}'s Profile`,
          profile,
          places,
          userProfile,
          user: req.user ? req.user : null
        })
      })
    })
  })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }

  function addFriend(req, res) {
    // Look up the logged in user's profile
    Profile.findById(req.user.profile)
    .then(profile => {
      // Push the ObjectId of the friend being added (req.params.id) into friends array
      profile.friends.push(req.params.id)
      // Save the instance of the document
      profile.save()
      .then(()=> {
        // Redirect back to the profile's show view
        res.redirect(`/profiles/${req.params.id}`)
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }

  function addFollower(req, res) {
    Profile.findById(req.user.profile)
    .then(profile => {
      profile.followers.push(req.params.id)
      profile.save()
      .then(() => {
        console.log(profile)
        res.json(profile)
      })
    })
    .catch(err => {
      console.log(err)
      res.json(err)
    })
  }


  function removeFriend(req, res) {
    // Look up the logged in user's profile
    Profile.findById(req.user.profile)
    .then(profile => {
      // Remove the ObjectId of the friend being removed (req.params.id) from friends array
      profile.friends.remove({_id: req.params.id})
      // Save the instance of the document
      profile.save()
      .then(()=> {
        // Redirect back to the profile's show view
        res.redirect(`/profiles/${req.params.id}`)
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }

export{
    index,
    show,
    addFriend,
    removeFriend
}