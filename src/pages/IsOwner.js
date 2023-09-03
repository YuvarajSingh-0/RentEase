import { useEffect, useState } from "react";
import { collection, addDoc, where, query, getDocs } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const IsOwner = () => {
    const [user, loading] = useAuthState(auth);
    const [isOwner, setIsOwner]=useState();
    const navigate=useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(db, "users"), where("email", "==", user.email));
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot.docs.length)
            if (querySnapshot.docs.length!==0){
                navigate('/auth/ownerdashboard');
                return;
            }
        };
        fetchData();
        console.log("isowner");
    }, [isOwner,navigate,user.email]);

    useEffect(() => {
        console.log("in useeffect",isOwner);
        const addData = async () => {
            console.log("in if");
            const docRef = await addDoc(collection(db, "users"), {
                name: user.displayName,
                email: user.email,
                isOwner: true
            });

        }
        if (isOwner!=null){
            addData();
        }
    }, [isOwner,user.displayName,user.email]);


    return (
        <div>
            <h1>Create Account as</h1>
            <button onClick={() => {
                setIsOwner(true);
                console.log("in setisowner",isOwner);
            }}>Owner</button>
            <button onClick={() => {
                setIsOwner(false);
                console.log("in setisowner",isOwner);
            }}>Tenant</button>
        </div>
        )
}
export default IsOwner;
