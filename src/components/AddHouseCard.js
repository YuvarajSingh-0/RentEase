import { useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddHouseCard = () => {

    const fileInput = useRef();

    const handleUpload = async (file) => {
        const storage = getStorage();
        const storageRef = ref(storage, 'house_images/' + file.name);

        // 'file' comes from the Blob or File API
        await uploadBytes(storageRef, file);

        // Get download URL
        const url = await getDownloadURL(storageRef);

        console.log('Uploaded a blob or file!');
        return url;
    }

    const [showForm, setShowForm] = useState(false);
    const [user] = useAuthState(auth);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target);
        const value = Object.fromEntries(data.entries());

        // Get the file from the form and upload it
        const file = data.get('img');
        if (file) {
            const url = await handleUpload(file);

            // Add the download URL of the uploaded file to the value object
            console.log(url)
            value.img = url;
        }

        try {
            const docRef = await addDoc(collection(db, "owners", user.uid, "houses"), {
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

    const AddHouseForm = () => {
        return (
            <form className="addhouseform" method="POST" onSubmit={handleSubmit}>
                <input placeholder="House Number" id="house_no" type="text" name="house_no" />
                <input placeholder="xyz Blakers Street, London" id="address" type="text" name="address" />
                <input placeholder="London" id="city" type="text" name="city" />
                <input placeholder="xyz@wxample.com" id="resident_email" type="text" name="resident_email" />
                <input placeholder="$$$" id="rent" type="number" name="rent" />
                <input placeholder="902xxxxxxx" type="text" id="contact_number" name="contact_number" />
                <input placeholder="$$$" id="payment_due" type="number" name="payment_due" />
                <input type="file" name="img" ref={fileInput} />
                <div className="buttons">
                    <button className="addhouse" type="submit">Add</button>
                    <button className="closeform" onClick={() => setShowForm(false)}>Close</button>
                </div>
            </form>
        )
    }
    return (
        <div className="add-house-card card">
            {showForm ? <AddHouseForm /> :
                <div className="add-house-card-content card-info">
                    <i onClick={() => setShowForm(true)} className='fi fi-br-add'></i>
                </div>}
        </div>

    )
}

export default AddHouseCard;

