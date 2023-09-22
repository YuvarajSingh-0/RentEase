import { useState, useEffect } from "react";
import HouseCard from "../../components/HouseCard";
import AddHouseCard from "../../components/AddHouseCard";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [user]= useAuthState(auth);
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState();
    const [houses, setHouses] = useState();
    const [searchedData,setSearchedData]=useState();
    useEffect(() => {
        setSearchedData(houses);
    }, [houses]);
    useEffect(() => {
        async function fetchData(user) {
            // const res = await fetch(`http://localhost:5000/api/houses/${user.uid}`);
            const docRef = doc(db, "owners", user.uid);

            // Get a reference to the subcollection
            const subCollectionRef = collection(docRef, "houses");

            // Get the documents in the subcollection
            const querySnapshot = await getDocs(subCollectionRef);

            // console.log("in dash",querySnapshot.docs[0].id)
            // console.log("in dash",querySnapshot.docs)
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
        else {
            navigate('/login')
        }
    }, [user, navigate]);

    function handleSearch(e) {
        setSearchValue(e.target.value);
        if (e.target.value.length > 0) {
            setSearchedData(houses.filter(item => item.address?.toLowerCase().includes(e.target.value.toLowerCase())));
        } else {
            setSearchedData(houses);
        }
    }
    return (

        <div className="home">
            {searchedData?.length === 0 && <h1>No Houses Found</h1>}
            <div className="home-header">
                
                {!searchedData ? <h1>Loading...</h1> : <h1>Home</h1>}
                <div className="searchbar">
                    <input type="text" onChange={handleSearch} value={searchValue} placeholder="Search by Address..." />
                </div>
            </div>
            <div className="grid">
                {searchedData?.map((item, key) => <HouseCard key={key} info={item} />)}
                <AddHouseCard />
            </div>
        </div>
    )
}

export default Home;