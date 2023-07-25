import React from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';
import SectionTitle from '../sectionTitle/SectionTitle';

const features = [
    {

        title: 'Professionnel',
        desc:"Notre équipe est composée de professionnels qualifiés et expérimentés dans leur domaine. Nous sommes fiers de notre expertise et de notre savoir-faire, ce qui nous permet d'offrir des services de haute qualité à nos clients. Nous nous engageons à maintenir les normes les plus élevées et à fournir un travail précis, fiable et professionnel"
    },
    {

        title: 'Rapide',
        desc:"Nous comprenons l'importance de la rapidité et de l'efficacité dans le secteur des services à domicile. Nous nous efforçons d'accomplir nos tâches dans les délais convenus, en respectant les échéances et en fournissant des solutions rapides aux besoins de nos clients. Notre équipe est organisée et réactive, prête à répondre rapidement aux demandes et à fournir un service rapide sans compromettre la qualité."
    },
    {

        title: 'Confiance',
        desc:"La confiance est au cœur de notre approche. Nous comprenons que nos clients nous confient leur domicile et comptent sur nous pour fournir un service fiable et digne de confiance. Nous mettons un point d'honneur à établir des relations de confiance avec nos clients, en respectant leur vie privée, en traitant leurs biens avec soin et en offrant des services transparents et honnêtes. Vous pouvez avoir confiance en notre équipe pour répondre à vos besoins et garantir votre satisfaction."
    },

];

const AboutThree = () => {
    return (
        <div className="edu-choose-us-area-one  choose-us-style-1 edu-section-gap bg-color-white">
            <div className="container">
                <div className="row">
                    <div className="col-xl-5 col-lg-6">
                        <div className="thumbnail">
                            <img src="/images/myImages/aboutus.jpg" style={{marginLeft:"10px"}} alt="Choose Us Images" />
                        </div>
                    </div>
        
                    <div className="col-xl-6 col-lg-6 offset-xl-1">
                        <div className="inner  mt_md--40 mt_sm--40">
                            <SectionTitle
                                classes = "text-start"
                                slogan = "À PROPOS DE NOUS"
                                title = "Et Que ça brille"
                            />

                            <ScrollAnimation 
                                animateIn="fadeInUp"
                                animateOut="fadeInOut"
                                animateOnce={ true }
                            >
                                <p className="line-before mb--5">Là où il y a un professionnel, il y a des clients satisfaits. Et Que ça brille s'installe partout en France. Nos maîtres mots : qualité, confiance, compétences et réactivité. Et Que ça brille est une nouvelle plateforme française qui met en relation des particuliers avec des professionnels compétents dans différents domaines..</p>
                            </ScrollAnimation>
                            <div>
                                { features.map( ( item, i ) => (
                                    <ScrollAnimation 
                                        animateIn="fadeInUp"
                                        animateOut="fadeInOut"
                                        animateOnce={ true }
                                        className="single-feature" 
                                        key={ i }
                                    >
                                        <div className="content">
                                            <h6 className="feature-title">{ item.title } :</h6>
                                            <p>{ item.desc }</p>
                                        </div>
                                    </ScrollAnimation>
                                ) ) }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutThree;