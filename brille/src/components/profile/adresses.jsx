import React, {useContext, useEffect, useState} from 'react';
import {LoginContext} from "../../contexts/loginContext";

function Adresses(props) {
    const {adresses , getAddresses,ignored,addAdresse,deleteAdresse} = useContext(LoginContext);
    const [adrs,setAdrs] = useState([]);
    const [ville,setVille] = useState([]);
    useEffect(() =>{
      getAddresses();
    },[ignored]);
    const submitForm = (e) => {
        e.preventDefault();
        const formData = {"adrs":adrs,"ville":ville};
        addAdresse(formData);
        setAdrs('');
        setVille('');
    }

    const handleDelete = async (id) =>{
        await deleteAdresse(id);
        getAddresses();
    }
    return (
        <div>
            <div>
                <form onSubmit={submitForm}>
                    <div className="input-box mb--30">
                        <input type="text" name='adrs' value={adrs} onChange={(e) => setAdrs(e.target.value)} placeholder="Adresse" />
                    </div>
                    <div className="input-box mb--30">
                        <input type="text" name='ville' value={ville} placeholder="Ville" onChange={(e) => setVille(e.target.value)} />
                    </div>
                    <button type="submit" className="edu-btn  w-100 text-center">Ajouter Une Adresse</button>
                </form>

            </div>

            <table className="table table-hover mt-3">
                <thead>
                <tr>
                    <th>Adresse</th>
                    <th>Ville</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {adresses.length > 0
                    ? adresses.map((adresse) => (
                        <tr key={adresse.idOrder /* if `idOrder` is unique identifier for commandes */}>
                            <td>{adresse.adrs}</td>
                            <td>{adresse.ville}</td>
                            <td onClick={() => deleteAdresse(adresse.idAdrs)} ><strong style={{color:"red",cursor:"pointer"}}>Supprimer</strong></td>
                        </tr>
                    ))
                    : <tr><td colSpan="4"><h6>Aucune Adresse</h6></td></tr>

                }
                </tbody>
            </table>
        </div>
    );
}

export default Adresses;