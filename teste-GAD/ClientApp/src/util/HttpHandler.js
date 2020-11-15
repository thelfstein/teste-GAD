import axios from "axios"

const BASE_URL = 'api/'

export const MakeRequest = ({ method = 'GET', url, data = null, params = null, headers = null }) => {
    return axios({
        method,
        url: `${BASE_URL}${url}`,
        data,
        params,
        headers
    });
}