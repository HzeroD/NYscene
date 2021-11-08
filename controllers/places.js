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
            title: 'Place List',
            user: req.user ? req.user : null,
            results: response.data.results
        })
    })
    .catch(err =>{
        res.redirect('places/boroughs')
    })
}

function show(req,res){
    axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.params.id}&key=${process.env.API_KEY}`)
    .then(results =>{
        Place.findOne({ placesId: req.params.id})
        .populate('addedBy')
        .then(place =>{
            res.render('places/show', {
                title: 'Details',
                result: response.data.results,
                place,
                userAddedPlace: place?.addedBy.some(place => place._id.equals())
            })
        })
        
        
        )
}

export {
    toBoroughs,
    toActivities,
    list,
    show
}