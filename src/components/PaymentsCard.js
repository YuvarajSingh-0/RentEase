const PaymentsCard = (props) => {
    console.log(props.info);
    return (
        <div className="card">
            <div className="card-image">
                <img src={props.info.img} alt=''></img>
                <button className={props.info.paymentStatus==='paid'?'green-badge badge':'badge'}>{props.info.paymentStatus}</button>
            </div>
            <div className="card-info">
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
                        <td>Rent</td>
                        <td> {props.info.amount}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>{props.info.paymentStatus}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default PaymentsCard;