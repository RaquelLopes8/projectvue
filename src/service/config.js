import axios from 'axios';

export const http = axios.create({
    baseURL: 'https://produtos-apirest.herokuapp.com/api/'
});