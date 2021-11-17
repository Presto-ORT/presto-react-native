import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SectionList } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { gastos } from "../../Data/mockupData.js"

export default function Diario({ navigation, route }) {


  const [datos, setDatos] = useState("")
  const [day, setDay] = useState(3)
  const [gastosFiltrados, setGastosFiltrados] = useState(gastos)


  /*   useEffect(() => {
      setGastosFiltrados(gastos.filter((categoria) => categoria.data.filter((registro) => registro.fecha == day)))
    }, [day])
   */

  useEffect(() => {
    if (route.params) {
      setDatos(route.params.datos)
    }
  }, [route.params])

  function filtrarPorDia(otroGato) {
    var filtrados = [];

    for (let i = 0; i < otroGato.length; i++) {
      for (let j = 0; j < otroGato[i].data.length; j++) {
        if (otroGato[i].data[j].fecha === day)
          filtrados.push(otroGato[i])
      }
    }

    //no me salio con filter ni con map, refactorizar por favor

    return filtrados
  }

  useEffect(() => {
    setGastosFiltrados(filtrarPorDia(gastos))

  }, [day])

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title.nombre}</Text>
      <View style={{ flexDirection: "row", alignItems: 'center' }}>
        <Text style={styles.innerTitle}>${title.precio}</Text>
        <Ionicons name="trash-outline" size={20} color="#000" />
      </View>

    </View>
  );

  return (
    <View style={styles.parent}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setDay(prev => prev - 1)}>
          <Ionicons name="chevron-back-sharp" size={30} color="#006600" />
        </TouchableOpacity>
        <Text>
          {day}
        </Text>
        <TouchableOpacity onPress={() => setDay(prev => prev + 1)}>
          <Ionicons name="chevron-forward-sharp" size={30} color="#006600" />
        </TouchableOpacity>
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
