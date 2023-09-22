import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {addDoc,collection} from "firebase/firestore";
import { db, auth } from "../config/firebase";

const AddHouseCard = () => {
    const [showForm,setShowForm]=useState(false);
    const [user] = useAuthState(auth);
    const handleSubmit=async (e)=>{
        e.preventDefault()
        const data = new FormData(e.target);
        const value = Object.fromEntries(data.entries());
        // console.log(value);
        console.log(user);
        try {
            const docRef = await addDoc(collection(db, "owners", user.uid,"houses"), {
                ...value
            });
            console.log("Document written with ID: ", docRef.id);
            alert("Added Successfully")
            setShowForm(false);


        } catch (e) {
            alert('Error');
            console.log(e);
        }

    }
    const AddHouseForm=()=>{
        return(
            <form className="addhouseform" method="POST" onSubmit={handleSubmit}>
                <input placeholder="House Number" id="house_no" type="text" name="house_no"/>
                {/* <label htmlFor="house_no">House Number</label> */}
                <input placeholder="xyz Blakers Street, London" id="address" type="text" name="address"/>
                {/* <label htmlFor="address">Address</label> */}
                <input placeholder="London" id="city" type="text" name="city"/>
                {/* <label htmlFor="city">City</label> */}
                <input placeholder="xyz@wxample.com" id="resident_email" type="text" name="resident_email"/>
                {/* <label htmlFor="resident_email">Tenant Email</label> */}
                <input placeholder="$$$" id="rent" type="number" name="rent"/>
                <input placeholder="902xxxxxxx" type="text" id="contact_number" name="contact_number" />
                {/* <label htmlFor="contact_number"></label> */}
                {/* <label htmlFor="rent">Rent</label> */}
                <input placeholder="$$$" id="payment_due" type="number" name="payment_due"/>
                {/* <label htmlFor="payment_due">Payment Due</label> */}
                <div className="buttons">
                <button className="addhouse" type="submit">Add</button>
                <button className="closeform" onClick={()=>setShowForm(false)}>Close</button>
                </div>
            </form>
        )
    }
    return (
        <div className="add-house-card card">
            {showForm?<AddHouseForm/>:
            <div className="add-house-card-content card-info">
                <i onClick={()=>setShowForm(true)} className='fi fi-br-add'></i>
            </div>}
        </div>

    )
}

export default AddHouseCard;