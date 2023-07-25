import axios from 'axios';
import React, {useContext} from 'react';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import {LoginContext} from "../../contexts/loginContext";
import swal from "sweetalert";

const LoginForm = () => {
    const {logIn} = useContext(LoginContext);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        const formData = {"email":email,"password":password};
        logIn(formData);
        swal({
            title: "Bienvenu",
            text: "Vous êtes connecté",
            icon: "success",
            button: "OK!",
        });
        navigate('/');
    }

    return (
        <div className="login-form-box">
            <h3 className="mb-30">Connexion</h3>
            <form className="login-form" onSubmit={submit}>
                <div className="input-box mb--30">
                    <input type="email" name='email' required placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="input-box mb--30">
                    <input type="password" required placeholder="Mot de passe" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <button className="rn-btn edu-btn w-100 mb--30" type="submit">
                    <span>connecter</span>
                </button>
            </form>
        </div>
    )
}

export default LoginForm;