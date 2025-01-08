const blogRouter = require('express').Router();

// get blog schema 
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res, next) => {
  try {
    const blog = await Blog.find({})
    res.json(blog).status(200)

  } catch (exception) {
    next(exception)
  }
})

blogRouter.post('/', async (req, res, next) => {
  const body = req.body;
  // if (!body.title || !body.author || !body.url || !body.likes) {
  //   return res.status(400).json({ error: 'all fields are required' })
  // }
  try {
    const blog = new Blog(body)
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
  } catch(err) {
    next(err)
  } 
})


module.exports = blogRouter