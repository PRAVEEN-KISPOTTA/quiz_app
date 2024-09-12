import React from "react";
import ScoreChart from "./ScoreChart";

export default class QuizApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loading: true,
            error: null,
            selectedOption: '',
            currentQue: 0,
            options: [], // New state to keep shuffled options
            time: this.props.timeFrame
        };
        this.currentScore = 0;
        this.timerInterval = null;
    }

    componentDidMount() {
        const { numberOfQue, selectedCategory, selectedDifficulty } = this.props;
        fetch(`https://opentdb.com/api.php?amount=${numberOfQue}&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then(data => {
                this.setState({
                    data,
                    loading: false
                }, () => {
                    // Shuffle options after data is loaded
                    this.shuffleOptions();
                });
            })
            .catch(err => {
                this.setState({
                    error: err,
                    loading: false
                });
            });

            // Start the countdown timer when the component mounts
            this.startTimer();
    }

    componentDidUpdate(prevProps, prevState) {
        // Shuffle options only when currentQue changes
        if (prevState.currentQue !== this.state.currentQue) {
            this.shuffleOptions();
        }
    }

    componentWillUnmount() {
        // Clear the interval when the component unmounts
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    startTimer = () => {
        this.timerInterval = setInterval(() => {
            this.setState(prevState => {
                if (prevState.time > 0) {
                    return { time: prevState.time - 1 };
                } else {
                    clearInterval(this.timerInterval);
                    return { time: 0 }; // Ensure time is zero when it reaches the end
                }
            });
        }, 1000);
    }

    formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
    }


    shuffleOptions = () => {
        const { data, currentQue } = this.state;
        if (data && data.results && data.results[currentQue]) {
            const question = data.results[currentQue];
            const allOptions = [...question.incorrect_answers, question.correct_answer];
            const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
            this.setState({ options: shuffledOptions });
        }
    }

    optionClicked = (option) => {
        if (this.state.isTransitioning) return; // Prevent click handling if transitioning

        this.setState({
            selectedOption: option,
            isTransitioning: true // Start the transition
        });

        // this.setState(prev =>({
        //     score: option === 
        // }))

        setTimeout(() => {
            this.setState(prevState => ({
                selectedOption: '',
                currentQue: prevState.currentQue + 1,
                isTransitioning: false // End the transition
            }));
        }, 1000);
    }

    render() {
        const { data, loading, error, selectedOption, currentQue, options, time } = this.state;

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;

        if (!data || !data.results || data.results.length === 0) {
            return <p>No data available</p>;
        }

        const question = data.results[currentQue];
        if (!question || time === 0) return <><ScoreChart /></> // Handle case where there are no more questions

        return (
            <div className="main-container">
            <h1 className={`timer-container ${time <= 80 ? 'alert-timer' : ''}`}>{this.formatTime(time)}</h1>
            <div className="quiz-container">
                <div className="question-header">
                    <h2>Question {currentQue + 1}</h2>
                </div>
                <div className="question-box">
                    <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
                </div>
                <div className="answer-options">
                    {options.map((option, index) => {
                        const isCorrect = option === question.correct_answer;
                        const isSelected = selectedOption === option;

                        let className = 'option';
                        if (isSelected && isCorrect) {
                            className += ' correct-ans'; // Correct and selected
                            this.currentScore++;

                        } else if (isSelected) {
                            className += ' wrong-ans'; // Selected but wrong
                        } else if (isCorrect && selectedOption) {
                            className += ' correct-ans'; // Correct but not selected
                        }

                        return (
                            <div
                                key={index}
                                className={className}
                                onClick={() => this.optionClicked(option)}
                            >
                                {String.fromCharCode(65 + index)}. {option}
                            </div>
                        );
                    })}
                </div>
            </div>
            </div>
        );
    }
}
