import React, {createContext, useState, useEffect} from 'react'

import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'






const AuthContext = createContext()
export default AuthContext

export const AuthProvider = ({children}) => {


    // authTokens will carry the access and refresh tokens
    // if authTokens are in the localstorage, parse the authTokens.
    const [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? (JSON.parse(localStorage.getItem('authTokens'))) : null)

    

    // user will carry the token_type, user_id, and username
    // if authTOkens are in the localstorage, decode the authTokens
    const [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? (jwt_decode(localStorage.getItem('authTokens'))) : null)


    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    


    const loginUser = async(e) => {
        e.preventDefault()
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({'username': e.target.username.value, 'password':e.target.password.value})
        })
        const data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))                                 // jwt_decode token_type, user_id, username
            localStorage.setItem('authTokens',JSON.stringify(data))          // setItem(key, value) stringify >>>> dictionary to strinng
            console.log('Loggedin')
            navigate('/')
        }else{
            alert('Something went wrong')
        }
    }




    // LOGIN
    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        // navigate('/')
    }



    // UPDATE TOKEN
    const updateToken = async() => {
        // console.log('Token is updated')
        const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({'refresh': authTokens?.refresh})
        })
        const data = await response.json()
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }
        if (loading){
            setLoading(false)
        }
    }




    // CONTEXT DATA
    const contextData ={
        loginUser:loginUser,
        user:user,
        authTokens, authTokens,
        logoutUser:logoutUser
    }




    
    useEffect(()=>{
        if (loading){
            updateToken()
        }
        const fourMinutes = 4 * 60 * 1000
        const interval = setInterval(()=>{
            if (authTokens){
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)

    }, [authTokens, loading])
    


    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}