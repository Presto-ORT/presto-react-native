import React, { useContext } from 'react';
import { Button, StyleSheet, View, TextInput } from 'react-native';
import GlobalContext from "../../components/globals/context";

export default function Login({ props }) {

    const { email, setEmail, password, setPassword, setShowLogin, resetData } = props

    const { setToken } = useContext(GlobalContext)

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
                onPress={() => { setToken(true); }}
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
