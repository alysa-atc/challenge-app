import axios from 'axios'

const API_URL = 'http://sofia.users.challenge.dev.monospacelabs.com/'

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json'
  }
})