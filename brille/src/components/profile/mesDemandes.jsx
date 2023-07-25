import React, {useContext, useEffect, useReducer} from 'react';
import {CommandeContext} from "../../contexts/CommandeContext";

function MesDemandes(props) {
    const {demmandesAccepter, mesDemmandesAccepter} = useContext(CommandeContext);
    const [ignored] = useReducer(x => x + 1, 0);
    useEffect(() => {
        mesDemmandesAccepter();
    },[ignored]);

    return (
        <div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Service</th>
                    <th>Particulier</th>
                    <th>date Realisation</th>
                    <th>Numéro de Téléphone</th>
                    <th>Adresse</th>
                    <th>Ville</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {demmandesAccepter.length > 0
                    ? demmandesAccepter.map((demmande) => (
                        <tr key={demmande.idOrder /* if `idOrder` is unique identifier for commandes */}>
                            <td>{demmande.subServiceName}</td>
                            <td>{demmande.userFname} {demmande.userLname}</td>

                            <td>{demmande.dateDelivery}</td>
                            <td>{demmande.telUser}</td>
                            <td>{demmande.adrs}</td>
                            <td>{demmande.ville}</td>
                            {demmande.orderStatus == 1 && (<td style={{color:"red"}}>Pas Encore</td>)}
                            {demmande.orderStatus == 2 && (<td style={{color:"green"}}>Termineé</td>)}
                        </tr>
                    ))
                    : <tr><td colSpan="5"><h6>Aucune Demmandes</h6></td></tr>

                }
                </tbody>
            </table>
        </div>
    );
}

export default MesDemandes;