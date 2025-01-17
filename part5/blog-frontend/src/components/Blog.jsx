import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, updateBlog }) => {

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleLikeClick = async () => {
    const updatedBlog = {
      ...blog,
      likes: likes + 1
    }
    await blogService.update(blog.id, updatedBlog) // update the blog in the database
    setLikes(likes + 1) // update the likes in the state of the Blog component
    updateBlog(blog.id, updatedBlog) // update the blog in the state of the App component
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (

    <div style={blogStyle}>
      {visible ? (
        <div>
          {blog.title} <br />
          {blog.url} <br />
          {blog.likes} <button onClick={handleLikeClick}>like</button> <br />
          {blog.author} <br />
        </div>
      ) : (
        <div>
          {blog.title}
        </div>
      )}
      <div>
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>


    </div>
  )
}
export default Blog