import React from "react"
import './SignUp.css'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { LoginActions } from "../store/slices/login-slice"
import { useHistory } from "react-router-dom"
const Login = () => {
   const dispatch = useDispatch()
   const history = useHistory()
   const [email, setEmail] = useState()
   const [password, setPassword] = useState()

   const buttonClick = () => {
      const user = { email, password }
      fetch('http://localhost:9000/user/login', {
         method: 'POST',
         body: JSON.stringify(user),
         headers: {
            'Content-Type': 'application/json'
         }
      }).then((res) => { return res.json() }
      ).then(data => {
         if (data.status === 'ok') {
            localStorage.setItem('authToken', data.authToken)
            dispatch(LoginActions.setLogin(true))
            history.push('/all_blogs')
         } else {
            console.log('enter correct credentials')
         }
      })
   }

   return (
      <>
         <div className='signUp_body'>
            <div className="container">
               <form action="" >
                  <div className="email_div">Email</div>
                  <input type="text" name="email" className="email" placeholder="Enter your email" onChange={(e) => { setEmail(e.target.value) }} />
               </form>
               <form action="" >
                  <div className="password_div">Password</div>
                  <input type="text" name="password" className="password" placeholder="Enter your password" onChange={(e) => { setPassword(e.target.value) }} />
               </form>
            </div>
            <button className='button' onClick={buttonClick}>Login</button>
         </div>

      </>
   )
}
export default Login