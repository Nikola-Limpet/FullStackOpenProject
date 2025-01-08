const Blog = require('../models/blog')


const initBlog = [
  {
    id :"677216be0de74e9485a080a4",
    title:"Cam",
    author:"Yuujin",
    url:"www.google.com",
    likes: 3
  },
  {
    id:"677216f90de74e9485a080a7",
    title:"Lmao it works",
    author:"Yuujin",
    url:"www.google.com",
    likes: 33
  }
]


const blogInDB = async () => {
  // return all blog post
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}


module.exports = {
  blogInDB,
  initBlog
}