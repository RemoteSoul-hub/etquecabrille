import React, { useContext, useEffect } from 'react';
import { CommandeContext } from "../../contexts/CommandeContext";
import swal from 'sweetalert';
function Commande(props) {
    const { commandes, mesCommandes, anullerCommade } = useContext(CommandeContext);

    useEffect(() => {
        mesCommandes();
    }, [commandes]);

    const handleClick = (idOrder) => {
        swal({
            title: "Êtes-vous sûr(e) ?",
            text: "Une fois supprimée, cette commande ne sera plus prise en compte.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    anullerCommade(idOrder);
                    swal("Votre commande a été annulée avec succès. Veuillez nous contacter pour le remboursement.", {
                        icon: "success",
                    });
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }





    return (
        <div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Service</th>
                    <th>Professionnel</th>
                    <th>date Réalisation</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {commandes.length > 0
                    ?
                    commandes.map((commande) => (
                        <tr key={commande.idOrder /* if `idOrder` is unique identifier for commandes */}>
                            <td>{commande.subServiceName}</td>
                            {commande.userFname && (<td>{commande.userFname} {commande.userLname}</td>)
                                || (<td>Pas Encore</td>)
                            }
                            <td>{commande.dateDelivery}</td>
                            {commande.orderStatus == 0 && (<td>Precesse</td>)}
                            {commande.orderStatus == 1 && (<td>Accepter</td>)}
                            {commande.orderStatus == 2 && (<td>Completer</td>)}
                            {commande.orderStatus == -1 && (<td>Anuller</td>)}

                                <td onClick={() => handleClick(commande.idOrder)}><strong style={{color:"red",cursor:"pointer"}}>Anuller</strong></td>


                        </tr>
                    ))
                    : <tr><td colSpan="5"><h6>Aucune Demande</h6></td></tr>

                }
                </tbody>
            </table>
        </div>
    );
}

export default Commande;
