import axios from "axios";
import { retrieveToken } from "../services/internalStorage";

// const BASE_URL = 'http://192.168.0.206:3000'; // LEO
const BASE_URL = 'http://192.168.0.28:3000'; // LUCHO

const getReport = async () => {
    const url = `${BASE_URL}/reports`
    let token = await retrieveToken();
    let response = await axios.get(url, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
}

export { getReport };