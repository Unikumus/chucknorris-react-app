import axios from 'axios';

const axiosInstance = axios.create(
    {
        baseURL: 'https://api.chucknorris.io/jokes/',
    }
);



export const mainAPI = {

    getRandomJokes() {
        return  axiosInstance.get('https://api.chucknorris.io/jokes/random')
           .then(res => {
            return res.data
             })
    },

}