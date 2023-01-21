import axios from 'axios';
const baseURL = process.env.REACT_APP_NODE_URL;

const axiosClient = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
