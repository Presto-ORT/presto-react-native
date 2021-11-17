import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SectionList } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { gastos } from "../../Data/mockupData.js"
import axios from "axios";
import {deleteRecord} from "../../api/records"


export default function Diario({ navigation, route }) {


  const [today, setToday] = useState(new Date())  
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(async () => {
    const day = today.getDate()
    const month = today.getMonth()
    const year = today.getFullYear()

    let response = await axios.get(`http://localhost:3000/records?day=${day}&month=${month}&year=${year}`)
    let registros = response.data;
    let mapa = new Map()

    registros.forEach( elemento => { mapa[elemento.category || "Uncategorized"] = (mapa[elemento.category || "Uncategorized"] || []).concat([{fecha: elemento.date, importe: elemento.amount, subcategoria: elemento.description, _id: elemento._id}]) } )

    var resultado = Object.entries(mapa).map( x => ({title: x[0], data: x[1]}) )
    
    console.log(resultado)

    setGastosFiltrados(resultado)
  }, [today])

  useEffect(() => {
    if (route.params) {
      setDatos(route.params.datos)
    }
  }, [route.params])


  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title.subcategoria}</Text>
      <View style={{ flexDirection: "row", alignItems: 'center' }}>
        <Text style={styles.innerTitle}>${title.importe}</Text>
        <TouchableOpacity onPress={() => deleteRecord(title._id)}>
        <Ionicons name="trash-outline" size={20} color="#000"/>
        </TouchableOpacity>
      </View>

    </View>
  );

  return (
    <View style={styles.parent}>
      <View style={styles.topBar}>
        
      <TouchableOpacity onPress={() => {
            let nuevaFecha = today
            nuevaFecha.setDate(nuevaFecha.getDate() -1)            
            setToday(new Date(nuevaFecha))                    
        }}>
          <Ionicons name="chevron-back-sharp" size={30} color="#006600" />
        </TouchableOpacity>
        <Text>
          {today.getDate()}
        </Text>
        <TouchableOpacity onPress={() => {
            let nuevaFecha = today
            nuevaFecha.setDate(nuevaFecha.getDate() +1)
            setToday(new Date(nuevaFecha))  
        }}>
          <Ionicons name="chevron-forward-sharp" size={30} color="#006600" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>

        <SectionList
          sections={gastosFiltrados}
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
    marginTop: 0,
    padding: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: "space-between"

  },

  parent: {
    flex: 1,
    marginTop: 0,
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
