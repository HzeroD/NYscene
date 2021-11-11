import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
    rating: {type: Number, min: 1, max: 5},
    content: String,
    place: [{type: Schema.Types.ObjectId, ref: 'Place'}],
    author: {type: Schema.Types.ObjectId, ref:'Profile'}
})

const Review = mongoose.model('Review', reviewSchema)

export {
    Review
}