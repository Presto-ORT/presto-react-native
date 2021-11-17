import React from 'react'
import { PieChart } from 'react-native-svg-charts'

function PieChartExample(props) {
    {

        //const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
        const data = props.datos
        const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

        const pieData = data
            .filter((value) => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: randomColor(),
                    onPress: () => null,
                },
                key: `pie-${index}`,
            }))

        return <PieChart style={{ height: props.tamanio, width: props.tamanio }} data={pieData} />
    }
}

export { PieChartExample }