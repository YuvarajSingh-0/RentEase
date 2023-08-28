const PaymentsCard = (props) => {
    console.log(props);
    return (
        <div className="card">
            <div className="card-image">
                <img src={props.info.img} alt=''></img>
                <button className={props.info.status==='paid'?'green-badge badge':'badge'}>{props.info.status}</button>
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
                        <td>Due Date</td>
                        <td> {props.info.due_date}</td>
                    </tr>
                    <tr>
                        <td>Amount</td>
                        <td> {props.info.amount}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>{props.info.status}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default PaymentsCard;