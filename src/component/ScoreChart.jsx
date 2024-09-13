import React, { Component } from "react";
import Chart from "chart.js/auto";

export default class ScoreChart extends Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.chartInstance = null;
    }

    componentDidMount() {
        // Initialize the chart
        const {correctAns, totalQue, attemptedQue} = this.props;
        const chartRef = this.chartRef.current.getContext('2d');
        const incorrectAns = Math.abs(attemptedQue - correctAns)
        const notAttempted = Math.abs(correctAns + incorrectAns - totalQue)
        this.chartInstance = new Chart(chartRef, {
            type: "pie",
            data: {
                labels: ["Correct", "Incorrect", "Not Attempted"],
                datasets: [
                    {
                        data: [correctAns, incorrectAns, notAttempted],
                        backgroundColor: [
                            'green',
                            'red',
                            'skyblue'
                        ],
                    }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 20 // Increase the font size here
                            }
                        }
                    }
                }
            }
        });
    }

    componentWillUnmount() {
        // Clean up the chart instance
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }
        
    }

    render() {
        const {correctAns, totalQue, selectedDifficulty, selectedCategoryName} = this.props
        console.log(this.props.correctAns, this.props.totalQue);
        return (
            <div className="scoreChart-container">
                <h2 className="score-title">Your Score Chart</h2>
                <canvas ref={this.chartRef} ></canvas>
                <p>{`You have chosen ${selectedDifficulty}-level problem on the topic of ${selectedCategoryName}. Out of ${totalQue} questions, you scored ${correctAns}.`}</p>
            </div>
        );
    }
}
