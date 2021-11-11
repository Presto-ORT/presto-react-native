import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';

export default function Auth({ navigation }) {

    const [showLogin, setShowLogin] = useState(true);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [nombre, setNombre] = useState()

    const resetData = () => {
        setEmail('');
        setPassword('');
        setNombre('');
    }

    return (
        showLogin
            ? <View style={styles.container}>
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
                    onPress={() => { navigation.replace('Main') }}
                />
                <Button
                    title={'No tenes cuenta? Registrate'}
                    onPress={() => {
                        setShowLogin(prev => !prev);
                        resetData();
                    }}
                />
            </View>
            : <View style={styles.container}>
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
                    onPress={() => { navigation.replace('Main') }}
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
