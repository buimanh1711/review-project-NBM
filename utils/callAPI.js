import * as config from '../constant/config';
import axios from 'axios';

const url = 'https://5fa276c6ba0736001613bad1.mockapi.io/test_nextJS';
export function callAPI() {
    return axios({
        method: "GET",
        url: url,
        // url: `${config.API_URL}/${endpoint}`,
        data: null
    })
}    