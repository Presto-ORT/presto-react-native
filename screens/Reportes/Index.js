import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { PieChartExample } from './PieChart';
import { getReport } from "../../api/reports";
import {
  ActivityIndicator
} from 'react-native'
import { set } from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';

export default function Reportes() {
  const [report, setReport] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

  useEffect(async () => {
    try {
      let data = await getReport();
      data.forEach(element => {
        element.color = randomColor();
      });
      let total = data.reduce((previous, current) => { return previous + current.total }, 0);

      setReport(data);
      setTotal(total);
      setLoading(false);
      return () => { }
    } catch {
    }

  }, []);

  if (loading) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>)
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <PieChartExample tamanio={200} data={report} />
        </View>

        <View style={styles.list}>
          <ScrollView>
            {
              report.map((data, index) =>
                <View style={styles.dataRow} key={index}>
                  <View style={{ backgroundColor: data.color, width: 20, height: 20, borderRadius: 100 }}><Text></Text></View>
                  <Text style={styles.titulo}>{`${data.category}`}</Text>
                  <Text style={styles.numero}>{`$${(data.total).toFixed(2)}`}</Text>
                  <Text style={styles.numero}>{`${((data.total * 100) / total).toFixed(2)}%`}</Text>

                </View>)

            }
          </ScrollView>
        </View>

      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get("window").width
  },
  loadingStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: 'space-between',
    width: Dimensions.get("window").width - 40,
    paddingBottom: 30,

  },
  numero: {
    textAlign: 'right',
    alignSelf: 'flex-end',
    flex: 1
  },
  titulo: {
    flex: 2
  },

  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get("window").width - 40,
    marginBottom: 10
  },

});
