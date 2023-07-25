import React, {useContext, useEffect} from 'react'
import SEO from '../common/SEO';
import Layout from '../common/Layout';
import BreadcrumbOne from '../common/breadcrumb/BreadcrumbOne';
import CommandeForm from '../components/form/CommandeForm'
import RecipteOrder from '../components/form/RecipteOrder';
import { LoginContext } from '../contexts/loginContext';
import {useNavigate} from "react-router-dom";

const FaireCommande = () => {
    const {user} = useContext(LoginContext);
    const navigate = useNavigate();
    useEffect(() => {
        if(!user) {
            navigate('/account');
        }
    },[user])

  return (
    <>
    <SEO title="Faire Commande" />
    <Layout>

        <BreadcrumbOne 
            title="Faire Commande"
            rootUrl="/"
            parentUrl="Home"
            currentUrl="Faire Commande"
        />

        <div className="login-register-page-wrapper edu-section-gap bg-color-white">
            <div className="container checkout-page-style">
                <div className="row g-5">
                    <div className="col-lg-4">
                        <RecipteOrder />
                    </div>
                    <div className="col-lg-8">
                        <CommandeForm />
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</>
  )
}

export default FaireCommande