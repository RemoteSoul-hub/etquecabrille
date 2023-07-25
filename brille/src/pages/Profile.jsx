import React, {useContext, useEffect} from 'react';
import Layout from "../common/Layout";
import BreadcrumbOne from "../common/breadcrumb/BreadcrumbOne";
import SEO from "../common/SEO";
import Menu from "../components/profile/menu";
import Commande from "../components/profile/commande";
import {useNavigate, useParams} from "react-router-dom";
import Adresses from "../components/profile/adresses";
import Information from "../components/profile/information";
import Disponibilite from "../components/profile/disponibilite";
import Demmandes from "../components/profile/demmandes";
import MesDemandes from "../components/profile/mesDemandes";
import MesParinage from "../components/profile/mesParinage";
import {LoginContext} from "../contexts/loginContext";

function Profile(props) {
    const {user} = useContext(LoginContext);
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if(!user) {
            navigate('/account');
        }
    },[user])


    return (
        <Layout>
            <SEO title="Mon Profile" />
            <BreadcrumbOne
                title="Mon Profil"
                rootUrl="/"
                parentUrl="Accueil"
                currentUrl="Mon Profil"

            />
            <div className="login-register-page-wrapper edu-section-gap bg-color-white">
                <div className="container checkout-page-style">
                    <div className="row g-5">
                        <div className="col-lg-3">
                            <Menu />
                        </div>
                        <div className="col-lg-9">
                            {id == 1 && (<Commande />)}
                            {id == 2 && (<Adresses /> )}
                            {id == 3 && (<Information />)}
                            {id == 4 && (<MesParinage />)}
                            {id == 5 && (<Demmandes />)}
                            {id == 6 && (<Disponibilite />)}
                            {id == 7 && (<MesDemandes />)}

                        </div>
                    </div>
                </div>
            </div>




        </Layout>
    );
}

export default Profile;