import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context';
const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function Login(){
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const loginUser = async()=>{
        try{
            const response = await axios.post(backendURL + 'auth/login', {
                    username,
                    password
            });
            const data = response.data;
            localStorage.setItem("token", data.token);
            
            const userData = await axios.get(backendURL+'auth/me', {
                "headers": {
                    'Authorization': `Bearer ${data.token}`,
                    'Content-Type': 'application/json'
                }
            })
            setUser(userData.data);
            navigate("/dashboard");

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="loginContainer">
            <div className="login">
                <input
                    id="usernameInput"
                    placeholder="username"
                    type="text"
                    onChange={(e)=>{setUsername(e.target.value);}}
                    required
                />
                <br/>
                
                <input id="passwordInput"
                    type="text"
                    placeholder="password"
                    onChange={(e)=>{setPassword(e.target.value);}}
                    required
                />
                <br/>
                
                <button onClick={loginUser}>
                    Login
                </button>
            </div>
        </div>
    )
}