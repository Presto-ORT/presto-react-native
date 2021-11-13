import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PieChartExample } from './PieChart';

export default function Reportes() {
    const data = [2890.43, 734.17, 8300, 1200,90, 7000]
  

    return (
      <View style={styles.container}>
          <View style={styles.container}>
              <PieChartExample tamanio={200} datos={data}/>
          </View>
          <View style={styles.list}>
            <Text style={styles.titulo}>Transporte    $2890   35%</Text>             
            <Text style={styles.titulo}>Alimentacion  $8300   44%</Text>             
            <Text style={styles.titulo}>Educacion     $7000   29%</Text>             
            <Text style={styles.titulo}>Salud         $1200   15%</Text>             
            <Text style={styles.titulo}>Entretenimiento   $734   4%</Text>             
          </View>
          
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
    list: {
        flex: 1,                
        alignItems: "flex-start",
        justifyContent: 'center',
        width:400,
        paddingBottom: 30,
        
    },    
    titulo: {        
        padding: 10       
        
    },
    
  });