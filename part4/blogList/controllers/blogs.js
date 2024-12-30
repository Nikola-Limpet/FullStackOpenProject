const Router = require('express').Router();

// get blog schema 
const Blog = require('../models/blog')

Router.get('/', (req, res, next) => {
  Blog.find({})
  .then(blog => res.json(blog))
  .catch(err => next(err))
})

Router.post('/', (req, res, next) => {
  const blog = new Blog(req.body)
  
  blog.save()
  .then(result => {
    res.status(201).json(result)
  })
  .catch(err => next(err))
})


module.exports = Router