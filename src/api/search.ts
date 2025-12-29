import axios from "axios";

// Add VITE_PELIAS_API=http://localhost:4000 to your .env
const PELIAS_API = `${import.meta.env.VITE_LOCAL_IP}:4000` || 'http://localhost:4000';

const searchClient = axios.create({
  baseURL: PELIAS_API,
  timeout: 5000,
});

export default searchClient;