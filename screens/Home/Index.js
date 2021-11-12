import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

export default function Home({ navigation }) {

  const [datos, setDatos] = useState("Hola soy datos")

  return (
    <View style={styles.container}>
      <Text>Hola Mundo desde Home!</Text>

      <View style={styles.topFive}>
        <View style={styles.topFiveHeader}>
          <Text>Top 5 de categorias</Text>
          <Text>mayor gasto</Text>
        </View>
        <View style={styles.topFiveCategory}>
          <Text>Category name</Text>
          <Text>$ 100</Text>
        </View>
        <View style={styles.topFiveCategory}>
          <Text>Category name</Text>
          <Text>$ 100</Text>
        </View>
        <View style={styles.topFiveCategory}>
          <Text>Category name</Text>
          <Text>$ 100</Text>
        </View>
        <View style={styles.topFiveCategory}>
          <Text>Category name</Text>
          <Text>$ 100</Text>
        </View>
        <View style={styles.topFiveCategory}>
          <Text>Category name</Text>
          <Text>$ 100</Text>
        </View>
      </View>

      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => { }}>
        <Text>Agregar registro</Text>
      </TouchableOpacity> */}

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

  topFive: {
    width: Dimensions.get('window').width,
    backgroundColor: "#DDDDDD",
    borderColor: "#000000",
    borderWidth: 2,
  },

  topFiveHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    paddingHorizontal: 2.5,
    paddingVertical: 5,
    backgroundColor: "#FFF"
  },

  topFiveCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 2.5,
    paddingVertical: 5,
    backgroundColor: "#FFF"
  },
});