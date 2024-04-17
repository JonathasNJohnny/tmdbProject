import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
const activatedColor = '#c0c0c0';

export const Profile = () => {
    const [token, setToken] = useState();
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        if (!location.state || !location.state.token) {
            navigate('/login');
            return;
        }
        setToken(location.state.token)
        });

    return (
        <div>
            <Navbar color2={activatedColor} token={token}/>
        </div>
    )   
}

export default Profile;