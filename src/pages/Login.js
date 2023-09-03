import React,{useEffect} from 'react';
import { auth, signInWithGoogle, db } from '../config/firebase'
import { getRedirectResult } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import { collection, where, query, getDocs } from "firebase/firestore";

// Sign in with Redirect
const Login = () => {
    const [user, loading] = useAuthState(auth);
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
                else{
                    navigate("/auth");
                }
            };
            fetchData();
        }
    }, [user,navigate]);


    useEffect(() => {
        getRedirectResult(auth)
            .then(async(result) => {
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
                    else{
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

    return (
        <div>
            <h1>Login</h1>
            <button onClick={signInWithGoogle}>{!loading ? "Login with Google": "loading..."}</button>
        </div>
    )
}

export default Login;