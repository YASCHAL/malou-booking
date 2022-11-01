import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../config'

import { AuthContext } from '../../context/AuthContext'
import './login.css'

const Login = () => {
    const [credentials,setCredentials] = useState({
        username : undefined,
        password : undefined,
    })
    const {loading, error, dispatch} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleChange = (e)=>{
        setCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
    }
    const handleClick = async e =>{
        e.preventDefault()
        dispatch({type : "LOGIN_START"})
        try{
           const res = await axiosInstance.post('/auth/login',credentials)
           dispatch({type:"LOGIN_SUCCESS", payload : res.data.details})
           navigate('/')
        }catch(err){
            dispatch({type:"LOGIN_FAILURE", payload : err.response.data})
        }
    }

    const goToRegisterPage = () =>{
      navigate('/register')
    }

  return (
    <>
<div className="bg"></div>
<div className="bg bg2"></div>
<div className="bg bg3"></div>
<div className="login">
  <div className="login_container">
  
    <div className="signIn">
      <h1>sign-in</h1>
      <input onChange={handleChange} id="username" type="text" className="username" placeholder=" Username" />
      <input
      onChange={handleChange}
      id="password"
      type="password"
      className="password"
      placeholder=" Your Password"
      />
      <button className='login__button' disabled={loading} onClick={handleClick}>Login</button>
      <button className='register__button'  onClick={goToRegisterPage}>Register</button>
      {error && <span>{error.message}</span>}
    </div>
  </div>
</div>
      </>
  )
}

export default Login