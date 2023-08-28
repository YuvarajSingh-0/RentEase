import { useState } from "react";
import HouseCard from "../components/HouseCard";
import dummyData from "../dummyData/paymentsData";
import AddHouseCard from "../components/AddHouseCard";

const Home = () => {
    const [searchValue,setSearchValue]=useState();
    const [houses,setHouses]=useState(dummyData);
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