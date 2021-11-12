import axios from 'axios'
import { Post } from '../models/post.js'

function index(req, res) {
    Post.find({})
    .populate('author')
    .sort({createdAt: "asc"})
    .then((posts) => {
      res.render('posts/index', {
        title: 'Posts Board',
        posts: posts.reverse(),
        user: req.user ? req.user : null
      })
    })
  }

  function create(req, res) {
    req.body.author = req.user.profile._id
    Post.create(req.body)
    .then(()=> {
      res.redirect('/posts')
    })
  }

  function show(req, res) {
    Post.findById(req.params.id)
    .populate('author')
    .populate({
      path: 'replies',
      populate: {
        path: 'author'
      }
    })
    .then((post )=> {
      res.render('posts/show', {
        title: 'Message Details',
        post,
        user: req.user ? req.user : null
      })
    })
  }

  function reply(req, res) {
    Post.findById(req.params.id)
    .then((post)=> {
      req.body.author = req.user.profile._id
      post.replies.push(req.body)
      post.save()
      .then(()=> {
        res.redirect(`/posts/${req.params.id}`)
      })
    })
  }

  function deletePost(req, res){
      Post.findByIdAndDelete(req.params.id, function(err,post){
      res.redirect('/posts')
      })
  }
  
  export { 
      index,
      create,
      show,
      reply,
      deletePost as delete

}