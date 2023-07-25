import React from 'react';
import SEO from '../common/SEO';
import Layout from '../common/Layout';
import BreadcrumbOne from '../common/breadcrumb/BreadcrumbOne';
import CourseTypeOne from '../components/course/CourseTypeOne';
import CourseData from '../data/course/CourseData.json';
import { useParams } from 'react-router-dom';


const CourseOne = () => {
    const CourseItems = CourseData.slice(0, 9);
    const { id } = useParams();
    return (
        <>
            <SEO title="Course Style - 1" />
            <Layout>
                <BreadcrumbOne 
                    title="Course Style - 1"
                    rootUrl="/"
                    parentUrl="Home"
                    currentUrl="Course Style - 1"
                />
                {id}
                <div className="edu-course-area edu-section-gap bg-color-white">
                    <div className="container">
                        <div className="row g-5 mt--10">
                            { 
                                CourseItems.map((item) => (
                                    <div className="col-12 col-sm-6 col-lg-4" key={ item.id }>
                                        <CourseTypeOne data={item} />
                                    </div>
                                ) )
                            }
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default CourseOne;