import React, { useEffect, useState } from 'react';
import { auth, signInWithGoogle, db, logInWithEmailAndPassword } from '../config/firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, } from "firebase/firestore";

// Sign in with Popup
const Login = () => {
    const [user, loading] = useAuthState(auth);
    const [formDetails,setFormDetails]=useState({email:"",password:""});
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            const fetchData = async (user) => {
                const docRef = doc(db, "owners", user.uid);
                const data = await getDoc(docRef);
                // console.log(data.data())
                if (data.data()) {
                    if (data.data().isOwner)
                        navigate('/auth/ownerdashboard');
                    else
                        navigate('/auth/tenantdashboard')
                    return;
                }
                else {
                    // console.log(user);
                    navigate("/auth");
                }
            };
            fetchData(user);
        }
    }, [user, navigate]);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Perform form validation if needed
        logInWithEmailAndPassword(formDetails.email, formDetails.password);
    };

    const handleFormInput = (e) => {
        e.preventDefault();
        setFormDetails((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };


    return (
        <div className='login-page'>
            <h1 className='login-header'>Login</h1>
            <form className='login-form' onSubmit={handleFormSubmit}>
                <input onChange={handleFormInput} type="email" placeholder="Email" name="email" id="email" required />
                <input onChange={handleFormInput} type="password" placeholder="Password" name="password" id="password" required />
                <button type="submit" className='login-btn'>Login</button>
                <hr style={{ width: "100%", color:"#c9caca"}} />
            </form>
            <button className='login-btn' onClick={signInWithGoogle}>{!loading ? "Login with Google" : "loading..."}</button>
        </div>
    )
}

export default Login;