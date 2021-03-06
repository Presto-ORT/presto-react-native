import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SectionList} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import {gastos} from "../../Data/mockupData.js"

export default function Diario({navigation, route}) {  

    
    const [datos, setDatos] = useState("") 

    
    useEffect(() => {
      if(route.params){
        setDatos(route.params.datos)
        console.log('ejecuto el efecto')
      }
    },[route.params])   
    
    const Item = ({ title }) => (
      <View style={styles.item}>
        <Text style={styles.title}>{title.nombre}</Text> 
        <View style={{flexDirection : "row", alignItems: 'center'}}>
          <Text style={styles.innerTitle}>${title.precio}</Text>  
          <Ionicons name="trash-outline" size={20} color="#000" />           
        </View> 
        
      </View>
    );

    return (
      <View style={styles.parent}>
        <View style={styles.topBar}>
            <Ionicons name="chevron-back-sharp" size={30} color="#006600" />
            <Text>
              Hoy
            </Text>                         
            <Ionicons name="chevron-forward-sharp" size={30} color="#006600" />
        </View>
          
        <View style={styles.container}>  
               
            {/* <Text>Hola Mundo desde Diario!</Text>     
            <Text>{datos}</Text>     
              <TouchableOpacity 
                style={styles.button}
                onPress={() => setDatos("CAMBIADO")}>
                <Text>Cambio datos</Text>
              </TouchableOpacity> */}

          <SectionList
                sections={gastos}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
                )}
              />
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#c0c4d1',
      alignItems: 'stretch',
      justifyContent: 'center'      
    },

    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10
    },

    topBar: {    
      flexDirection: "row",           
      marginTop:0,
      padding: 10,
      height:50,
      alignItems: 'center',
      justifyContent: "space-between"

    },

    parent: {  
      flex: 1,    
      marginTop:0,      
    },

    item: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#a1b1c2",
      padding: 5,
      marginVertical: 8
    },

    header: {
      fontSize: 20,
      backgroundColor: "#2b7bcc",
      color: 'white'

    },
    title: {
      fontSize: 15
    },

    innerTitle: {
      fontSize: 15,
      paddingRight: 30
    }


  });
  