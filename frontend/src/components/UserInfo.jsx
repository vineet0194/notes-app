import { useContext } from 'react';
import { UserContext } from '../context/index.jsx';

export default function UserInfo(){
    const { user } = useContext(UserContext);
    
    return (
        <div className='userContainer'>
            <div className='user'>
                {user.username}<br/>
                {user.firstName} {user.lastName}<br/>
            </div>
        </div>
    )
}