import React, { useState } from 'react'
import blogService from '../services/blogs'

import { Link } from 'react-router-dom'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog ? blog.likes : 0)

  if (!blog) {
    return null
  }

  const handleLikeClick = async () => {
    const updatedBlog = {
      ...blog,
      likes: likes + 1
    }
    await blogService.update(blog.id, updatedBlog)
    setLikes(likes + 1)
    updateBlog(blog.id, updatedBlog)
  }

  const handleRemovedBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await removeBlog(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="blog">
      <div className="blogTitle">
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      </div>
      <div>
        likes {likes} <button className="like-button" onClick={handleLikeClick}>like</button> <br />
        <button onClick={handleRemovedBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog