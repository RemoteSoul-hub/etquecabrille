import React, {useContext, useEffect} from 'react';
import {LoginContext} from "../../contexts/loginContext";

function MesParinage(props) {
    const {mesParinage,mesParinnage} = useContext(LoginContext);

    useEffect(()=>{
       mesParinage();
    },[]);
    return (

            <div>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Nom:</th>
                        <th>Prénom:</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mesParinnage.length > 0
                        ? mesParinnage.map((prrin) => (
                            <tr key={prrin.idUser /* if `idOrder` is unique identifier for commandes */}>
                                <td>{prrin.userLname}</td>
                                <td>{prrin.userFname}</td>


                            </tr>
                        ))
                        : <tr><td colSpan="5"><h6>Aucune Personne</h6></td></tr>

                    }
                    </tbody>
                </table>
            </div>

    );
}

export default MesParinage;