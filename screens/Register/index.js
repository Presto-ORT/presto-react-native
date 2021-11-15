import React, { useContext } from 'react';
import { Button, StyleSheet, View, TextInput } from 'react-native';
import GlobalContext from "../../components/globals/context";
import { register } from '../../api/users';

export default function Register({ props }) {

    const { nombre, setNombre, email, setEmail, password, setPassword, setShowLogin, resetData } = props

    const { setToken } = useContext(GlobalContext)

    const userRegister = async (nombre, email, password) => {
        if (!nombre || !email || !password) return;

        let response = await register(nombre, email, password);

        if (response.accessToken) {
            setToken(response.accessToken);
        } else if (response._id) {
            setToken(response._id);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                value={nombre}
                placeholder={'Nombre'}
                onChangeText={(value) => { setNombre(value) }}
            />
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
                title={'Registrarme'}
                onPress={() => {
                    userRegister(nombre, email, password);
                }}
            />
            <Button
                title={'Ya tengo cuenta'}
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
