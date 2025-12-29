import axios from "axios"

// dotenv.config()
const PORT  = 4004 ; 
const VITE_EDITOR_API   = `${import.meta.env.VITE_LOCAL_IP}:${PORT}` || `http://localhost:${PORT}`;
const TIMEOUT  : number = import.meta.env.TIMEOUT; 

const apiClient = axios.create(
  {
    baseURL: VITE_EDITOR_API,
    timeout: TIMEOUT,
  }
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => 
  {
    return Promise.reject(error)
  }
)

export default apiClient; 
