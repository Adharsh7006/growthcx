import React, { useState } from 'react'
import '../components/Login.css'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [login, setlogin] = useState({email:"",password:""})
    const navigate=useNavigate()
    const handlechange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setlogin({...login,[name]:value})
    }
    const handlelogin=()=>{
        signInWithEmailAndPassword(auth, login.email, login.password)
  .then((userCredential) => {
    const user = userCredential.user;
    const id=user.uid
    console.log(user)
    if(user){
        navigate("/home")
        localStorage.setItem('id',id);
        console.log(id)
    }
  })
  .catch((err) => {
    const error = err.message;
    alert("email and password doest not match")
  });
    }
  return (
    <div className='log-in'>
        <div className='login-form'>
            <h1>Login</h1>
            <div>
                <label>Email</label>
                <input name='email' value={login.email} onChange={handlechange}/>
            </div>
            <div>
                <label>password</label>
                <input name='password' value={login.password} onChange={handlechange}/>
            </div>
            <button className='signup-button' onClick={handlelogin}>Login</button>
            <div>
            <h4>Do you have an account <Link to="/signup">Sign Up</Link></h4>
            </div>
        </div>
    </div>
  )
}

export default Login