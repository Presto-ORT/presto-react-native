import React, { useContext } from 'react';
import { Button, StyleSheet, View, TextInput } from 'react-native';
import GlobalContext from "../../Components/globals/context";
import { register } from '../../api/users';
import {
    Dimensions
} from 'react-native'


export default function Register({ props }) {

    const { nombre, setNombre, email, setEmail, password, setPassword, setShowLogin, resetData } = props

    const { setToken } = useContext(GlobalContext)

    const userRegister = async (nombre, email, password) => {
        if (!nombre || !email || !password) return;

        let response = await register(nombre, email, password);

        if (response.accessToken) setToken(response.accessToken);
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputSection}>

                <TextInput
                    style={styles.inputStyle}
                    value={nombre}
                    placeholder={'Nombre'}
                    onChangeText={(value) => { setNombre(value) }}
                />
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
            <View style={[styles.buttons,{height:50}]}>
                <Button
                    title={'Registrarme'}
                    onPress={() => {
                        userRegister(nombre, email, password);
                    }}
                />
            </View>
            <View style={[styles.buttons,{height:50}]}>
                <Button
                    title={'Ya tengo cuenta'}
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
        fontSize: 18,
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