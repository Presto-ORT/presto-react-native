import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function Home({ navigation }) {

  const [datos, setDatos] = useState("Hola soy datos")

  return (
    <View style={styles.container}>
      <View style={styles.userArea} >
        <Image style={styles.userImage} source={require('../../Data/images/lionel-messi.jpg')}/>
        
      </View>

      <View style={styles.topFive}>
        <View style={styles.topFiveHeader}>
          <Text>Top 5 de categorias</Text>
          <Text style={styles.title}>mayor gasto</Text>
        </View>
        <View style={styles.topFiveCategory}>
          <View style={styles.categoryTitle}>            
            <Ionicons name="bus-outline" size={20} color="#000" />  
            <Text style={styles.title}>Transporte</Text>
          </View>          
          <Text>$ 100</Text>
        </View>
        <View style={styles.topFiveCategory}>
          <View style={styles.categoryTitle}>            
            <Ionicons name="pizza-outline" size={20} color="#000" />  
            <Text style={styles.title}>Alimentacion</Text>
          </View >  
          <Text>$ 100</Text>
        </View>
        <View style={styles.topFiveCategory}>
          <View style={styles.categoryTitle}>            
            <Ionicons name="school-outline" size={20} color="#000" />  
            <Text style={styles.title}>Educacion</Text>
          </View>  
          <Text>$ 100</Text>
        </View>
        <View style={styles.topFiveCategory}>
          <View style={styles.categoryTitle}>
            <Ionicons name="game-controller-outline" size={20} color="#000" />  
            <Text style={styles.title}>Entretenimiento</Text>            
          </View>  
          <Text>$ 100</Text>
        </View>
        <View style={styles.topFiveCategory}>
          <View style={styles.categoryTitle}>
            <Ionicons name="flash-outline" size={20} color="#000" styles={styles.icon}/>  
            <Text style={styles.title}>Servicios</Text>            
          </View>  
          <Text>$ 100</Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b7bcc',
    alignItems: 'center',
    justifyContent: 'center'
  },

  topFive: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: "#DDDDDD",
    borderColor: "#000000",    
    justifyContent: "space-between",
    paddingBottom: 10
  },

  userArea: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: "#2b7bcc",  
    alignItems: 'center',
    justifyContent: 'center'    
  },

  topFiveHeader: {
    flexDirection: "row",
    justifyContent: "space-between",  
    backgroundColor: "#FFF"
  },

  topFiveCategory: {
    flexDirection: "row",
    justifyContent: "space-between",    
    padding: 10,
    backgroundColor: "#FFF",
    marginBottom: 10
  },

  userImage: {    
    height: 200,
    width: 200,
    borderRadius: 180
  },

  categoryTitle: {    
    flexDirection: 'row'     
  },

  title: {    
    paddingLeft: 10,
    fontSize: 15
  },

});