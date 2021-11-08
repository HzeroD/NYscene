import mongoose from 'mongoose'

const Schema = mongoose.Schema

const placeSchema = new Schema({
    name: String,
    placesId: String,
    imageURL: String,
    addedBy: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
})

const Place = mongoose.model('Place', placeSchema)

export{
    Place
}