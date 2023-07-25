import React, {useContext, useEffect, useReducer, useState} from 'react';
import {CommandeContext} from "../../contexts/CommandeContext";
import swal from 'sweetalert';

function Demmandes(props) {
    const {demmandes, mesDemmandes, accepterDemmande} = useContext(CommandeContext);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    useEffect(() => {
        mesDemmandes();
    },[ignored]);

    const accepterOrder = (id) =>{
        accepterDemmande(id);
        swal({
            title: "Félicitation",
            text: "Vous avez accepté cette commande.",
            icon: "success",
            button: "OK!",
        });
        forceUpdate();
    }
    return (
        <div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Service</th>
                    <th>Particulier</th>
                    <th>date Realisation</th>
                    <th>Numero de Téléphone</th>
                    <th>Adresse</th>
                    <th>Ville</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {demmandes.length > 0
                    ? demmandes.map((demmande) => (
                        <tr key={demmande.idOrder /* if `idOrder` is unique identifier for commandes */}>
                            <td>{demmande.subServiceName}</td>
                           <td>{demmande.userFname} {demmande.userLname}</td>

                            <td>{demmande.dateDelivery}</td>
                            <td>{demmande.telUser}</td>
                            <td>{demmande.adrs}</td>
                            <td>{demmande.ville}</td>
                            <td><strong style={{color:"green",cursor:"pointer"}} onClick={() => accepterOrder(demmande.idOrder)}>Accepter</strong></td>
                        </tr>
                    ))
                    : <tr><td colSpan="5"><h6>Aucune Commande</h6></td></tr>

                }
                </tbody>
            </table>
        </div>
    );
}

export default Demmandes;