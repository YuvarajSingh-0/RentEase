import { useState, useEffect } from 'react';
import PaymentsCard from '../components/PaymentsCard';
import PaymentHistoryCard from '../components/PaymentHistoryCard';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/firebase';
import { doc, getDocs, collection } from 'firebase/firestore';
import paymentsData from '../dummyData/paymentsData';

const Payments = () => {
    const [user] = useAuthState(auth);
    const [filter, setFilter] = useState('all');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        setFilteredData(data);
    }, [data])

    useEffect(() => {
        async function fetchData(user) {
            const docRef = doc(db, "owners", user.uid);
            const subCollectionRef = collection(docRef, "houses");
            const houseID = await getDocs(subCollectionRef);
            const temp_data = await Promise.all(houseID.docs.map(async (housedoc) => {
                const paymentsDataRef = collection(subCollectionRef, housedoc.id, "paymentsData");
                const paymentsData = await getDocs(paymentsDataRef);
                return paymentsData.docs.map(paymentdoc => {
                    const paymentDate = paymentdoc.data().payment_date.toDate();
                    const currentDate = new Date();
                    const durationInMilliseconds = currentDate - paymentDate;
                    const durationInDays = Math.floor(durationInMilliseconds / (1000 * 60 * 60 * 24));
                    let paymentStatus;
                    if (durationInDays <= 30) {
                        paymentStatus = 'paid';
                    } else {
                        paymentStatus = 'pending';
                    }
                    return { ...paymentdoc.data(), houseId: housedoc.id, house_no: housedoc.data().house_no, resident_email: housedoc.data().resident_email, img: housedoc.data().img, city:housedoc.data().city,paymentStatus: paymentStatus }
                });
            }));

            let allData = [];
            temp_data.forEach((item) => {
                item.forEach((i) => {
                    allData.push(i);
                })
            })
            setData(allData);
        }
        if (user) {
            fetchData(user);
        }
    }, [user])



    // function handleFilter(e) {
    //     setFilter(e.target.innerText.toLowerCase());

    //     if (e.target.innerText.toLowerCase() === 'history') {
    //         let paid_data = data
    //             .filter(item => item.paymentStatus === 'paid')
    //         paid_data
    //             .sort((a, b) => {
    //                 const dateA = new Date(a.payment_date);
    //                 const dateB = new Date(b.payment_date);
    //                 return dateA - dateB;
    //             })
    //         setFilteredData([...paid_data]);
    //         return;
    //     }
    //     setFilteredData(data.filter((item) => {
    //         if (e.target.innerText.toLowerCase() === 'all') {
    //             return true;
    //         }
    //         return item.paymentStatus === e.target.innerText.toLowerCase()
    //     }));
    // }

    function handleFilter(e) {
        setFilter(e.target.innerText.toLowerCase());

        if (e.target.innerText.toLowerCase() === 'history') {
            let paid_data = data
                .filter(item => item.paymentStatus === 'paid');
            paid_data.sort((a, b) => {
                const dateA = new Date(a.payment_date.seconds * 1000);
                const dateB = new Date(b.payment_date.seconds * 1000);
                return dateA - dateB;
            });
            setFilteredData([...paid_data]);
            return;
        }
        setFilteredData(data.filter((item) => {
            if (e.target.innerText.toLowerCase() === 'all') {
                return true;
            }
            return item.paymentStatus === e.target.innerText.toLowerCase();
        }));
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
                <h4 className={filter === 'all' ? 'active' : ''} onClick={handleFilter}>All</h4>
                <h4 className={filter === 'pending' ? 'active' : ''} onClick={handleFilter}>Pending</h4>
                <h4 className={filter === 'paid' ? 'active' : ''} onClick={handleFilter}>Paid</h4>
                <h4 className={filter === 'history' ? 'active' : ''} onClick={handleFilter}>History</h4>
            </div>
            {filter === 'history' &&
                <div className="payment-history-list">
                    {/* {filteredData.map((item, key) => <PayementHistoryCard key={key} info={item} />)} */}
                    {filteredData.map((item, key) =>
                        <PaymentHistoryCard key={key} info={{ ...item, payment_date: new Date(item.payment_date.seconds * 1000).toLocaleDateString() }} />
                    )}
                    {/* {paymentsData.filter((item)=> item.status==='paid').map((item, key) => <PayementHistoryCard key={key} info={item} />)} */}
                </div>
            }
            {filter !== 'history' &&
                <div className="grid">
                    {filteredData.map((item, key) => <PaymentsCard key={key} info={item} />)}
                </div>
            }

        </div>
    )
}

export default Payments;
