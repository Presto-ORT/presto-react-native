import axios from "axios";

// const BASE_URL = 'http://192.168.0.206:3000'; // LEO
const BASE_URL = 'http://192.168.0.28:3000'; // LUCHO

const getCategories = async () => {
    const url = `${BASE_URL}/categories/`
    let response = await axios.get(url);
    return response.data;
}

export { getCategories };