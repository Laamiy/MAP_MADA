import axios from "axios"

const PORT  = 9999 ; 
const BASEURL = import.meta.env.VITE_LOCAL_IP;

const VITE_EDITOR_API   = `${BASEURL}:${PORT}` 
const TIMEOUT           = import.meta.env.TIMEOUT; 

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
