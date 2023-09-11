import { useState } from "react";
import HouseCard from "../components/HouseCard";
import dummyData from "../dummyData/paymentsData";
import AddHouseCard from "../components/AddHouseCard";
import { useEffect } from "react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import React from "react";

const Home = () => {
    const [user, loading] = useAuthState(auth);
    const navigate=useNavigate();
    const [searchValue,setSearchValue]=useState();
    const [houses,setHouses]=useState(dummyData);
    useEffect(() => {
        async function fetchData(user) {
            // const res = await fetch(`http://localhost:5000/api/houses/${user.uid}`);
            const docRef = doc(db, "owners", user.uid);

            // Get a reference to the subcollection
            const subCollectionRef = collection(docRef, "houses");

            // Get the documents in the subcollection
            const querySnapshot = await getDocs(subCollectionRef);

            // console.log("in dash",querySnapshot.docs[0].id)
            console.log("in dash",querySnapshot.docs)
            setHouses(querySnapshot.docs.map(doc => doc.data()));
            // querySnapshot.forEach((doc) => {
            //     // console.log(doc.id, " => ", doc.data());
            //     // console.log("in dashboard",houses)
            //     setHouses((prev)=>([...prev,doc.data()]))
            // });
        }
        if (user) {
            fetchData(user);
        }
        else{
            navigate('/login')
        }
    }, [user, navigate]);

    function handleSearch(e){
        setSearchValue(e.target.value);
        if(e.target.value.length>0){
            setHouses(dummyData.filter(item=>item.address.toLowerCase().includes(e.target.value.toLowerCase())));
        }else{
            setHouses(dummyData);
        }
    }
    return (
        <div className="home">
            <div className="home-header">
                <h1>Home</h1>
                <div className="searchbar">
                    <input type="text" onChange={handleSearch} value={searchValue} placeholder="Search by Address..." />
                </div>
            </div>
            <div className="grid">
                {houses.map((item, key) => <HouseCard key={key} info={item} />)}
                <AddHouseCard />
            </div>
        </div>
    )
}

export default Home;