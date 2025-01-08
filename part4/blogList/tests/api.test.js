const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const { blogInDB, initBlog } = require('./helperFun')
const blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  // before each test it retrive initBlog and add to the db after that delete all collections
  for (let blog of initBlog) {
    let blogObject = new Blog(blog)

    await blogObject.save()
  }
})
//Use the SuperTest library for writing a test that makes an HTTP GET request to the /api/blogs URL.
//Verify that the blog list application returns the correct amount of blog posts in the JSON format.

test.only('get all blog as json', async () => {
  
  await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)

})


// Write a test that verifies that the unique identifier property of the blog posts is named id,
//  by default the database names the property _id.

test.only('id of blog is named to id instead of _id', async () => {
 
  const response = await api.get('/api/blogs')
  const responseIds = response.body.map(blog => blog.id)
  // console.log(responseIds)

  const blogsInDb = await blogInDB() // get all blog
  assert.strictEqual(responseIds.length , blogsInDb.length)

  response.body.forEach(blog => {
    assert(blog.id)
    assert(!blog._id)
  })
})

// verifies that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post
// total number of blogs in the system is increased by one

test.only('add a new blog post and total number increase by one', async () => {

  const newBlog = {
    title:"New Post Test",
    author :"Yuujin",
    url :"www.google.com",
    likes: 44
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const blogs =  await blogInDB()

  // after add one post length should be increase by one
  assert.strictEqual(blogs.length, initBlog.length + 1)

  const titlePost = blogs.map(blog => blog.title)
  assert(titlePost.includes('New Post Test'))
})

// if the likes property is missing from the request, it will default to the value 0.
test.only('if the likes property is missing from the request, it will default to the value 0.', async () => {
  const newBlog = {
    title:"New Post Test",
    author :"Yuujin",
    url :"www.google.com",
  }
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const blogs = await blogInDB()
  
  const defaultLikeObj = blogs.find(b => b.likes === 0)
  assert.strictEqual(defaultLikeObj.likes, 0)
})


test.only('verify that if the title or url properties are missing from the request data, responds to the request 400', async () => {
  const newBlog = {
    // missing fields
    url :"www.google.com",
  }
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)
  .expect('Content-Type', /application\/json/)

})


after(async () => 
  await mongoose.connection.close()
)