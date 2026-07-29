import axios from "axios";
// const BASEURL = import.meta.env.VITE_LOCAL_IP
const PORT = import.meta.env.VITE_PELIAS_PORT
const IP = import.meta.env.VITE_LOCAL_IP

const PELIAS_API = `${IP}:${PORT}`;

const searchClient = axios.create({
                                    baseURL: PELIAS_API,
                                    timeout: 5000,
                                  });

searchClient.interceptors.response.use(
                                      (response) => response,
                                      async (error) =>
                                      {
                                        return Promise.reject(error)
                                      }
                                    )

export default searchClient;
