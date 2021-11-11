import { Place } from '../models/place.js'
import { Review } from '../models/review.js'

function create(req, res) {
  // Add additional properties to req.body needed to create a review
  req.body.author = req.user.profile._id
  req.body.place = req.params.id
  // Create new review using req.body
  Review.create(req.body)
  .then(review => {
    // Find the game to add the review _id to the reviews array
    Place.findById(req.params.id)
    .then(place => {
      place.reviews.push(review._id)
      place.save()
      .then(() => {
        res.redirect(`/places/${place.placesId}`)
      })
    })
  })
}

export {
  create
}