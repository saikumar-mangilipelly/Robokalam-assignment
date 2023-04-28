import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import { Navigate, Route, Routes } from 'react-router-dom'
import Mainpage from './components/mainpage/Mainpage'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/mainpage' element={<Protected><Mainpage /></Protected>}/>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
export function Protected({ children }) {
  if (localStorage.getItem('token')) {
    return children
  }
  else {
    return <Navigate to="/login"></Navigate>
  }
}
