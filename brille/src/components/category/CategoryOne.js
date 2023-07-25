import React, {useContext, useEffect} from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { Link } from 'react-router-dom';
import {ServiceContext} from "../../contexts/ServiceContext";



const items = [
    {
        title: 'Graphics Design',
        info: 'Lorem Ipsum is simply for this dummy text of the printing.',
        numberOfCourses: '23 Courses',
        image: 'category-01.jpg',
        link: '#'
    },
    {
        title: 'Business Analysis',
        info: 'Lorem Ipsum is simply for this dummy text of the printing.',
        numberOfCourses: '18 Courses',
        image: 'category-02.jpg',
        link: '#'
    },
    {
        title: 'Data Science',
        info: 'Lorem Ipsum is simply for this dummy text of the printing.',
        numberOfCourses: '15 Courses',
        image: 'category-03.jpg',
        link: '#'
    },
    {
        title: 'Architecture',
        info: 'Lorem Ipsum is simply for this dummy text of the printing.',
        numberOfCourses: '20 Courses',
        image: 'category-04.jpg',
        link: '#'
    }
];

const CategoryOne = ( { wrapperClass, styleClass, buttonStatus } ) => {
    const {fetchData,services,ignored} = useContext(ServiceContext);

    useEffect(() => {
        fetchData();
    },[ignored])
    return (
        <>
            <div className={ `row ${ wrapperClass || 'g-5 mt--25' }` }>
                { services.map( ( service , i ) => (
                    <ScrollAnimation 
                        animateIn="fadeInUp"
                        animateOut="fadeInOut"
                        className={ `col-lg-3 col-md-6 col-sm-6 col-12 ${ styleClass ? styleClass : '' }` }
                        animateOnce={ true }
                        key={ i }
                    >
                        <div className="service-card service-card-1 radius-small">
                            <div className="inner">
                                <div className="thumbnail">

                                        <img style={{width:"100%",height:"200px"}} src={`http://localhost:8000/images/${service.img}`} alt="Category Thumb" />

                                </div>
                                <div className="content">

                                    <strong className="title">{ service.serviceName }</strong>
                                    <p className="description">{ service.descService.substring(0, 20) }...</p>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>
                ) ) }
            </div>
            { buttonStatus !== 'disable' &&
                <div className="row text-center mt--60">
                    <div className="col-lg-12">
                        <ScrollAnimation 
                            animateIn="fadeInUp"
                            animateOut="fadeInOut"
                            className="load-more-btn"
                            animateOnce={ true }
                        >
                        </ScrollAnimation>
                    </div>
                </div>
            }
    
        </>
    )
}

export default CategoryOne;