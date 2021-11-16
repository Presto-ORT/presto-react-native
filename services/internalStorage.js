import * as SecureStore from 'expo-secure-store';

const saveToken = async (token) => {
    await SecureStore.setItemAsync('accessToken', token);
}

const retrieveToken = async () => {
    let result = await SecureStore.getItemAsync('accessToken');
    return result;
}

const removeToken = async () => {
    let result = await SecureStore.deleteItemAsync('accessToken');
    console.log(result);
}

export { saveToken, retrieveToken, removeToken }