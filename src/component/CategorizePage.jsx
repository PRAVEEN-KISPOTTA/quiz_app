import React from "react";

export default class CategorizePage extends React.Component{
    constructor(){
        super();
        this.state={
            numberOfQue: 10,
            selectedCategory: 9,
            selectedDifficulty: "easy"
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
        console.log(this.state.selectedCategory);
        console.log(this.state.selectedDifficulty);
        console.log(this.state.numberOfQue);
    }
    render(){
        const {numberOfQue, selectedCategory, selectedDifficulty} = this.state
        return(
            <div className="category-container">
                <div>
                    <label>Number of Question</label><br />
                    <input className="input" placeholder="Less then 50" type="number" value={numberOfQue} onChange={this.handleQuestion}></input>
                </div>

                <div>
                    <label>Select Category</label><br />
                    <select className="selector" id="categorySelect" value={selectedCategory} onChange={this.handleCategory}>
                        <option value={9}>General Knowledge</option>
                        <option value={10}>Entertainment: Books</option>
                        <option value={11}>Entertainment: Flim</option>
                        <option value={12}>Entertainment: Music</option>
                        <option value={13}>Entertainment: Musicals & Theatres</option>
                        <option value={14}>Entertainment: Television</option>
                        <option value={15}>Entertainment: Video Games</option>
                        <option value={16}>Entertainment: Board Games</option>
                        <option value={17}>Science & Nature</option>
                        <option value={18}>Science: Computer</option>
                        <option value={19}>Science: Mathematics</option>
                    </select>
                </div>

                <div>
                    <label>Select Difficulty</label><br />
                    <select className="selector" value={selectedDifficulty} onChange={this.handleDifficulty}>
                        <option value={'easy'}>Easy</option>
                        <option value={'medium'}>Medium</option>
                        <option value={'hard'}>Hard</option>
                    </select>
                </div>

                <button className="button" onClick={this.handleClick}>Submit</button>
            </div>
        )
    }
}