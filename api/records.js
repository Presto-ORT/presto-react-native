import axios from "axios";
import { retrieveToken } from "../services/internalStorage";

const BASE_URL = 'http://192.168.0.28:3000';

const getRecords = async () => {
    const url = `${BASE_URL}/records`

    let token = await retrieveToken();

    let response = await axios.get(url, { headers: { 'Authorization': `Bearer ${token}` } });

    return response.data;
}

const getRecord = async (id) => {
    const url = `${BASE_URL}/records/${id}`

    let token = await retrieveToken();

    let response = await axios.get(url, { headers: { 'Authorization': `Bearer ${token}` } });

    return response.data;
}

const saveRecord = async (record) => {
    console.log('save record');
    const url = `${BASE_URL}/records`

    let token = await retrieveToken();

    let response = await axios.post(url, { record: record }, { headers: { 'Authorization': `Bearer ${token}` } });

    return response.data;
}

const updateRecord = async (record) => {
    console.log('save record');
    const url = `${BASE_URL}/records/${record.id}`

    let token = await retrieveToken();

    let response = await axios.put(url, { record: record }, { headers: { 'Authorization': `Bearer ${token}` } });

    return response.data;
}

const deleteRecord = async (id) => {
    console.log('save record');
    const url = `${BASE_URL}/records/${id}`

    let token = await retrieveToken();

    let response = await axios.delete(url, { headers: { 'Authorization': `Bearer ${token}` } });

    return response.data;
}


export { getRecords, saveRecord }
