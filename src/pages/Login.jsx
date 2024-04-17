import { styled, createGlobalStyle } from 'styled-components';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button1 from "../components/Button1";
import Input1 from "../components/Input1";
import { Icon } from '@iconify/react/dist/iconify.js';

const API_KEY = '72685f398b32e9d77e422b1b37d21421';

export const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");

    useEffect(() => {
        if (username && password) {
            handleLogin();
        }
    }, [username, password]);

    const handleLogin = async () => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/authentication/token/new?api_key=' + API_KEY);
            const token = response.data.request_token;

            const loginResponse = await axios.post(
                'https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=' + API_KEY,
                {
                    username,
                    password,
                    request_token: token
                }
            );
            navigate('/', { state: { token } });
        } catch (error) {
            console.error('login error:', error);
            setError('login error, verify your credentials');
            toast.error('Login error, verify your credentials')
        }
    };

    const handleLoginDemo = () => {
        setUsername('randomAccountProject')
        setPassword('random123')
        handleLogin()
    }

    const handleInfo = () => {
        toast.info("Use your Tmdb account to log in! https://www.themoviedb.org/");
        toast.info("If you don't want to create an account, click the (Don't have account?) button, to use our demo account!");
    }

    return (
        <div className={'divBody'}>
            <ToastContainer />
            <GlobalStyle/>
            <CornerButton>
                <Button1 placeholder={"Don't have account?"} onClick={handleLoginDemo}/>
            </CornerButton>
            <LoginBox className={'bg-dark'}>
                <IconWrapper onClick={handleInfo}>
                    <Icon icon='mingcute:question-line' color='#f0ffff94' fontSize={'30px'}/>
                </IconWrapper>
                <h2>Login</h2>
                <Input1 type={'text'} placeholder={'Username'} onChange={(e) => setUsername(e.target.value)}/>
                <Input1 type={'Password'} placeholder={'Password'} onChange={(e) => setPassword(e.target.value)}/>
                <br/><Button1 onClick={handleLogin} placeholder={'Login'}/>
            </LoginBox>
        </div>
    );
};

export default Login;

const GlobalStyle = createGlobalStyle`
    .divBody {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
    }
`;

const LoginBox = styled.div`
    position: relative;
    text-align: center;
    border-radius: 5%;
    display: flex;
    flex-direction: column;
    padding: 50px 60px 80px 60px;
    justify-content: center;
    align-items: center;

    h2 {
        color: #f0ffff94;
    }

    @media (max-width: 768px) {
        padding: 20px;
    }
`

const CornerButton = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
`

const IconWrapper = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
    cursor: pointer;
`
