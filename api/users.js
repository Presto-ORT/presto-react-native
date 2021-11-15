import axios from "axios";
import { Value } from "react-native-reanimated";

const getExample = async () => {
    const url = "https://api2.binance.com/api/v3/ticker/24hr";
    return await axios.get(url)
}

const register = async (name, email, password) => {
    const url = "http://localhost:3000/users/register"
    let response = await axios.post(url, { name, email, password });
    console.log(response.data);
}

const login = async (email, password) => {

    console.log('press login api');
    const url = "http://192.168.0.28:3000/users/login"
    console.log(email, password);

    let response = await axios.post(url, { email, password });

    return response.data;
}

export { getExample, login }