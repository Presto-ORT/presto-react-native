import axios from "axios";

// const BASE_URL = 'http://192.168.0.206:3000'; // LEO
const BASE_URL = 'http://192.168.0.28:3000'; // LUCHO

const getExample = async () => {
    const url = "https://api2.binance.com/api/v3/ticker/24hr";
    return await axios.get(url)
}

const register = async (name, email, password) => {
    const url = `${BASE_URL}/users/register`

    let response = await axios.post(url, { name, email, password });

    return response.data;
}

const login = async (email, password) => {
    const url = `${BASE_URL}/users/login`

    let response = await axios.post(url, { email, password });

    return response.data;
}

export { getExample, login, register }