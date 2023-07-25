import React from 'react';
import CategoryOne from './category/CategoryOne';
import SectionTitle from '../components/sectionTitle/SectionTitle';

const HomeOneCategory = () => {
  return (
    
    <div className="home-one-cat edu-service-area service-wrapper-1 edu-section-gap bg-image">
        <div className="container eduvibe-animated-shape">
            <div className="row">
                <div className="col-lg-12">
                    <SectionTitle
                        classes = "text-center"
                        slogan = "Nos Services"
                        title = "Découvrez Nos Services"
                    />
                </div>
            </div>

            <CategoryOne />


        </div>
    </div>
  )
}

export default HomeOneCategory;