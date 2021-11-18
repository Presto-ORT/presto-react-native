import React, { useEffect, useContext } from 'react';
import { Button, StyleSheet, View, TextInput } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { saveToken } from '../../services/internalStorage';
import GlobalContext from "../../components/globals/context";
import { login, googleLogin } from '../../api/users';

export default function Login({ props }) {
    // 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
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '1080675808694-a6chgpmt4hrcsa46fmgtr29502l83q0b.apps.googleusercontent.com',
        iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    });

    useEffect(async () => {
        if (response?.type === 'success') {
            const { authentication } = response;

            let data = await googleLogin(authentication.accessToken)

            storeToken(data.accessToken);
        }
    }, [response]);

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
                onChangeText={(value) => { setEmail(value.toLowerCase()) }}
            />
            <TextInput
                value={password}
                placeholder={'Password'}
                onChangeText={(value) => { setPassword(value); }}
            />

            <Button
                disabled={!request}
                title="Google Log In"
                onPress={() => {
                    promptAsync();
                }}
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
