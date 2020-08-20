import axios from 'axios';

const instance = axios.create({ 
    baseURL: 'https://note-taking-138bb.firebaseio.com/'
});

export default instance;