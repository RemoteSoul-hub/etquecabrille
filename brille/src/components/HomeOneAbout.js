import React from 'react';
import {Link} from 'react-router-dom';
import {Element} from 'react-scroll';
import ScrollAnimation from 'react-animate-on-scroll';
import SectionTitle from './sectionTitle/SectionTitle';

const items = [
    {
        title: 'NOS PROFESSIONNELS',
        info: 'Nos professionnels sont recrutés avec le plus grand soin afin de réaliser des préstations\n' +
            'd’une grande qualité.'

    },
    {
        title: 'Rapidité',
        info: 'Nous répondrons avec rapidité à vos demandes. Besoin d\'une prestation en dernière minute ? "Et que ça brille" est là pour vous. Nous proposons un large panel de choix pour que vous puissiez trouver chaussure à votre pied.'
    }
];

const HomeOneAbout = () => {
    return (
        <Element
            name="about-us"
            className="edu-about-area about-style-1 edu-section-gap bg-color-white"
        >
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-6">
                        <div className="about-image-gallery">
                            <img className="image-1" src="/images/myImages/aboutus.jpg"
                                 alt="About Main Thumb"/>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="inner">
                            <SectionTitle
                                slogan="À propos de nous"
                                title="Et Que ça brille "
                            />
                            <ScrollAnimation
                                animateIn="fadeInUp"
                                animateOut="fadeInOut"
                                animateOnce={true}
                            >
                                <p className="description">Là où il y a un professionnel, il y a des clients satisfaits.
                                    "Et que ça brille" s'installe partout en France. Nos maîtres mots : qualité,
                                    confiance, compétences et réactivité. "Et que ça brille" est une nouvelle plateforme
                                    française qui met en relation des particuliers avec des professionnels compétents
                                    dans différents domaines.</p>
                            </ScrollAnimation>
                            {items && items.length > 0 &&
                                <div className="about-feature-list">
                                    {items.map((data, i) => (
                                        <ScrollAnimation
                                            animateIn="fadeInUp"
                                            animateOut="fadeInOut"
                                            className="our-feature"
                                            animateOnce={true}
                                            key={i}
                                        >
                                            <div className="our-feature">
                                                <div className="feature-content">
                                                    <h6 className="feature-title">{data.title}</h6>
                                                    <p className="feature-description">{data.info}</p>
                                                </div>
                                            </div>
                                        </ScrollAnimation>
                                    ))}
                                </div>
                            }
                            <ScrollAnimation
                                animateIn="fadeInUp"
                                animateOut="fadeInOut"
                                className="read-more-btn"
                                animateOnce={true}
                            >
                                <Link className="edu-btn" to="/about">Plus d'informations<i
                                    className="icon-arrow-right-line-right"></i></Link>
                            </ScrollAnimation>

                        </div>
                    </div>
                </div>
            </div>
        </Element>
    )
}

export default HomeOneAbout;