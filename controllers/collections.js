import axios from 'axios'
import { response } from 'express'
import { Place } from '../models/place.js'

function index(req,res){
    
        Place.find({addedBy: req.user.profile._id})
        .then(places =>{
            const references = []
            for(let i = 0; i < places.length; i++){
                axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${places[i].name.toString()}&key=${process.env.API_KEY}`,function(err, response){})
                .then(response => {
                    
                    references.push(response.data.results[0].photos[0].photo_reference)
                    
                }
                )}
                console.log(places)
            
            console.log("-----------------------")
            console.log(references[0])
            
            res.render('collections', {
                title: 'My Places',
                places,
                user: req.user ? req.user : null

            })
        
        })
    }
    

    function show(req,res){
        console.log(req.params.id)
        axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.params.id}&key=${process.env.API_KEY}`)
        .then(response =>{
          console.log(req.params.id)
          
            Place.findOne({placesId: req.params.id})
            .populate('addedBy')
            .then(place =>{
                console.log("***************")
              
                res.render('collections/show', {
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
        Place.findOne({placesId: req.params.id})
        .then(place => {
          if (place) { // <<-- If it is in the database
            // Push the user's profile id into the addedBy array
            place.addedBy.push(req.user.profile._id)
            // Save the document
            place.save()
            .then(()=> {
              // Redirect back to the place's show view
              res.redirect(`/collections/${req.params.id}`)
            })
          } else {  // <<-- If it is NOT in the database
              // Create a new place using the model
              req.body.placesId = req.params.id
              req.body.addedBy = req.user.profile._id
              Place.create(req.body)
              .then(()=> {
                // Redirect back to the place's show view
                res.redirect(`/collections/${req.params.id}`)
              })
          }
        })
        .catch(err => {
          console.log(err)
          res.redirect('/')
        })
      }


    function removeFromCollection(req, res) {
        // Find the place in the database
        Place.findOne({ placesId: req.params.id })
        .then(place => {
          // Remove the user's profile id from the addedBy
          place.addedBy.remove({ _id: req.user.profile._id })
          // Save the document
          place.save()
          .then(()=> {
            // Redirect back to the place's show view
            res.redirect(`/collections/${req.params.id}`)
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
    removeFromCollection,
    addToCollection
}