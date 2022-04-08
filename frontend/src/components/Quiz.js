import React, { useState, useEffect, Component } from "react"

const Quiz = ({questions, quizTitle, score, toCheck, submit}) => { 

    const handleSubmit = (e) => {
        e.preventDefault()
        let quiz_score = 0
        const element = document.getElementsByTagName('input')
        for (let i=0; i<toCheck.length; i++){
            if (element[toCheck[i]].checked === true){
                quiz_score += 1
            }
        }
        score(quiz_score)
        submit(true)
    }

    return(
            <div>

                {questions.map(({question, answer}, index) => (
                    <div key={index}>
                        <p id='question'>{question}</p>
                        {answer.map(({answer}, index) => (
                            <div key={index}>
                                <input type="checkbox" value={answer} name={question}/>
                                <label>{answer}</label>
                            </div>
                            
                        ))}
                    </div>
                ))}
                
                {quizTitle === '' 
                ? 
                ('blank') 
                : 
                (<button onClick={handleSubmit} id='submit' >Submit</button>)}

            </div>
    )
}
export default Quiz


// add conditional rendering for the quiz questions.




