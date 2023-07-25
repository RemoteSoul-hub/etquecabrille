import React, { useEffect, useContext } from 'react';
import Slider from 'react-slick';
import { ThreeColumnCarousel2 } from '../../utils/script';
import CourseTypeOne from '../../components/course/CourseTypeOne';
import { ServiceContext } from '../../contexts/ServiceContext';

const RelatedCourses = ({ service }) => {
  const { relatedSubServices, getRelatedSubServices, ignored } = useContext(ServiceContext);
  useEffect(() => {
    getRelatedSubServices(service.idService,service.idSubService);
  }, [relatedSubServices]);



  return (
    <>
      {relatedSubServices && relatedSubServices.length > 2 && (
        <div className="edu-course-wrapper pt--65">
          <div className="section-title text-start mb--20">
            <span className="pre-title">Services de {service.serviceName}</span>
            <h3 className="title">Service susceptible de vous plaire</h3>
          </div>
          <Slider
            className="mt--40 edu-slick-button slick-activation-wrapper eduvibe-course-one-carousel"
            {...ThreeColumnCarousel2}
          >
            {relatedSubServices.map((subService) => (

                      <div className="single-slick-card" key={subService.idSubService}>
                        <CourseTypeOne data={subService} />
                      </div>


            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default RelatedCourses;
