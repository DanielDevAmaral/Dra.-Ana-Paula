const dotenv = require('dotenv');
import axios from "axios";
dotenv.config();

const api = axios.create({
  baseURL: `https:localhost:${process.env.PORT || 5000}`
});

export default api;