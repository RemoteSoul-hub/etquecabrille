import React from 'react';
import CountUp from 'react-countup';
import ScrollAnimation from 'react-animate-on-scroll';
import TrackVisibility from 'react-on-screen';
import SectionTitle from '../sectionTitle/SectionTitle';

const FeatureItems = [
    {
        title: 'Learners & counting',
        number: 449,
        image: 'about-image-01.png'
    },
    {
        title: 'Courses & Video',
        number: 330,
        image: 'about-image-02.png'
    },
    {
        title: 'Certified Students',
        number: 275,
        image: 'about-image-03.png'
    },
    {
        title: 'Winning Award',
        number: 378,
        image: 'about-image-04.png'
    }
];

const AboutOne = ( { wrapperClass } ) => {
    return (
        <div className={`eduvibe-home-two-counter bg-color-white ${ wrapperClass || 'edu-section-gap' }`}>
            <div className="container eduvibe-animated-shape">
                <div className="row align-items-center gy-5">
                    <div className="col-lg-6">
                        <div className="row g-5 pr--75">
                            { FeatureItems.map( ( data , i ) => (
                                <ScrollAnimation 
                                    animateIn="fadeInUp"
                                    animateOut="fadeInOut"
                                    className="col-lg-6 col-md-6 col-sm-6 col-12"
                                    animateOnce={ true }
                                    key={ i }
                                >
                                    <div className="edu-counterup">
                                        <div className="inner">
                                            <div className="icon">
                                                <img src="/images/myImages/aboutus.jpg" alt="Icon Thumb" />
                                            </div>
                                            <div className="content">
                                                <TrackVisibility once className="counter" tag="h3">
                                                    { ( { isVisible } ) => isVisible && 
                                                        isVisible ? <CountUp className="eduvibe-about-counterup" end={data.number} duration={1.5} delay={.1} start={0} /> : ''
                                                        
                                                    }
                                                </TrackVisibility>
                                                <span>{data.title}</span>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollAnimation>
                            ) ) }
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="choose-us-2">
                            <div className="inner">
                                <SectionTitle
                                    classes = "text-left"
                                    slogan = "Why Choose Us"
                                    title = "Creating A Community Of Life Long Learners"
                                />
                                <ScrollAnimation 
                                    animateIn="fadeInUp"
                                    animateOut="fadeInOut"
                                    animateOnce={ true }
                                >
                                    <p className="description mt--40 mb--30">There are many variations of passages of the Ipsum available, but the majority have suffered alteration in some form, by injected humour.</p>
                                </ScrollAnimation>


                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default AboutOne;