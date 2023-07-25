import React, {useContext, useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {ServiceContext} from "../../contexts/ServiceContext";

const CourseTwo = ({data, classes}) => {
    const {medias, getMedia, ignored} = useContext(ServiceContext);


    return (
        <div className={`edu-card card-type-2 radius-small ${classes ? classes : ''}`}>
            <div className="inner">
                <div className="content">

                    <h6 className="title">
                        <Link
                            to={process.env.PUBLIC_URL + `/course-details/${data.idSubService}`}>{data.subServiceName}</Link>
                    </h6>

                    <div className="card-bottom">
                        <div className="price-list price-style-01" >
                            <p><strong>{data.serviceName}</strong></p>
                            {
                                data.subServicePrice === '0' ?
                                    <div className="price current-price">Gratuit</div>
                                    :
                                    <div className="price current-price">${data.subServicePrice} USD</div>

                            }


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CourseTwo;