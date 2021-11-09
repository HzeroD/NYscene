import axios from 'axios'
import { response } from 'express'
import { Place } from '../models/place.js'

function index(req,res){
        Place.findById(req.params.id)
        .then(places =>{
            
            console.log(places)
            res.render('collections/index', {
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
        
        Place.findOne({ placesId: response.data.place_id})
        .populate('addedBy')
        .then(place =>{
            res.render('collections/show', {
                title: 'Details',
                result: response.data.result,
                place,
                userAddedPlace: false,
                user: req.user ? req.user : null

            })
        })
    })
}

export{
    index,
    show
}