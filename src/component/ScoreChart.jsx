import React, { Component } from "react";
import Chart from "chart.js/auto"; // Import Chart.js library for creating charts

export default class ScoreChart extends Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef(); // Created a ref to access the canvas element
        this.chartInstance = null; // To store the chart instance
    }

    componentDidMount() {
        // Initialize the chart when the component mounts
        const { correctAns, totalQue, attemptedQue } = this.props;
        const chartRef = this.chartRef.current.getContext('2d'); // Get the 2D context for the canvas
        
        // Calculate the number of incorrect and not attempted answers
        const incorrectAns = Math.abs(attemptedQue - correctAns);
        const notAttempted = Math.abs(correctAns + incorrectAns - totalQue);
        
        // Created a new Chart instance
        this.chartInstance = new Chart(chartRef, {
            type: "pie", // Chart type is pie chart
            data: {
                labels: ["Correct", "Incorrect", "Not Attempted"], // Labels for the chart segments
                datasets: [
                    {
                        data: [correctAns, incorrectAns, notAttempted], // Data to be displayed
                        backgroundColor: [
                            'green', // Color for correct answers
                            'red', // Color for incorrect answers
                            'skyblue' // Color for not attempted answers
                        ],
                    }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 20 // Increase the font size for legend labels
                            }
                        }
                    }
                }
            }
        });
    }

    componentWillUnmount() {
        // Clean up the chart instance when the component unmounts
        if (this.chartInstance) {
            this.chartInstance.destroy(); // Destroy the chart to free resources
        }
    }

    render() {
        const { correctAns, totalQue, selectedDifficulty, selectedCategoryName } = this.props;

        return (
            <div className="scoreChart-container">
                <h2 className="score-title">Your Score Chart</h2>
                <canvas ref={this.chartRef}></canvas> {/* Canvas element where the chart is rendered */}
                <p>{`You have chosen ${selectedDifficulty}-level problem on the topic of ${selectedCategoryName}. Out of ${totalQue} questions, you scored ${correctAns}.`}</p>
            </div>
        );
    }
}
