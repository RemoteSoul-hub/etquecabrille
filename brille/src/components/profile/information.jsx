import React, {useContext, useState} from 'react';
import axios from "axios";
import {Navigate} from "react-router-dom";
import {LoginContext} from "../../contexts/loginContext";

function Information(props) {

    const {user,editInforamtion} = useContext(LoginContext);
    const hideShow = (idToHide, idToShow) => {
        let hideElement = document.getElementById(idToHide);
        let showElement = document.getElementById(idToShow);
        hideElement.style.display = 'none';
        showElement.style.display = 'block';
    }


    const [fname, setFname] = useState(user.userFname);
    const [lname, setLname] = useState(user.userLname);
    const [email, setEmail] = useState(user.email);
    const [telUser, setTelUser] = useState(user.telUser);
    const [isRegister, setIsRegister] = useState(false);

    const editUser =  (e) => {
        e.preventDefault();
        const formData = {"userFname":fname,"userLname":lname,"email":email,"telUser":telUser};
        editInforamtion(formData)
        if (isRegister) return <Navigate to="/account"/>;
    }
    return(
    <div className="login-form-box">
        <h3 className="mb-30">Modifier mes informations</h3>
        <h6>Pour modifier vos informations personnelles telles que le mot de passe et le compte bancaire, veuillez nous envoyer un e-mail avec les détails des modifications que vous souhaitez apporter. Nous vous répondrons dans les meilleurs délais pour vous guider dans le processus de mise à jour de vos informations.</h6>

        <form className="login-form" onSubmit={editUser}>
            <div className="fisrt" id='first'>

                <div className="input-box mb--30">
                    <input type="text" name='fname' placeholder="Nom" value={fname}
                           onChange={(e) => setFname(e.target.value)}/>
                </div>
                <div className="input-box mb--30">
                    <input type="text" name='lname' value={lname} placeholder="Prénom"
                           onChange={(e) => setLname(e.target.value)}/>
                </div>
                <div className="input-box mb--30">
                    <input type="email" name='email' placeholder="Email" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="input-box mb--30">
                    <input type="tel" name='telUser' value={telUser} onChange={(e) => setTelUser(e.target.value)}
                           placeholder="Téléphone"/>
                </div>

                <button type='submit' className="rn-btn edu-btn w-100 mb--30">
                    <span>Modifier</span>
                </button>
            </div>


        </form>
    </div>
    );
}

export default Information;