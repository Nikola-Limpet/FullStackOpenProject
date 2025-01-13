// const { test, after, beforeEach } = require('node:test')
// const assert = require('assert')
// const supertest = require('supertest')
// const app = require('../app')
// const Blog = require('../models/blog')
// const User = require('../models/user')
// const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const { blogInDB, initBlog } = require('./helperFun')
// const api = supertest(app)

// beforeEach(async () => {
//   await Blog.deleteMany({})
//   await User.deleteMany({})

//   const passwordHash = await bcrypt.hash('password', 10)
//   const user = new User({ username: 'testuser', passwordHash })
//   await user.save()

//   const userForToken = {
//     username: user.username,
//     id: user._id,
//   }

//   const token = jwt.sign(userForToken, process.env.SECRET)

//   for (let blog of initBlog) {
//     let blogObject = new Blog({ ...blog, user: user._id })
//     await blogObject.save()
//   }
// })

// test('get all blogs as json', async () => {
//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })

// test('id of blog is named to id instead of _id', async () => {
//   const response = await api.get('/api/blogs')
//   const responseIds = response.body.map(blog => blog.id)

//   const blogsInDb = await blogInDB()
//   assert.strictEqual(responseIds.length, blogsInDb.length)

//   response.body.forEach(blog => {
//     assert(blog.id)
//     assert(!blog._id)
//   })
// })

// test('add a new blog post and total number increase by one', async () => {
//   const user = await User.findOne({ username: 'testuser' })
//   const userForToken = {
//     username: user.username,
//     id: user._id,
//   }

//   const token = jwt.sign(userForToken, process.env.SECRET)

//   const newBlog = {
//     title: 'New Post Test',
//     author: 'Yuujin',
//     url: 'www.google.com',
//     likes: 44
//   }

//   await api
//     .post('/api/blogs')
//     .set('Authorization', `Bearer ${token}`)
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//   const blogs = await blogInDB()
//   assert.strictEqual(blogs.length, initBlog.length + 1)

//   const titlePost = blogs.map(blog => blog.title)
//   assert(titlePost.includes('New Post Test'))
// })

// test('adding a blog fails with status code 401 if token is not provided', async () => {
//   const newBlog = {
//     title: 'New Blog',
//     author: 'New Author',
//     url: 'http://newurl.com',
//     likes: 5,
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(401)
//     .expect('Content-Type', /application\/json/)

//   const blogsAtEnd = await Blog.find({})
//   assert.strictEqual(blogsAtEnd.length, initBlog.length)
// })

// test('if the likes property is missing from the request, it will default to the value 0.', async () => {
//   const user = await User.findOne({ username: 'testuser' })
//   const userForToken = {
//     username: user.username,
//     id: user._id,
//   }

//   const token = jwt.sign(userForToken, process.env.SECRET)

//   const newBlog = {
//     title: 'New Post Test',
//     author: 'Yuujin',
//     url: 'www.google.com',
//   }

//   await api
//     .post('/api/blogs')
//     .set('Authorization', `Bearer ${token}`)
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//   const blogs = await blogInDB()
//   const defaultLikeObj = blogs.find(b => b.likes === 0)
//   assert.strictEqual(defaultLikeObj.likes, 0)
// })

// test('verify that if the title or url properties are missing from the request data, responds to the request 400', async () => {
//   const user = await User.findOne({ username: 'testuser' })
//   const userForToken = {
//     username: user.username,
//     id: user._id,
//   }

//   const token = jwt.sign(userForToken, process.env.SECRET)

//   const newBlog = {
//     // missing fields
//     url: 'www.google.com',
//   }

//   await api
//     .post('/api/blogs')
//     .set('Authorization', `Bearer ${token}`)
//     .send(newBlog)
//     .expect(400)
//     .expect('Content-Type', /application\/json/)
// })

// test('delete a single note by valid id', async () => {
//   const user = await User.findOne({ username: 'testuser' })
//   const userForToken = {
//     username: user.username,
//     id: user._id,
//   }

//   const token = jwt.sign(userForToken, process.env.SECRET)

//   const blogsAtStart = await blogInDB()
//   const blogToDelete = blogsAtStart[0]

//   await api
//     .delete(`/api/blogs/${blogToDelete.id}`)
//     .set('Authorization', `Bearer ${token}`)
//     .expect(204)

//   const blogsAtEnd = await blogInDB()
//   assert.strictEqual(blogsAtEnd.length, initBlog.length - 1)

//   const titles = blogsAtEnd.map(blog => blog.title)
//   assert(!titles.includes(blogToDelete.title))
// })

// test('update an individual post', async () => {
//   const blogs = await blogInDB()
//   const blogToUpdate = blogs[0]

//   const updateBlog = {
//     title: 'This should be the first blog now',
//     author: 'Yuujin',
//     url: 'www.google.com',
//     likes: 999
//   }

//   await api
//     .put(`/api/blogs/${blogToUpdate.id}`)
//     .send(updateBlog)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   const updatedBlog = await Blog.findById(blogToUpdate.id)
//   assert.strictEqual(updatedBlog.title, updateBlog.title)
//   assert.strictEqual(updatedBlog.author, updateBlog.author)
//   assert.strictEqual(updatedBlog.url, updateBlog.url)
//   assert.strictEqual(updatedBlog.likes, updateBlog.likes)
// })

// after(async () => {
//   await mongoose.connection.close()
// })