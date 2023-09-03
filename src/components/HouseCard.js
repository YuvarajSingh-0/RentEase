const HouseCard= (props)=>{
    console.log(props.info);
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
                        <td>{props.info.resident}</td>
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