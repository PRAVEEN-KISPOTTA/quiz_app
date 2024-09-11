import React from "react";

export default class QuizApp extends React.Component{
    constructor(){
        super();
        this.state={
            data: null,
            loading: true,
            error: null
        }
    }
    componentDidMount(){
        fetch(`https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`)
        .then(res =>{
            if(!res.ok){
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then(data=>{
            this.setState({
                data,
                loading: false
            })
        })
        .catch(err=>{
            this.setState({
                err,
                loading: false
            })
        })
        console.log('data- ', this.state.data);
        
    }
    render(){
        const {data, loading, error} = this.state;

        if(loading)
            return <p>Loading...</p>
        
        if(error)
            return <p>Error: {error.message}</p>
        return(
            <div className="quiz-container">
                <div className="question-header">
                    <h2>Question 1</h2>
                </div>
                <div className="question-box">
                    <p>{data.results[0].question}</p>
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