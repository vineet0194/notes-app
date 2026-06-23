import { useContext } from 'react';
import { UserContext } from '../context/index.jsx';
import { Navigate } from 'react-router-dom';

export default function UserInfo(){
    const { user, loading } = useContext(UserContext);
    
    if (loading){
        return <div>Loading...</div>
    }

    if (!user) {
        return <Navigate to="/auth/login" replace />
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