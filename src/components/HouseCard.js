import {getDoc} from 'firebase/firestore';
import { useEffect, useState } from 'react';
const HouseCard= (props)=>{
    const [name,setName]=useState("");
    // console.log(props.info);
    // async get and set resident name
    async function getName(docRef){
        const data=await getDoc(docRef);
        if(data.exists()){
            setName(data.data().name);
        }
    }

    useEffect(()=>{
        // console.log(props.info.resident,typeof(props.info.resident))
        if(typeof(props.info.resident)!='string' && props.info.resident){
            getName(props.info.resident);
        }
    },[])

    return (
        <div className="card">
            <div className="card-image">
                <img src={props.info.img} alt=''></img>
            </div>
            <div className="card-info">
                {props.info.isOccupied?<h3 className="badge green-badge">Occupied</h3>:<h3 className="badge red-badge">Vacant</h3>}
                <table>
                    <tr>
                        <td>House No.</td>
                        <td>{props.info.house_no}</td>
                    </tr>
                    <tr>
                        <td>Resident</td>
                        <td>{name}</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>{props.info.phone}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>{props.info.address}</td>
                    </tr>
                    <tr>
                        <td>Payment Due</td>
                        <td>{props.info.amount}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}
export default HouseCard;