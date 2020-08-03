import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fathomless-stream-35956.herokuapp.com',
});

export default api;
