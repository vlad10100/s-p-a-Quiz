import React from 'react'


    

const QuizAnswers = ({correct_list}) => {


    return(
        <div>
            <h4>Answers</h4>
            {correct_list.map((item, index) => (
                <p key={index}>{index + 1}.) {item}</p>
            ))}
            
        </div>
    )
}

export default QuizAnswers

