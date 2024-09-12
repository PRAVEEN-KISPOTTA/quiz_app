import React from "react";
import QuizApp from "./component/QuizApp";
import CategorizePage from "./component/CategorizePage";

export default class App extends React.Component{
    constructor(){
        super();
        this.state={
            numberOfQue: 10,
            selectedCategory: 9,
            selectedDifficulty: "easy",
            isBtnClicked: false,
            timeFrame: 240
        }
    }

    handleQuestion = (e)=>{
        this.setState({
            numberOfQue: e.target.value
        })
    }

    handleCategory = (e)=>{
        this.setState({
            selectedCategory: e.target.value
        })
    }

    handleDifficulty = (e)=>{
        this.setState({
            selectedDifficulty: e.target.value
        })
    }

    handleClick = ()=>{
        this.setState({
            isBtnClicked: true
        })
        // console.log(this.state.selectedCategory);
        // console.log(this.state.selectedDifficulty);
        // console.log(this.state.numberOfQue);
    }

    getTimeFrame(numberOfQue) {
        let timeFrame;
        switch (numberOfQue) {
            case '20':
                timeFrame = 180;
                break;
            case '30':
                timeFrame = 270;
                break;
            case '40':
                timeFrame = 360;
                break;
            case '50':
                timeFrame = 450;
                break;
            default:
                timeFrame = 90; // Default value
        }
        return timeFrame;
    }
  render(){
    const {numberOfQue, selectedCategory, selectedDifficulty, isBtnClicked, timeFrame} = this.state;
    return(
      <>
        {isBtnClicked ? 
              <QuizApp  numberOfQue={numberOfQue}
                        selectedCategory={selectedCategory}
                        selectedDifficulty={selectedDifficulty}
                        timeFrame={this.getTimeFrame(numberOfQue)}
              /> : 
              <CategorizePage numberOfQue={numberOfQue}
                              selectedCategory={selectedCategory}
                              selectedDifficulty={selectedDifficulty}
                              handleQuestion={this.handleQuestion}
                              handleCategory={this.handleCategory}
                              handleDifficulty={this.handleDifficulty}
                              handleClick={this.handleClick}
              />}
      </>
    )
  }
}
