import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import PasswordInput from "../../Login/child-components/PasswordInput";

let chartOptionsData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: '# of Votes',
        data: [0,1],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
};

export class BalanceChart extends Component<{chartData: number[]}> {
    // Before the component mounts, we initialise our state

    constructor(props) {
        super(props);
    }
    static defaultProps = {
        chartData: [1,2]
    };
    // After the component did mount, we set the state each second.
    componentDidMount() {
        console.log(this.props.chartData);
    }
    // render will know everything!
    render() {
        return <Line data={chartOptionsData} ></Line>
    }
}

export default BalanceChart;