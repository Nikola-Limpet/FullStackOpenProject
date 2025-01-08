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

blogRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    await Blog.findByIdAndDelete(id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

blogRouter.put('/:id', async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const updateBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    const updatedBlog =  await Blog.findByIdAndUpdate(id, updateBlog, { new: true })
    res.status(200).json(updatedBlog)
  } catch(err) {
    next(err)
  }
})

module.exports = blogRouter