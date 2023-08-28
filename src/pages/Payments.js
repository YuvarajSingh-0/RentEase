import { useState } from 'react';
import PaymentsCard from '../components/PaymentsCard';
import paymentsData from '../dummyData/paymentsData';
import PayementHistoryCard from '../components/PaymentHistoryCard';

const Payments = () => {
    const [filter, setFilter] = useState('all');
    const [data, setData] = useState(paymentsData);
    function handleFilter(e) {
        setFilter(e.target.innerText.toLowerCase());
        let filteredData = paymentsData.filter((item) => {
            if (e.target.innerText.toLowerCase() === 'all')
                return item;
            return item.status === e.target.innerText.toLowerCase()
        });
        // console.log(filteredData);
        setData(filteredData);

    }
    // const sortedData = [...paymentsData].sort((a, b) => {
    //     const dateA = new Date(a.paymentDate.split('/').reverse().join('-'));
    //     const dateB = new Date(b.paymentDate.split('/').reverse().join('-'));
    //     return dateA - dateB;
    // });
    return (
        <div>
            <h1>Payments</h1>
            <div className="payments-tabs">
                <h4 className={filter==='all' ? 'active': ''} onClick={handleFilter}>All</h4>
                <h4 className={filter === 'pending' ? 'active' : ''} onClick={handleFilter}>Pending</h4>
                <h4 className={filter === 'paid' ? 'active' : ''} onClick={handleFilter}>Paid</h4>
                <h4 className={filter === 'history' ? 'active' : ''} onClick={handleFilter}>History</h4>
            </div>
            {filter === 'history' && 
                <div className="payment-history-list">
                    {
                        paymentsData
                            .filter(item => item.status === 'paid')
                            .sort((a, b) => {
                                const dateA = new Date(a.paymentDate.split('/').reverse().join('-'));
                                const dateB = new Date(b.paymentDate.split('/').reverse().join('-'));
                                return dateA - dateB;
                            })
                            .map((item, key) => <PayementHistoryCard key={key} info={item} />)
                    }

                    {/* {paymentsData.filter((item)=> item.status==='paid').map((item, key) => <PayementHistoryCard key={key} info={item} />)} */}
                </div>
            }
            {filter !== 'history' &&
                <div className="grid">
                    {data.map((item, key) => <PaymentsCard key={key} info={item} />)}
                </div>
            }

        </div>
    )
}

export default Payments;
