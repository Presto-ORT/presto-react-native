import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PieChartExample } from './PieChart';
import { getReport } from "../../api/reports";

export default function Reportes() {
  const [report, setReport] = useState([])
  const [total, setTotal] = useState(0)

  const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

  useEffect(async () => {
    let data = await getReport();

    data.forEach(element => {
      element.color = randomColor();
    });
    let total = data.reduce((previous, current) => { return previous + current.total }, 0);

    setReport(data);
    setTotal(total);
    return () => { }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <PieChartExample tamanio={200} data={report} />
      </View>
      <View style={styles.list}>
        {
          report.map((data, index) =>
            <View style={styles.dataRow} key={index}>
              <View style={{ backgroundColor: data.color, width: 30, heigh: 30, borderRadius: 100, margin: 10 }}><Text></Text></View>
              <Text style={styles.titulo}>{`${data.category} $${(data.total).toFixed(2)} ${((data.total * 100) / total).toFixed(2)}%`}</Text>
            </View>)

        }
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
    width: 400,
    paddingBottom: 30,

  },
  titulo: {
    padding: 10

  },

  dataRow: {
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'space-between'

  },

});
