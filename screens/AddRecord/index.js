import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getExample } from '../../api/registros'

export default function AddRecord({ navigation }) {

    return (
        <View style={styles.container}>

            <Text>Records</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});