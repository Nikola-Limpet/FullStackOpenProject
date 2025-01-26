import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useState } from 'react'

const BlogView = () => {
  const { id } = useParams()
  const { data: blog, isLoading } = useQuery({
    queryKey: ['blogs', id],
    queryFn: () => blogService.getOne(id)
  })

  const queryClient = useQueryClient()
  const commentMutation = useMutation({
    mutationFn: ({ id, comment }) => blogService.comment(id, comment),
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blogs', id], updatedBlog)
    }
  })

  const handleLikeClick = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    await blogService.update(blog.id, updatedBlog)
    queryClient.setQueryData(['blogs', blog.id], updatedBlog)
  }

  if (isLoading) return <div>Loading...</div>
  if (!blog) return <div>Blog not found</div>

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>{blog.likes} likes</div> <button className="like-button" onClick={handleLikeClick}>like</button> <br />
      <div>added by {blog.user.name}</div>

      <h3>comments</h3>
      <CommentForm onSubmit={(comment) =>
        commentMutation.mutate({ id: blog.id, comment })
      } />
      <ul>
        {blog.comments ? blog.comments.map((comment, i) =>
          <li key={i}>{comment}</li>
        ) : <li>No comments yet</li>}
      </ul>
    </div>
  )
}

const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState('')

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      onSubmit(comment)
      setComment('')
    }}>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">add comment</button>
    </form>
  )
}

export default BlogView