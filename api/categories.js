import axios from "axios";

const BASE_URL = 'http://192.168.0.206:3000';

const getCategories = async () => {
    const url = `${BASE_URL}/categories/`
    let response = await axios.get(url);
    return response.data;
}

export { getCategories };