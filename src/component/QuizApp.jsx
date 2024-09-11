import React from "react";

export default class QuizApp extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div className="quiz-container">
                <div className="question-header">
                    <h2>Question 1</h2>
                </div>
                <div className="question-box">
                    <p>Your question will go here</p>
                </div>
                <div className="answer-options">
                    <div className="option">A</div>
                    <div className="option">B</div>
                    <div className="option">C</div>
                    <div className="option">D</div>
                </div>
            </div>
        )
    }
}