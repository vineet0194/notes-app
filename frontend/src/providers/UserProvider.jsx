import axios from "axios";
import { useState, useEffect } from "react";
import { UserContext } from "../context";
import { useNavigate } from "react-router-dom";
const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function UserProvider( {children} ){
    const navigate = useNavigate();
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading] = useState(true);

    useEffect(()=>{
        const token = localStorage.getItem('token');

        if (!token) {
            setLoading(false);
            return;
        }
        
        const fetchUser = async() =>{
            try{
                const userData = await axios.get(backendURL+'auth/me', {
                    "headers": {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                setUser(userData.data);
            } catch(error){
                localStorage.removeItem("token");
                setUser(null);
                navigate("/login");
            } finally{
                setLoading(false);
            }
        }

        fetchUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                loading
            }}
        >
            {children}
        </UserContext.Provider>
    )
}