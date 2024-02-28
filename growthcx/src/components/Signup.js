import React, { useContext, useState } from 'react';
import './Signup.css';
import { SampleContext } from '../App';
import 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase'

function Signup() {
    const [input, setinput] = useState({ fname: "", lname: "", email: "", phone: "", password: "", cpassword: "" });
    const register=collection(db,"register")

    const handlechange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setinput({ ...input, [name]: value });
        console.log("input", input);
    };
    const navigate=useNavigate()
    const handlesubmit = async () => {
        if (input.password !== input.cpassword) {
            console.log("Passwords do not match");
            return;
        }

        if (!input.fname || !input.lname || !input.email || !input.phone || !input.password || !input.cpassword) {
            console.log("All fields are required");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, input.email, input.password);
            const user = userCredential.user;
            console.log(user.uid);
            const id = user.uid;

            if (user) {
                navigate("/home");
                localStorage.setItem('id', id);

                await addDoc(register, {
                    fname: input.fname,
                    lname: input.lname,
                    phone: input.phone,
                    userid:id
                });
            }
        } catch (err) {
            const error = err.message;
            console.log(error);
        }
    };
    return (
        <div className='sign-up'>
            <div className='sign-form'>
                <h1>Register</h1>
                <div>
                    <label>First Name</label>
                    <input onChange={handlechange} name='fname' value={input.fname} />
                </div>
                <div>
                    <label>Last Name</label>
                    <input onChange={handlechange} name='lname' value={input.lname} />
                </div>
                <div>
                    <label>Email Address</label>
                    <input onChange={handlechange} name='email' value={input.email} />
                </div>
                <div>
                    <label>Phone Number</label>
                    <input onChange={handlechange} name='phone' value={input.phone} />
                </div>
                <div>
                    <label>Password</label>
                    <input onChange={handlechange} name='password' value={input.password} />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input onChange={handlechange} name='cpassword' value={input.cpassword} />
                </div>
                <button className='signup-button' onClick={handlesubmit}>Sign Up</button>
            </div>
        </div>
    );
}

export default Signup;