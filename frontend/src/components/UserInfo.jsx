import { useContext } from 'react';
import { UserContext } from '../context/index.jsx';
import { useNavigate } from 'react-router-dom';

export default function UserInfo(){
    const navigate = useNavigate();
    const { user, loading } = useContext(UserContext);
    
    if (loading){
        return <div>Loading...</div>
    }

    if (!user){
        navigate('/login')
        return;
    }

    return (
        <div className='userContainer'>
            <div className='user'>
                {user.username}<br/>
                {user.firstname} {user.lastname}<br/>
                {user.email}
            </div>
        </div>
    )
}