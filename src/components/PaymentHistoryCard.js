const PayementHistoryCard = (props) => {
    console.log("inpokrsoker",props)
    return (
        <div className="payment-history-card">
            <div><i class="fi fi-br-time-past"></i></div>
            <h3>{props.info.paid_by}</h3>
            <div className="badges">
                <p className="p"><i class='fi fi-br-tags'></i>{props.info.amount}</p>
                <p className="p">House No. {props.info.house_no}</p>
                <p className="p"><i class='fi fi-br-city'></i>{props.info.city}</p>
                <p className="p"><i class='fi fi-br-calendar'></i>{props.info.payment_date}</p>
            </div>
        </div>
    )
}

export default PayementHistoryCard;