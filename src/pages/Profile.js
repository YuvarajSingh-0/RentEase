import { useState } from 'react';
import dummyData from '../dummyData/paymentsData';

const Profile = () => {
    const user=dummyData[0];
    const [disableInput, setDisableInput] = useState(true);
    const [details, setDetails] = useState({name:user.resident,phone:user.phone,email:user.email,properties:user.properties,activeProperties:user.activeProperties}); //['name', 'phone', 'email', 'properties', 'active properties'
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value });
    }
    
    return (
        <div>
            <div className="profile-header">
                <h1>Profile</h1>
                <div onClick={()=> setDisableInput((prev)=> !prev) }>
                    {disableInput ? <i class="fi fi-br-edit"></i> : <i class="fi fi-br-check"></i>}
                    
                </div>
            </div>
            <div className="profile-info">
                <table>
                    <tr>
                        <td>Name</td>
                        <td><input name="name" disabled={disableInput} onChange={handleChange} type="text" value={ details.name }></input></td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td><input name="phone" disabled={disableInput} onChange={handleChange} type="text" value={details.phone}></input></td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td><input name="email" disabled={disableInput} onChange={handleChange} type="text" value={details.email}></input></td>
                    </tr>
                    <tr>
                        <td>Total Properties</td>
                        <td><input name="properties" disabled={disableInput} onChange={handleChange} type="text" value={details.properties}></input></td>
                    </tr>
                    <tr>
                        <td>Currently Active Properties</td>
                        <td><input name="activeProperties" disabled={disableInput} onChange={handleChange} type="text" value={details.activeProperties}></input></td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Profile;