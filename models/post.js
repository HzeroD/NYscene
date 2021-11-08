import mongoose from 'mongoose'

const Schema = mongoose.Schema

const replySchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'Profile'},
    content: String
})

const postSchema = new Schema({
    title: String,
    content: String,
    author: {type: Schema.Types.ObjectId, ref: 'Profile'},
    replies: [replySchema]
})

const Post = mongoose.model('Post', postSchema)

export{
    Post
}