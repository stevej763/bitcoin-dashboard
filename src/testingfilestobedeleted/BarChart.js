import React, { Component } from 'react';
import Chart from 'chart.js';


class BarChart extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        this.myChart = new Chart(this.canvasRef.current, {
            type: 'bar',
            options: {
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            type: 'time',
                            time: {
                                unit: 'month'
                            }
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                min: 0
                            }
                        }
                    ]
                }
            },
            data: {
                labels: this.props.data.map(d => d.timestamp),
                datasets: [{
                    label: this.props.title,
                    data: this.props.data.map(d => d.rate),
                    backgroundColor: this.props.color,
                    borderColor: this.props.color,
                    borderWidth: 10,
                }]
            }
        })
    }


    render() {
        return <canvas ref={this.canvasRef} />;
    }
}

export default BarChart;