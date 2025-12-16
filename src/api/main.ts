import axios from "axios"
// import * as dotenv from "dotenv"

// dotenv.config()
const VITE_EDITOR_API = import.meta.env.VITE_EDITOR_API
const TIMEOUT = import.meta.env.TIMEOUT

const apiClient = axios.create({
  baseURL: VITE_EDITOR_API,
  timeout: TIMEOUT,
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error)
  }
)

export default apiClient
