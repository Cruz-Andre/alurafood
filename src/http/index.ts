import axios from 'axios'

//a url base do site/servidor hospedado.
const http = axios.create({
  baseURL: 'http://localhost:8000/api/v2/'
})

export default http