import React, { useEffect, useState , useContext } from 'react';
import FsLightbox from 'fslightbox-react';
import { LoginContext } from '../../contexts/loginContext';
import { Link } from 'react-router-dom';


const CourseInfo = ( { data , medias }) => {
    const [toggler, setToggler] = useState( false );
    const {user} = useContext(LoginContext)
    return (
        <div className="eduvibe-sidebar course-details-sidebar">
            <div className="inner">
                <div className="eduvibe-widget">
                    <div className="video-area">
                        {medias.length > 0 && (
                            <div className="thumbnail video-popup-wrapper">
                                <img className="radius-small w-100" src={`http://localhost:8000/images/${medias[1].src}`} alt="Course Video Thumb" />
                                <FsLightbox toggler={ toggler } sources={ data.videoLink } />
                            </div>
                        )

                        }

                    </div>
                    <div className="eduvibe-widget-details mt--35">
                        <div className="widget-content">
                            <div className="read-more-btn mt--45">
                                <a href="#" className="edu-btn btn-bg-alt w-100 text-center" style={{cursor:"auto"}}>
                                    Prix: { data.subServicePrice === '0' ? 'Gratuit' : data.subServicePrice+'$' }
                                </a>
                            </div>

                                <div className="read-more-btn mt--15">
                                    <Link to={"/commande/"+data.idSubService} className="edu-btn w-100 text-center">Faire une demande</Link>
                                </div>


                            <div className="read-more-btn mt--30 text-center">
                                <div className="eduvibe-post-share">
                                    <span>Partager: </span>
                                    <a className="linkedin" href="#"><i className="icon-linkedin"></i></a>
                                    <a className="facebook" href="#"><i className="icon-Fb"></i></a>
                                    <a className="twitter" href="#"><i className="icon-Twitter"></i></a>
                                    <a className="youtube" href="#"><i className="icon-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseInfo;