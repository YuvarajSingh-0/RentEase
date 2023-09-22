const HouseCard= (props)=>{
    const {house_no,address,city,payment_due,resident_email,contact_number,img}=props.info;
    // console.log(props.info);

    return (
        <div className="card">
            <div className="card-image">
                <img src={img} alt=''></img>
            </div>
            <div className="card-info">
                {resident_email?<h3 className="badge green-badge">Occupied</h3>:<h3 className="badge red-badge">Vacant</h3>}
                <table>
                    <tr>
                        <td>House No.</td>
                        <td>{house_no}</td>
                    </tr>
                    <tr>
                        <td>Resident</td>
                        <td>{resident_email}</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>{contact_number}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>{address}</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>{city}</td>
                    </tr>
                    <tr>
                        <td>Payment Due</td>
                        <td>{payment_due}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}
export default HouseCard;