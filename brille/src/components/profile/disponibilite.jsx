import React, {useContext, useState} from 'react';
import {LoginContext} from "../../contexts/loginContext";

function Disponibilite(props) {
    const {setAvaibility} = useContext(LoginContext);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [day, setDay] = useState('');
    const [isAdded,setIsAdded] = useState(false);

    const submitForm = (e) =>{
        e.preventDefault();
        const formData = {"start":start,"end":end,"day":day};
        setAvaibility(formData);
        setIsAdded(true);
    }


    return (
        <div className="login-form-box">
            <h3 className="mb-30">Disponibilité</h3>
            <h6>Si vous souhaitez modifier cela, veuillez contacter l'administration </h6>
            {isAdded && (<h6 style={{color:"green"}}>A été ajouté avec succès</h6>)}


            <form className="login-form" onSubmit={submitForm}>
                <div className="input-box mb--30">
                    <select  name='day' required
                            onChange={(e) => setDay(e.target.value)}>
                        <option disabled selected>Choisire Le Joure</option>
                        <option value="Dimanche">Dimanche</option>
                        <option value="Lundi">Lundi</option>
                        <option value="Mardi">Mardi</option>
                        <option value="Mercredi">Mercredi</option>
                        <option value="jeudi">Jeudi</option>
                        <option value="Vendredi">Vendredi</option>
                        <option value="Samedi">Samedi</option>
                    </select>
                </div>
                <div className="input-box mb--30">
                    <label>De: </label>
                    <input type="time" required name='start' placeholder="Debut" value={start}
                           onChange={(e) => setStart(e.target.value)}/>
                </div>
                <div className="input-box mb--30">
                    <label>à :</label>
                    <input type="time" required name="end" placeholder="Fin" value={end}
                           onChange={(e) => setEnd(e.target.value)}/>
                </div>

                <button className="rn-btn edu-btn w-100 mb--30" type="submit">
                    <span>Ajouter</span>
                </button>
            </form>
        </div>
    );
}

export default Disponibilite;