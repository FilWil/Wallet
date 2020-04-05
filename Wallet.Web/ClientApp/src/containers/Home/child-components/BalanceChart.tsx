import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

interface BalanceChartProps {
    historicalBalanceValues: number[]
}

interface BalanceChartState {

}

export class BalanceChart extends Component<BalanceChartProps, BalanceChartState> {

    getChartOptionsData() {
        const labelsArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
            .slice(0, this.props.historicalBalanceValues.length);

        return {
            labels: labelsArray,
            datasets: [{
                label: 'Balance value after operation',
                order: 1,
                data: this.props.historicalBalanceValues.slice(0, 10),
                backgroundColor: [
                    'rgba(9, 211, 172, 0.2)'
                ],
                borderColor: [
                    'rgba(9, 211, 172, 1)'
                ],
                borderWidth: 1
            }]
        };
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return <Line data={this.getChartOptionsData()}></Line>
    }
}

export default BalanceChart;