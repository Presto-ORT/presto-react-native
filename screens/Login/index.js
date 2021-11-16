import React, { useContext } from 'react';
import { Button, StyleSheet, View, TextInput } from 'react-native';
import { saveToken } from '../../services/internalStorage';
import GlobalContext from "../../components/globals/context";
import { login } from '../../api/users';

export default function Login({ props }) {

    const { email, setEmail, password, setPassword, setShowLogin, resetData } = props

    const { setToken } = useContext(GlobalContext)

    const storeToken = async (token) => {
        if (!token) return;
        await saveToken(token);
        setToken(token);
    }

    async function userLlogin(email, password) {
        if (!email || !password) return;

        let response = await login(email, password);

        if (response.accessToken) storeToken(response.accessToken);
    }

    return (
        <View style={styles.container}>
            <TextInput
                value={email}
                placeholder={'Email'}
                onChangeText={(value) => { setEmail(value) }}
            />
            <TextInput
                value={password}
                placeholder={'Password'}
                onChangeText={(value) => { setPassword(value); }}
            />

            <Button
                title={'Iniciar Sesion'}
                onPress={async () => {
                    userLlogin(email, password);
                }}
            />
            <Button
                title={'No tenes cuenta? Registrate'}
                onPress={() => {
                    setShowLogin(prev => !prev);
                    resetData();
                }}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
