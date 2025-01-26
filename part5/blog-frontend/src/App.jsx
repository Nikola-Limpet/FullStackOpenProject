import { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useBlogs, useCreateBlog, useLikeBlog, useDeleteBlog } from './query'
import { useNotification } from './reducers/notificationContext'
import { useUser } from './reducers/userContext'
import { Routes, Route, Link } from 'react-router-dom'
import Navigation from './components/Navigation'
import Users from './views/Users'
import User from './views/User'
import BlogView from './components/BlogView'
import './index.css'
import Blog from './components/Blog'

const App = () => {
  const { data: blogs, isLoading } = useBlogs()
  const createBlogMutation = useCreateBlog()
  const likeBlogMutation = useLikeBlog()
  const deleteBlogMutation = useDeleteBlog()
  const [user, userDispatch] = useUser()
  const [notification, notificationDispatch] = useNotification()
  const blogFormRef = useRef()

  useEffect(() => {
    const userLoggedJSON = window.localStorage.getItem('loggedToBlogApp')
    if (userLoggedJSON) {
      const user = JSON.parse(userLoggedJSON)
      userDispatch({ type: 'SET', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedToBlogApp', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: 'SET', payload: user })
      notificationDispatch({
        type: 'SET',
        payload: { message: 'Login successful', type: 'success' }
      })
    } catch (error) {
      notificationDispatch({
        type: 'SET',
        payload: { message: 'Wrong username or password', type: 'error' }
      })
    }
  }

  const handleLogout = () => {
    userDispatch({ type: 'CLEAR' })
    window.localStorage.removeItem('loggedToBlogApp')
    notificationDispatch({
      type: 'SET',
      payload: { message: 'Logged out', type: 'success' }
    })
  }

  const addBlog = async (newBlog) => {
    try {
      await createBlogMutation.mutateAsync(newBlog)
      blogFormRef.current.toggleVisibility()
      notificationDispatch({
        type: 'SET',
        payload: {
          message: `A new blog ${newBlog.title} by ${newBlog.author} added`,
          type: 'success'
        }
      })
    } catch (error) {
      notificationDispatch({
        type: 'SET',
        payload: { message: 'Failed to add blog', type: 'error' }
      })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Navigation user={user} handleLogout={handleLogout} />
      <h2>blogs</h2>
      {notification && <div className={notification.type}>{notification.message}</div>}
      {!user ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <Routes>
          <Route path="/" element={
            <div>
              <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm addBlog={addBlog} />
              </Togglable>
              {blogs.map(blog => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateBlog={likeBlogMutation.mutate}
                  removeBlog={deleteBlogMutation.mutate}
                  user={user}
                />
              ))}
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogView />} />
        </Routes>
      )}
    </div>
  )
}

export default App