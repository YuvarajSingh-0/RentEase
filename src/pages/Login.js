import React, { useEffect, useState } from 'react';
import { auth, signInWithGoogle, db, logInWithEmailAndPassword } from '../config/firebase'
import { getRedirectResult } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import { collection, where, query, getDocs } from "firebase/firestore";

// Sign in with Redirect
const Login = () => {
    const [user, loading] = useAuthState(auth);
    const [formDetails,setFormDetails]=useState({email:"",password:""});
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                const q = query(collection(db, "users"), where("email", "==", user.email));
                const querySnapshot = await getDocs(q);
                console.log(querySnapshot.docs.length)
                if (querySnapshot.docs.length !== 0) {
                    navigate('/auth/ownerdashboard');
                    return;
                }
                else {
                    navigate("/auth");
                }
            };
            fetchData();
        }
    }, [user, navigate]);


    useEffect(() => {
        getRedirectResult(auth)
            .then(async (result) => {
                if (result) {
                    // This gives a Google Access Token and other user details.
                    const user = result.user;
                    const q = query(collection(db, "users"), where("email", "==", user.email));
                    const querySnapshot = await getDocs(q);
                    console.log(querySnapshot.docs.length)
                    if (querySnapshot.docs.length !== 0) {
                        navigate('/auth/ownerdashboard');
                        return;
                    }
                    else {
                        // console.log(user);
                        navigate("/auth");
                    }
                }
            })
            .catch((error) => {
                // Handle sign-in errors
                console.log(error);
            });
    }, [navigate]);

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