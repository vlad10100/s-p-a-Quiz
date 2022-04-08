import './app.css'


import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'




const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header/>
        <hr/>
        <Routes>
          <Route element={<PrivateRoute><HomePage /></PrivateRoute>} path='/' exact />
          <Route element={<LoginPage />} path='/login' />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
