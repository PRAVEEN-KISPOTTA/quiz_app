import React from "react";

export default class CategorizePage extends React.Component{
    render(){
        const {numberOfQue, selectedCategory, selectedDifficulty, handleQuestion, handleCategory, handleDifficulty, handleClick} = this.props
        return(
            <div className="category-container">
                <div>
                    <label>Number of Question</label><br />
                    <select className="selector" value={numberOfQue} onChange={handleQuestion}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={50}>50</option>
                    </select>
                </div>

                <div>
                    <label>Select Category</label><br />
                    <select className="selector" id="categorySelect" value={selectedCategory} onChange={handleCategory}>
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
                    <select className="selector" value={selectedDifficulty} onChange={handleDifficulty}>
                        <option value={'easy'}>Easy</option>
                        <option value={'medium'}>Medium</option>
                        <option value={'hard'}>Hard</option>
                    </select>
                </div>

                <button className="button" onClick={handleClick}>Submit</button>
                <div className="square"></div>
                <div className="circle"></div>
            </div>
        )
    }
}