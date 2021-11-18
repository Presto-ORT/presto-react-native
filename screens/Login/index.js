import React, { useEffect, useContext } from 'react';
import { Button, StyleSheet, View, TextInput } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { saveToken } from '../../services/internalStorage';
import GlobalContext from "../../Components/globals/context";
import { login, googleLogin } from '../../api/users';
import { SocialIcon } from 'react-native-elements'
import{
    Dimensions
} from 'react-native'

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
            <View style={styles.inputSection}>
                <TextInput
                    style={styles.inputStyle}
                    value={email}
                    placeholder={'Email'}
                    onChangeText={(value) => { setEmail(value.toLowerCase()) }}
                />
                <TextInput
                    style={styles.inputStyle}
                    value={password}
                    placeholder={'Password'}
                    onChangeText={(value) => { setPassword(value); }}
                />
            </View>
            <SocialIcon
                style={[styles.buttons, {borderRadius: 0, margin: 0, height: 50, fontSize: 8}]}
                disabled={!request}
                title={"Log in with google"}
                button={"true"}
                type={"google"}
                onPress={() => {
                    promptAsync();
                }}
                raised={false}
            />
            <View style={[styles.buttons]}>
                <Button
                    title={'Iniciar Sesion'}
                    onPress={async () => {
                        userLlogin(email, password);
                    }}
                />
            </View>
            <View style={[styles.buttons,{height:50}]}>
                <Button
                    title={'No tenes cuenta? Registrate'}
                    onPress={() => {
                        setShowLogin(prev => !prev);
                        resetData();
                    }}
                />
            </View>
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
    inputSection:{
        width: Dimensions.get('window').width - 15,
        flex:2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputStyle:{
        width: Dimensions.get('window').width - 100,
        fontSize: 20,
        marginTop: 25,
        borderBottomColor: "#4a628a",
        borderBottomWidth: 2
    },
    buttons:{
        width: Dimensions.get('window').width - 15,
        margin: 10
    },
    buttonNative:{
        height: 80,
        margin: 10
    }
});
