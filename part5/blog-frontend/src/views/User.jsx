import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

const User = () => {
  const { id } = useParams()
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['users', id],
    queryFn: () => userService.getOne(id)
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching user data</div>
  if (!user) return <div>User not found</div>

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User