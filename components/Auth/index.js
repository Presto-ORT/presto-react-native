import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Login from "../../screens/Login";
import Register from "../../screens/Register";

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
            ? <Login props={{ email, setEmail, password, setPassword, setShowLogin, resetData }} />
            : <Register props={{ nombre, setNombre, email, setEmail, password, setPassword, setShowLogin, resetData }} />
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
