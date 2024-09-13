import React from "react";
import QuizApp from "./component/QuizApp";
import CategorizePage from "./component/CategorizePage";

export default class App extends React.Component {
    constructor() {
        super();
        // Initialize state with default values
        this.state = {
            numberOfQue: 10, // Default number of questions
            selectedCategory: 9, // Default category ID (General Knowledge)
            selectedDifficulty: "easy", // Default difficulty level
            isBtnClicked: false, // Flag to control the display of components
            timeFrame: 240, // Default time frame (not used directly here)
            selectedCategoryName: 'General Knowledge' // Default category name
        };
    }

    // Handler for updating the number of questions
    handleQuestion = (e) => {
        this.setState({
            numberOfQue: e.target.value
        });
    }

    // Handler for updating the selected category and its name
    handleCategory = (e) => {
        this.setState({
            selectedCategory: e.target.value,
            selectedCategoryName: e.target[e.target.selectedIndex].textContent
        });
    }

    // Handler for updating the difficulty level
    handleDifficulty = (e) => {
        this.setState({
            selectedDifficulty: e.target.value
        });
    }

    // Handler for starting the quiz
    handleClick = () => {
        this.setState({
            isBtnClicked: true
        });
        // console.log(this.state.selectedCategory);
        // console.log(this.state.selectedDifficulty);
        // console.log(this.state.numberOfQue);
    }

    // Function to get the time frame based on the number of questions
    getTimeFrame(numberOfQue) {
        let timeFrame;
        switch (numberOfQue) {
            case '20':
                timeFrame = 180; // 3 minutes
                break;
            case '30':
                timeFrame = 270; // 4.5 minutes
                break;
            case '40':
                timeFrame = 360; // 6 minutes
                break;
            case '50':
                timeFrame = 450; // 7.5 minutes
                break;
            default:
                timeFrame = 90; // Default value (1.5 minutes) for other cases
        }
        return timeFrame;
    }

    render() {
        // Destructure state variables for easier access
        const { numberOfQue, selectedCategory, selectedDifficulty, isBtnClicked, selectedCategoryName } = this.state;

        return (
            <>
                {isBtnClicked ? 
                    // Show the QuizApp component if the button is clicked
                    <QuizApp 
                        numberOfQue={numberOfQue}
                        selectedCategory={selectedCategory}
                        selectedDifficulty={selectedDifficulty}
                        timeFrame={this.getTimeFrame(numberOfQue)}
                        selectedCategoryName={selectedCategoryName}
                    /> : 
                    // Show the CategorizePage component if the button is not clicked
                    <CategorizePage 
                        numberOfQue={numberOfQue}
                        selectedCategory={selectedCategory}
                        selectedDifficulty={selectedDifficulty}
                        handleQuestion={this.handleQuestion}
                        handleCategory={this.handleCategory}
                        handleDifficulty={this.handleDifficulty}
                        handleClick={this.handleClick}
                    />}
            </>
        );
    }
}
