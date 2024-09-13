import React from "react";
import ScoreChart from "./ScoreChart"; // Import the ScoreChart component for displaying the results

export default class QuizApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null, // To hold the fetched quiz data
            loading: true, // Indicates if data is still being loaded
            error: null, // To store any errors encountered during data fetching
            selectedOption: '', // To track the currently selected option
            currentQue: 0, // To track the current question index
            options: [], // New state to keep shuffled options for the current question
            time: this.props.timeFrame // Timer value initialized from props
        };
        this.currentScore = 0; // To keep track of the user's score
        this.timerInterval = null; // To store the interval ID for the countdown timer
    }

    componentDidMount() {
        // Fetch quiz data when the component mounts
        const { numberOfQue, selectedCategory, selectedDifficulty } = this.props;
        fetch(`https://opentdb.com/api.php?amount=${numberOfQue}&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok"); // Handle network errors
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
        // Clear the interval when the component unmounts to prevent memory leaks
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    startTimer = () => {
        // Initialize a countdown timer
        this.timerInterval = setInterval(() => {
            this.setState(prevState => {
                if (prevState.time > 0) {
                    return { time: prevState.time - 1 }; // Decrement the timer
                } else {
                    clearInterval(this.timerInterval); // Stop the timer when it reaches zero
                    return { time: 0 }; // Ensure time is zero when it reaches the end
                }
            });
        }, 1000);
    }

    formatTime = (seconds) => {
        // Convert seconds to minutes and seconds format
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
    }

    shuffleOptions = () => {
        // Shuffle answer options for the current question
        const { data, currentQue } = this.state;
        if (data && data.results && data.results[currentQue]) {
            const question = data.results[currentQue];
            const allOptions = [...question.incorrect_answers, question.correct_answer];
            const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
            this.setState({ options: shuffledOptions });
        }
    }

    optionClicked = (option) => {
        // Handle option selection
        if (this.state.isTransitioning) return; // Prevent click handling if transitioning

        this.setState({
            selectedOption: option,
            isTransitioning: true // Start the transition
        });

        setTimeout(() => {
            // Move to the next question after a delay
            this.setState(prevState => ({
                selectedOption: '',
                currentQue: prevState.currentQue + 1,
                isTransitioning: false // End the transition
            }));
        }, 1000);
    }

    render() {
        const { data, loading, error, selectedOption, currentQue, options, time } = this.state;

        if (loading) return <p>Loading...</p>; // Display a loading message while fetching data
        if (error) return <p>Error: {error.message}</p>; // Display an error message if there is a fetch error

        if (!data || !data.results || data.results.length === 0) {
            return <p>No data available</p>; // Display a message if no data is available
        }

        const question = data.results[currentQue];
        if (!question || time === 0) return (
            <ScoreChart 
                correctAns={this.currentScore / 2} // Pass half of the current score as the correct answers
                totalQue={this.props.numberOfQue} // Total number of questions
                attemptedQue={currentQue} // Number of questions attempted
                selectedCategory={this.props.selectedCategory} // Selected category
                selectedDifficulty={this.props.selectedDifficulty} // Selected difficulty level
                selectedCategoryName={this.props.selectedCategoryName} // Category name
            />
        ); // Render ScoreChart component if there are no more questions or time is up

        return (
            <div className="main-container">
                <h1 className={`timer-container ${time <= 20 ? 'alert-timer' : ''}`}>
                    {this.formatTime(time)} {/* Display the formatted timer */}
                </h1>
                <div className="quiz-container">
                    <div className="question-header">
                        <h2>Question {currentQue + 1}</h2> {/* Display the current question number */}
                    </div>
                    <div className="question-box">
                        <p dangerouslySetInnerHTML={{ __html: question.question }}></p> {/* Render question with HTML content */}
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
                                    {String.fromCharCode(65 + index)}. {option} {/* Render option with corresponding letter */}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
