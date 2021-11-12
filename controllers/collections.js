import axios from 'axios'
import { response } from 'express'
import { Place } from '../models/place.js'

function index(req,res){
        Place.find({addedBy: req.user.profile._id})
        .then(places =>{
            let references = []
            for(let i = 0; i < places.length; i++){
                axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${places[i].name}&key=${process.env.API_KEY}`)
                .then(response => {
                    references = response.data.results[0].photos[0].photo_reference
                }
                )}
            
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
              console.log(place)
                res.render('collections/show', {
                    title: 'Details',
                    result: response.data,
                    place,
                    userAddedPlace: true,
                    user: req.user ? req.user : null
    
                })
            })
        })
    }



export{
    index,
    show
}