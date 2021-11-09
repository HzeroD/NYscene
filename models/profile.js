import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  bio: String,
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
  friends: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  places: [{type: Schema.Types.ObjectId, ref: 'Place'}],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}