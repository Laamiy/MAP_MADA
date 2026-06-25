import axios from "axios";
const BASEURL = import.meta.env.VITE_LOCAL_IP
const PORT = import.meta.env.VITE_PELIAS_PORT

const PELIAS_API = `${BASEURL}:${PORT}`;

const searchClient = axios.create({
                                    baseURL: PELIAS_API,
                                    timeout: 5000,
                                  });

export default searchClient;