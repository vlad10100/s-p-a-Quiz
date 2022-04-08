import React from 'react'


const QuizBoard = ({title, id, url}) => {

    
    const handleClick = (e) => {
        e.preventDefault()
        const quiz_id = e.target.getAttribute("name")
        const content = e.target.getAttribute("id")
        const API_URL =  quiz_id 
        url(API_URL, content)
        
    }

    

    return(
        <div className='quizBoard'>
            <a onClick={handleClick} name={id} id={title}>{title}</a>
        </div>
    )
}

export default QuizBoard


