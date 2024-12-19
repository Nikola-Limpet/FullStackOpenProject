import axios from 'axios'

const baseURL = '/api/notes'


const getAll = () => {
  const req = axios.get(baseURL)
  return req.then(res => res.data)
}

const create = (newObject) => {
  const req = axios.post(baseURL, newObject)
  return req.then(response => response.data)
}

const update = (id , newObject) => {
  const req = axios.put(`${baseURL}/${id}`, newObject)
  return req.then(response => response.data)
}

export default {
  getAll,
  create,
  update
}