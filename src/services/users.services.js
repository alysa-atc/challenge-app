import axios from './axios'

const getAllUsers = () => {
  return axios.get('/users')
}

const updateUser = (id, user) => {
  return axios.put(`/users/${user.id}`, user)
}

const Services = {
  getAllUsers,
  updateUser
}

export default Services
