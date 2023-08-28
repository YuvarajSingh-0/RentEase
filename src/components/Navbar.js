import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <div className='navbar'>
            <ul>
                <li>
                    <Link to={'/'}>
                        <i className="fi fi-br-home">
                        </i>
                    </Link>
                </li>
                <li>
                    <Link to={'/issues'}>
                        <i class="fi fi-br-info"></i>
                    </Link>
                </li>
                <li>
                    <Link to={'/payments'}>
                        <i class="fi fi-br-wallet"></i>
                    </Link>
                </li>
                <li>
                    <li>
                        <Link to={'/profile'}>
                            <i class="fi fi-br-user"></i>
                        </Link>
                    </li>
                    <li><i class="fi fi-br-sign-out-alt"></i></li>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;