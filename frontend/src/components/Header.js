import './header.css'



// HEADER --> Page Title + NavLinks


import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
	const {user, logoutUser} = useContext(AuthContext)

	return (
		<div className='header'>
			<h3>Quiz App</h3>
			
			<div>
				{user && <Link className='username' to={user.username}>{user.username}</Link>}
				<Link className='home' to='/'>Home</Link>
				{user ? 
					(<Link className='logout' to='/' onClick={logoutUser}>Logout</Link>) :
					(<Link className='login'to='/login'>Login</Link>)
				}
			</div>
		</div>
	)
}

export default Header