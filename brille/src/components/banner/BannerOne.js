import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollTo } from 'react-scroll';
import { LoginContext } from '../../contexts/loginContext';

const BannerOne = () => {

    return (
        <div className="slider-area banner-style-1 bg-image height-640 d-flex align-items-center"    style={{
            height:"400px",
            backgroundImage:"url('/images/myImages/OIP.jpeg')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }} >
            <div  className="container eduvibe-animated-shape">
                <div  className="row g-5 row--40 align-items-center">
                    <div className="order-2 order-xl-1 col-lg-6 col-xl-12" >
                        <div className="banner-left-content">
                            <div className="inner">
                                <div className="content">

                                    <h1 className="title">Ménage ponctuel ou régulier</h1>
                                    <span className="pre-title">LA OU IL Y A UN PROFESSIONNEL, IL Y A DES CLIENTS
                                        SATISFAITS. ET QUE ÇA BRILLE S’INSTALLE PARTOUT
                                        EN FRANCE.<br/> Nos Maitres Mots : Qualité, Confiance, Compétence ET Réactivité.
                                      </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                



            </div>

            <div className="scroll-down-btn">
                <ScrollTo
                    className="round-btn"
                    to="about-us"
                    spy={true}
                    smooth={true}
                    duration={200}
                >
                    <i className="icon-arrow-down-s-line"></i>
                </ScrollTo>
            </div>
        </div>

    )
}
export default BannerOne;