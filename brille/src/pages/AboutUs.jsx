import React from 'react';
import SEO from '../common/SEO';
import HeaderOne from '../common/header/HeaderOne';
import BreadcrumbOne from '../common/breadcrumb/BreadcrumbOne';
import AboutSeven from '../components/about/AboutSeven';
import AboutUsOneService from '../components/about-us-one/AboutUsOneService';
import AboutSix from '../components/about/AboutSix';
import AboutOne from '../components/about/AboutThree';
import AboutUsOneTeam from '../components/about-us-one/AboutUsOneTeam';
import FooterTwo from '../common/footer/FooterTwo';
import FooterOne from "../common/footer/FooterOne";

const AboutUs = () => {
    return (
        <>
            <SEO title="About Us 1" />

            <HeaderOne />

            <BreadcrumbOne 
                title="À propos"
                rootUrl="/"
                parentUrl="Accueil"
                currentUrl="À propos"
            />

            




            <AboutOne />




            <FooterOne />
        </>
    )
}

export default AboutUs;