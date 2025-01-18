import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    addBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input
          name="Title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Title"
        />
      </div>
      <div>
        author
        <input
          name="Author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="Author"
        />
      </div>
      <div>
        url
        <input
          name="Url"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="Url"
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm