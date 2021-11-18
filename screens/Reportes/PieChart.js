import React from 'react'
import { PieChart } from 'react-native-svg-charts'

function PieChartExample(props) {
    {
        const data = props.data
        const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

        const pieData = data
            .filter((value) => value.total > 0)
            .map((value, index) => ({
                value: value.total,
                svg: {
                    fill: value.color,
                    onPress: () => null,
                },
                key: `pie-${index}`,
            }))

        return <PieChart style={{ height: props.tamanio, width: props.tamanio }} data={pieData} />
    }
}

export { PieChartExample }