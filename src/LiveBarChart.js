import React, { Component } from 'react';
import Chart from 'chart.js';


class LiveBarChart extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidUpdate() {
        this.myChart.data.timestamp = this.props.data.map(d => d.timestamp);
        this.myChart.data.datasets[0].data = this.props.data.map(d => d.rate);
        this.myChart.update();
    }


    componentDidMount() {
        this.myChart = new Chart(this.canvasRef.current, {
            type: 'bar',
            options: {
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var label = "Bitcoin Price: $" + parseFloat(tooltipItem.yLabel).toFixed(2);
                            return label;
                        }
                    }
                },
                legend: false,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            type: 'time',
                            gridLines: {
                                color: '#435058'
                            },
                            time: {
                                tooltipFormat: 'MM/DD/YYYY',
                                unit: 'month'
                            },
                            ticks: {
                                fontColor: '#DCF763',
                            }
                            
                            
                        },
                        
                    ],
                    yAxes: [
                        {
                            ticks: {
                                fontColor: '#DCF763',
                                callback: function (value, index, values) {
                                    return '$' + value;
                                }
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

export default LiveBarChart;