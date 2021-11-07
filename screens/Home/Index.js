import React, { useState }from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Home({navigation}) {   

    const [datos, setDatos] = useState("Hola soy datos")
   
    return (
      <View style={styles.container}>
          <Text>Hola Mundo desde Home!</Text>
          <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate("Diario", {datos})}>
            <Text>Paso mis datos a Details</Text>
          </TouchableOpacity>
          
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

    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10
    },
  });