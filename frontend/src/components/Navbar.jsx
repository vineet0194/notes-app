import { Link } from 'react-router-dom';
import '../index.css'


export default function Navbar(){
    return (
        <div className='navbar'>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/auth/login'>Login</Link>
            <Link to='/user'>User</Link>
        </div>
    )
}