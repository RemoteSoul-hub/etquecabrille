import React, {useContext, useEffect} from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import SectionTitle from '../components/sectionTitle/SectionTitle';
import CourseTwo from '../components/course/CourseTypeTwo';
import {ServiceContext} from "../contexts/ServiceContext";

const HomeOneCourses = () => {
    const {ignored,getSubServices,subServices} = useContext(ServiceContext);
    useEffect(() =>{
        getSubServices();
    },[ignored]);

    return (
        <div className="edu-course-area eduvibe-home-one-course course-wrapper-1 edu-section-gap bg-color-white">
            <div className="container eduvibe-animated-shape">
                <div className="row">
                    <div className="col-lg-12">
                        <SectionTitle
                            classes = "text-center"
                            slogan = "Services populaires"
                            title = "Nos sous-services"
                        />
                    </div>
                </div>
                {subServices.length > 0 && (
                    <div className="row g-5 mt--10">
                        {
                            subServices.slice( 0, 6 ).map((subService) => (
                                <ScrollAnimation
                                    animateIn="fadeInUp"
                                    animateOut="fadeInOut"
                                    className="col-12 col-sm-12 col-xl-4 col-md-6"
                                    animateOnce={true}
                                    key={ subService.idSubService }
                                >
                                    <CourseTwo data={subService} />
                                </ScrollAnimation>
                            ) )
                        }
                    </div>
                )}





            </div>
        </div>

    )
}

export default HomeOneCourses;