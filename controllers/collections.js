import axios from 'axios'
import { response } from 'express'
import { Place } from '../models/place.js'

function index(req,res){
        Place.find({})
        .then(places =>{
            
            console.log(places)
            res.render('collections/index', {
                title: 'My Places',
                places,
                user: req.user ? req.user : null

            })
        
        })
    }
    



export{
    index
}