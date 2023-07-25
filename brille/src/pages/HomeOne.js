import React from 'react';
import { useContext } from 'react';
import SEO from '../common/SEO';
import HeaderTwo from '../common/header/HeaderTwo';
import BannerOne from '../components/banner/BannerOne';
import HomeOneAbout from '../components/HomeOneAbout';
import HomeOneCategory from '../components/HomeOneCategory';
import HomeOneCourses from '../components/HomeOneCourses';
import HomeOneInstructor from '../components/HomeOneInstructor';
import FooterOne from '../common/footer/FooterOne';

import { LoginContext } from '../contexts/loginContext';

const HomeOne = (props) => {

    return (
        <>
            <SEO title="Home" />

            <HeaderTwo styles="header-white header-style-2" />

            <BannerOne />
            
            <HomeOneAbout />

            <HomeOneCategory />



            <FooterOne />
        </>
    )
}

export default HomeOne;