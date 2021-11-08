import axios from 'axios'
import { response } from 'express'
import { Place } from '../models/place.js'
import { Profile } from '../models/profile.js'

function toBoroughs(req, res){
    res.render('places/boroughs', {
        title: 'Boroughs',
        user: req.user ? req.user : null
    })
}

function toActivities(req, res){
    // borough = req.body.borough
    // req.body.borough = borough.toUTCString()

    //AXIOS is necessary here if we want to preview the kinds of activities the payload borough has
    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.body.borough}&key=${process.env.API_KEY}`)
    .then(response => {
        console.log(response)
        res.render('places/activities', {
            title: 'Outings',
            borough: req.body.borough,
            user: req.user ? req.user : null,
            results: response.data.results

        })
    })
    .catch(err =>{
        res.redirect('places/boroughs')
    })
}

function list(req,res){
    const name = Object.keys(req.body)[0]
    const place = Object.values(req.body)[0]
    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${name}&type=${place}&key=${process.env.API_KEY}`)
    .then(response => {
        console.log(req.body)
        console.log(name)
        console.log(place)
        
        
        res.render('places/list', {
            title: 'place List',
            user: req.user ? req.user : null,
            results: response.data.results
        })
    })
    .catch(err =>{
        res.redirect('places/boroughs')
    })
}

function show(req,res){
    console.log(req.params.id)
    axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.params.id}&key=${process.env.API_KEY}`)
    .then(response =>{
        
        Place.findOne({ placesId: response.data.place_id})
        .populate('addedBy')
        .then(place =>{
            res.render('places/show', {
                title: 'Details',
                result: response.data.result,
                place,
                userAddedPlace: place?.addedBy.some(profile => profile._id.equals(req.user.profile._id)),
                user: req.user ? req.user : null

            })
        })
    })
}

function addToCollection(req, res) {
    // Check to see if place is already in our database
    Place.findOne({ placesId: req.params.id })
    .then(place => {
      if (place) { // <<-- If it is in the database
        // Push the user's profile id into the collectedBy array
        place.addedBy.push(req.user.profile._id)
        // Save the document
        place.save()
        .then(()=> {
          // Redirect back to the place's show view
          res.redirect(`/places/list`)
        })
      } else {  // <<-- If it is NOT in the database
          // Create a new place using the model
          req.body.addedBy = req.user.profile._id
          Place.create(req.body)
          .then(()=> {
            // Redirect back to the place's show view
            res.redirect(`/places/list`)
          })
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }

  function removeFromCollection(req, res) {
    // Find the game in the database
    Place.findOne({ rawgId: req.params.id })
    .then(place => {
      // Remove the user's profile id from the collectedBy
      place.collectedBy.remove({ _id: req.user.profile._id })
      // Save the document
      place.save()
      .then(()=> {
        // Redirect back to the game's show view
        res.redirect(`/places/list`)
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }    
        
        


export {
    toBoroughs,
    toActivities,
    list,
    show,
    addToCollection,
    removeFromCollection
}