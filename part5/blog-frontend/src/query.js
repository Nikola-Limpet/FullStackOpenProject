import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import blogService from './services/blogs'

export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })
}

export const useCreateBlog = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']) || []
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
    }
  })
}

export const useLikeBlog = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, blog }) => blogService.update(id, blog),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], 
        blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b)
      )
    }
  })
}

export const useDeleteBlog = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: blogService.remove,
    onSuccess: (_, id) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], 
        blogs.filter(b => b.id !== id)
      )
    }
  })
}