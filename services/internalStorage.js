import * as SecureStore from 'expo-secure-store';

const saveToken = async (token) => {
    await SecureStore.setItemAsync('accessToken', token);
}

const retrieveToken = async () => {
    let result = await SecureStore.getItemAsync('accessToken');
    return result;
}

const removeToken = async () => {
    await SecureStore.deleteItemAsync('accessToken');
}

export { saveToken, retrieveToken, removeToken }