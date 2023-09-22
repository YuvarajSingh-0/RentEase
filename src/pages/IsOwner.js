import { useEffect, useState } from "react";
import { getDoc, doc} from "firebase/firestore";
import { db, auth, addUser } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const IsOwner = () => {
    const [user, loading] = useAuthState(auth);
    const [isOwner, setIsOwner] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        console.log("in useeffect", isOwner);
        
        const fetchData = async () => {
            const ownersData=await getDoc(doc(db, "owners", user.uid));
            const tenantsData=await getDoc(doc(db, "tenants", user.uid));
            // const q = query(collection(db, isOwner ? 'owners' : 'tenants'), where("email", "==", user.email));
            // const querySnapshot = await getDocs(q); 
            console.log("in docs",ownersData.data(),tenantsData.data());
            if(ownersData.data()){
                // setIsOwner(true);
                navigate('/auth/ownerdashboard');
                return;
            }
            else if(tenantsData.data()){
                // setIsOwner(false);
                navigate('/auth/tenantdashboard')
                return;
            }
            else{
                // setIsOwner(null);
                return;
            }
        };
        if (isOwner === null) {
            fetchData();
        }
    }, [navigate, isOwner, user]);

    useEffect(() => {
        console.log("in useeffect", isOwner);
        if (isOwner !== null) {
            addUser(user, isOwner);
            if (isOwner) {
                navigate('/auth/ownerdashboard');
            }
            else {
                navigate('/auth/tenantdashboard')
            }
        }
    }, [isOwner, navigate, user]);



    return (
        loading || !isOwner ? <div>Loading...</div> : <div>
            <h1>Create Account as</h1>
            <button onClick={() => {
                setIsOwner(true);
                console.log("in setisowner", isOwner);
            }}>Owner</button>
            <button onClick={() => {
                setIsOwner(false);
                console.log("in setisowner", isOwner);
            }}>Tenant</button></div>

    )
}
export default IsOwner;
