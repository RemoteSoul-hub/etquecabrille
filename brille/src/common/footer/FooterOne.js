import React from 'react';
import {Link} from 'react-router-dom';
import ScrollTopButton from './ScrollTopButton';

const FooterOne = () => {
    return (
        <>
            <footer className="eduvibe-footer-one edu-footer footer-style-default">
                <div className="footer-top">
                    <div className="container eduvibe-animated-shape">
                        <div className="row g-5">
                            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                <div className="edu-footer-widget">
                                    <h4 className="description">ET QUE ÇA BRILLE</h4>
                                    <ul className="social-share">
                                        <li><a href="#"><i className="icon-Fb"></i></a></li>
                                        <li><a href="#"><i className="icon-linkedin"></i></a></li>
                                        <li><a href="#"><i className="icon-Pinterest"></i></a></li>
                                        <li><a href="#"><i className="icon-Twitter"></i></a></li>
                                    </ul>
                                </div>
                            </div>


                            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="edu-footer-widget quick-link-widget">
                                    <h5 className="widget-title">Liens</h5>
                                    <div className="inner">
                                        <ul className="footer-link link-hover">
                                            <li><a href="mailto:estquecabrille@gmail.com"><i className="icon-Double-arrow"></i>Contactez Nous</a></li>

                                            <li><Link to="/about"><i
                                                className="icon-Double-arrow"></i>À propos </Link></li>

                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="edu-footer-widget">
                                    <h5 className="widget-title">Contacter Nous</h5>
                                    <div className="inner">
                                        <div className="widget-information">
                                            <ul className="information-list">
                                                <li><i className="icon-map-pin-line"></i>France
                                                </li>
                                                <li><i className="icon-phone-fill"></i><a
                                                    href="tel: +33 785804820">+33 785804820</a></li>
                                                <li><i className="icon-mail-line-2"></i><a target="_blank"
                                                                                           href="mailto:estquecabrille@gmail.com">estquecabrille@gmail.com</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <div className="copyright-area copyright-default">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="inner text-center">
                                    <p>Copyright 2023 <a href="#">ET QUE ÇA BRILLE</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <ScrollTopButton/>
        </>
    )
}

export default FooterOne;