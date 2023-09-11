import { useEffect, useState  } from 'react';
import { logout } from '../config/firebase';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [user,loading]=useAuthState(auth);
    const [isOwner,setisOwner]=useState(null);
    const navigate=useNavigate();
    useEffect(()=>{
        async function fetchData(user) {
            const docRef = doc(db, "owners", user.uid);
            // console.log(docRef)

            const data=await getDoc(docRef);
            if(data.data()){
                // console.log(data.data().isOwner)
                setisOwner(data.data().isOwner);
            }
        }
        if(user.uid){
            fetchData(user);
        }
    },[user,navigate])
    return (
        isOwner?
        <div className='navbar'>
            <ul>
                <li>
                    <Link to={'/auth'}>
                        <i className="fi fi-br-home">
                        </i>
                    </Link>
                </li>
                <li>
                    <Link to={'/auth/issues'}>
                        <i className="fi fi-br-info"></i>
                    </Link>
                </li>
                <li>
                    <Link to={'/auth/payments'}>
                        <i className="fi fi-br-wallet"></i>
                    </Link>
                </li>
                <li>
                    <li>
                        <Link to={'/auth/profile'}>
                            <i className="fi fi-br-user"></i>
                        </Link>
                    </li>
                    <li onClick={logout}><i className="fi fi-br-sign-out-alt"></i></li>
                </li>
            </ul>
        </div>:<></>
    )
}

export default Navbar;