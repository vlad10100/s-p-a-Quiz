import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import './pages.css'

const LoginPage = () => {
    const { loginUser } = useContext(AuthContext)

    return (
        <div className='login-page'>
            <form onSubmit={loginUser}>
                <h4>Login</h4>
                <hr/>
                <label id='username'>Username:</label>
                <input type='text' name='username' placeholder='username' autoComplete='off'/>
                <label id='username'>Password:</label>
                <input type='password' name='password' placeholder='password' />
                <input type='submit' value='Login'/>
            </form>
        </div>
    )
}

export default LoginPage