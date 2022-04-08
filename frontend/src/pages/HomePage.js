import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../context/AuthContext'

import QuizBoard from '../components/QuizBoard'
import Quiz from '../components/Quiz'
import Score from '../components/Score'
import QuizAnswers from '../components/QuizAnswers'

import { Card, Container, Row, Col } from 'react-bootstrap'



const HomePage = () => {
    const {user, authTokens, logoutUser} = useContext(AuthContext)

    const [quiz, setQuiz] = useState([])
    const [dataState, setDataState] = useState([])
    const [questions, setQuestions] = useState([])
    const [quizTitle, setQuizTitle] = useState('')
    const [quizStatus, setQuizStatus] = useState(false)

    const [user_score, setUserScore] = useState('')
    const [submitStatus, setSubmitStatus] = useState(false)
    const [showCorrectAns, setShowCorrectAns] = useState(false)


    const getQuizzes = async () => {

        const response = await fetch('http://127.0.0.1:8000/quiz/', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
        })
        const data = await response.json()
        if (response.status === 200){
            setQuiz(data)
        }else if (response.statusText === 'Unauthorized'){      // if something went wrong logout the user
            logoutUser() 
        }
    }

    useEffect(() =>{
        getQuizzes()
    }, [])



    // correct answer
    const correct_list = []
    const list = []     // checkbox answer key
    const questionLength = questions.length
    for (let i=0; i < questionLength; i++){
        const ans = questions[i].answer
        for (let i=0; i < ans.length; i++){
            list.push(ans[i]['is_right'])
            if (ans[i]['is_right'] === true){
                correct_list.push(ans[i]['answer'])
            }
        }
    }

    const toCheck = []          // id of correct box
    for (let i=0; i<list.length; i++){
        if (list[i] === true){
            toCheck.push(i)
        }
    }


    const url = async (quiz_url, quiz_title) => {
        const response = await fetch(`http://127.0.0.1:8000/quiz/take_quiz/${quiz_url}/`, {           
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
        })
        const data = await response.json()
        setDataState(data)
        setQuestions(data.questions)
        setQuizTitle(quiz_title)
    }
    useEffect(() =>{
        url()
    }, [])


    const handleClick = (e) => {
        e.preventDefault()
        setQuizStatus(true)
        const element = document.getElementById('take-quiz')
        element.remove()
    }

    const score = (quiz_score) => {
        if(quiz_score.length != 0){
            setUserScore(quiz_score)
        }
    }
    const submit = (status) => {
        if (status === true){
            setSubmitStatus(status)
        }
    }


    const showQuizAnswers = (e) =>{
        e.preventDefault()
        
        const element = document.getElementById('showQuizAnswers')
        if (submitStatus ===  true){
            element.remove()
            setShowCorrectAns(true)
        }
    }

    return (
        <div className='homepage'>
            <Container>
                <Row>
                    <Col className='col-3'>
                        <Card className='p-3'>
                            {quiz.map((item, index) => (
                                <QuizBoard key={index} title={item.title} id={item.id} url={url}/>
                            ))}
                            
                        </Card>
                    </Col>

                    <Col className='col-6'>
                        <Card className='p-3'>
                            <h4>{quizTitle}</h4>
                            <button onClick={handleClick} id="take-quiz">Take Quiz</button> 
                            {quizStatus === false ? 
                            ( <p>please select a quiz</p> ) : 
                            (<Quiz questions={questions} quizTitle={quizTitle} score={score} toCheck={toCheck} submit={submit} />)}
                                                      
                        </Card>
                    </Col>

                    <Col className='col-3'>
                        <Card className='p-3'>
                            <Score score={user_score} />
                        </Card>
                        <Col>
                            <Card className='mt-3 p-3'>
                                <button onClick={showQuizAnswers} id='showQuizAnswers'>Show Correct Answers</button>
                                {(showCorrectAns === true && submitStatus === true) ? 
                                (<QuizAnswers correct_list={correct_list} />) :
                                (<p>please answer the quiz before viewing the right answers</p>)}
                            </Card>
                        </Col>
                    </Col>


                </Row>
            </Container>

        </div>
    )
}

export default HomePage