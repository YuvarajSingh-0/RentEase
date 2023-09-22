// import issuesData from "../../dummyData/issuesData";
import IssuesCard from "../../components/IssuesCard";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { doc, getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const Issues = () => {
    const [user] = useAuthState(auth);
    const [issuesInfo,setIssuesInfo]=useState();
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData(user) {
            const docRef = doc(db, "owners", user.uid);

            // Get a reference to the subcollection
            const subCollectionRef = collection(docRef, "houses");

            // Get the documents in the subcollection
            const querySnapshot = await getDocs(subCollectionRef);

            // console.log("in dash",querySnapshot.docs[0].id)
            // console.log("in dash",querySnapshot.docs)
            setIssuesInfo(querySnapshot.docs.map(doc => {
                console.log("issues comp",doc.data())
                if (doc.data().issues?.length > 0) {
                    return { ...doc.data(), issues: doc.data().issues.map(item => ({ ...item, houseId: doc.id })) }
                }
                return null;
            }).filter(item => item !== null));
            
        }
        if (user) {
            fetchData(user);
        }
        else {
            navigate('/login')
        }
    }, [user, navigate]);
    return (
        <div>
            <h1>Issues</h1>
            <div className="grid">
                {issuesInfo?.map((item, key) => <IssuesCard key={key} data={item} />)}
            </div>
        </div>
    )
}

export default Issues;