import React from "react";

export default class CategorizePage extends React.Component{
    constructor(){
        super();
        this.state={
            selectedCategory: ""
        }
    }

    handleCategory = (e)=>{
        this.setState({
            selectedCategory: e.target.value
        })
    }

    handleClick = ()=>{
        console.log(this.state.selectedCategory);
    }
    render(){
        return(
            <div className="category-container">
                <div>
                    <label>Number of Question</label>
                    <input></input>
                </div>

                <div>
                    <label>Select Category</label><br></br>
                    <select id="categorySelect" value={this.state.selectedCategory} onChange={this.handleCategory}>
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
                    <label>Select Difficulty</label>
                    <input></input>
                </div>

                <button onClick={this.handleClick}>Submit</button>
            </div>
        )
    }
}