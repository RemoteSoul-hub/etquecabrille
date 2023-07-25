import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {LoginContext} from "../../contexts/loginContext";
import swal from "sweetalert";

function Menu(props) {
    const {user, logOut, total, getTotal,iWantWithdraw} = useContext(LoginContext);
    const navigate = useNavigate();
    const [userLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        if (user) {
            setUserLoaded(true);
        }
    }, [user]);
    useEffect(() => {
        if (userLoaded) {
            getTotal(user.idUser);
            console.log(total)

        }
    }, [userLoaded]);
    const handleClick = async () => {
        await logOut();
        swal({
            title: "Au revoir",
            text: "vous êtes déconnecté",
            icon: "success",
            button: "OK!",
        });
        navigate('/');
    }
    const hadnleWithdraw = () => {
        const formData = {"totalWithdraw":total};
        iWantWithdraw(formData);
        swal({
            title: "Votre demande a été prise en compte ",
            text: "Votre demande est en cours de traitement",
            icon: "success",
            button: "OK!",
        });
        navigate('/profile/1');
    }
    return (
        <div className="eduvibe-sidebar course-details-sidebar">
            <div className="eduvibe-widget-details mt--35">
                <div className="widget-content">
                    {user.typeUser == 1 && total > 0 && (<h6>Total: {total}$</h6>) }




                    <div className="read-more-btn mt--45">
                        <Link to="/profile/1" className="edu-btn btn-bg-alt w-100 text-center">
                            Mes demandes
                        </Link>
                    </div>
                    <div className="read-more-btn mt--45">
                        <Link to="/profile/2" className="edu-btn btn-bg-alt w-100 text-center">
                            Mes Adresses
                        </Link>
                    </div>
                    <div className="read-more-btn mt--45">
                        <Link to="/profile/3" className="edu-btn btn-bg-alt w-100 text-center">
                            Mes informations
                        </Link>
                    </div>
                    {(user.typeUser == 1) &&
                        (
                            <>
                                <div className="read-more-btn mt--45">
                                    <Link to="/profile/4" className="edu-btn btn-bg-alt w-100 text-center">
                                        Mes parrainages.
                                    </Link>
                                </div>
                                <div className="read-more-btn mt--45">
                                    <Link to="/profile/5" className="edu-btn btn-bg-alt w-100 text-center">
                                        Les commandes
                                    </Link>
                                </div>
                                <div className="read-more-btn mt--45">
                                    <Link to="/profile/7" className="edu-btn btn-bg-alt w-100 text-center">
                                        Commandes acceptées
                                    </Link>
                                </div>
                                <div className="read-more-btn mt--45">
                                    <Link to="/profile/6" className="edu-btn btn-bg-alt w-100 text-center">
                                        Disponibilité
                                    </Link>
                                </div>
                                {total > 50 && (
                                    <div className="read-more-btn mt--45">
                                        <button onClick={() => hadnleWithdraw()} type="button" className="edu-btn btn-bg-alt w-100 text-center">
                                            Retirer l'argent
                                        </button>
                                    </div>
                                )

                                }


                            </>

                        )

                    }
                    <div className="read-more-btn mt--45" onClick={() => handleClick()}>
                        <button type="button" className="edu-btn btn-bg-alt w-100 text-center">
                            Deconnecter
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Menu;