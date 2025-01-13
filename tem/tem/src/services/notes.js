import axios from 'axios'

const baseURL = '/api/notes'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const req = axios.get(baseURL)
  return req.then(res => res.data)
}

const create = async (newObject) => {
  // get token and add the to the header Authorization
  const config = {
    headers: { Authorization: token },
  }
  
  const res = await axios.post(baseURL, newObject, config)
  return res.data
}

const update = (id , newObject) => {
  const req = axios.put(`${baseURL}/${id}`, newObject)
  return req.then(response => response.data)
}

export default {
  getAll,
  create,
  update,
  setToken
}