const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')





blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs).status(200)
  } catch (exception) {
    next(exception)
  }
})

blogRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const blog = await Blog.findById(id).populate('user', { username: 1, name: 1 })
    if (!blog) {
      return res.status(404).json({ error: 'blog not found' })
    }
    res.json(blog).status(200)
  } catch (err) {
    next(err)
  }
})


blogRouter.post('/:id/comments', async (req, res, next) => {
  const { id } = req.params
  const { comment } = req.body

  try {
    const blog = await Blog.findById(id)
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }

    blog.comments = blog.comments.concat(comment)
    const updatedBlog = await blog.save()

    res.status(200).json(updatedBlog)
  } catch (err) {
    next(err)
  }
})


blogRouter.post('/', async (req, res, next) => {
  const body = req.body
  
  try {
    const user = req.user // get specific user who holding the token from userExtractor middleware
    if (!user) {
      return res.status(401).json({ error: 'token invalid or user not found'})
    }


    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
  } catch (err) {
    next(err)
  }
})

blogRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id  
  try {
    const user = req.user
    if (!user) {
      return res.status(401).json({ error: 'token invalid or user not found'})
    }
    
    const blog = await Blog.findById(id)
    if (!blog) {
      return res.status(404).json({ error: 'blog not found' })
    }
    
    if (blog.user.toString() !== user.id.toString()) {
      return res.status(403).json({ error: 'permission denied' })
    }

    await Blog.findByIdAndDelete(id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

blogRouter.put('/:id', async (req, res, next) => {
  const id = req.params.id
  const body = req.body

  try {
    const updateBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateBlog, { new: true })
    res.status(200).json(updatedBlog)
  } catch (err) {
    next(err)
  }
})

module.exports = blogRouter