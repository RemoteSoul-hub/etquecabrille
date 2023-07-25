import React,{useState , useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ServiceContext } from '../../contexts/ServiceContext';
import axios from 'axios';

const CourseTypeOne = ({ data, classes }) => {
    
    const {ignored} = useContext(ServiceContext)
    const [myMedia, setMyMedia] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/getmedia/${data.idSubService}`);
                setMyMedia(response.data);
            } catch (error) {
                console.error('Error fetching media:', error);
            }
        };
    
        fetchData();
    }, [ignored]);

    return (
        
        <div className={`edu-card card-type-3 radius-small ${ classes ? classes : '' }`} style={{height:"500px"}}>
            <div className="inner">
                {myMedia.length > 0 && (
                    <div className="thumbnail">
                        <Link to={process.env.PUBLIC_URL + `/servicedetails/${data.idSubService}`}>
                            <img className="w-100" style={{height:"200px"}} src={`http://localhost:8000/images/${myMedia[0].src}`}alt="Course Thumb" />
                        </Link>
                    </div>
                )

                }

                <div className="content">
                    <div className="card-top">
                        <div className="author-meta">
                            
                        </div>

                    </div>
                    <h6 className="title">
                        <Link to={process.env.PUBLIC_URL + `/servicedetails/${data.idSubService}`}>{data.subServiceName}</Link>
                    </h6>
                    <div className="card-bottom">
                        <div className="price-list price-style-02">
                            {
                                data.subServicePrice === '0' ?
                                    <div className="price current-price">Gratuit</div>
                                :
                                    <div className="price current-price">${data.subServicePrice}</div>
                            }
                        </div>

                    </div>
                </div>
            </div>

            <div className="card-hover-action">
                <div className="hover-content">
                    <div className="content-top">
                        <div className="top-status-bar">
                            <Link className="eduvibe-status status-03" to={process.env.PUBLIC_URL + `/servicedetails/${data.idSubService}`}>
                                {data.subServiceName}
                            </Link>
                        </div>
                    </div>

                    <h6 className="title">
                        <Link to={process.env.PUBLIC_URL + `/servicedetails/${data.idSubService}`}>{data.subServiceName}</Link>
                    </h6>

                    <p className="description">{ data.descSubService.substring(0, 150) }</p>

                    <div className="price-list price-style-02">
                        {
                            data.subServicePrice === '0' ?
                                <div className="price current-price">Gratuit</div>
                            :
                                <div className="price current-price">${data.subServicePrice}</div>
                        }

                    </div>

                    <div className="hover-bottom-content">
                        <div className="author-meta">
                            <div className="author-thumb">
                                <Link to={process.env.PUBLIC_URL + `/servicedetails/${data.idSubService}`}>
                                    <span className="author-title">{ data.subServiceName }</span>
                                </Link>
                            </div>
                        </div>

                    </div>
                    <div className="read-more-btn">
                        <Link className="edu-btn btn-medium btn-white" to={process.env.PUBLIC_URL + `/servicedetails/${data.idSubService}`}>
                            Consulter<i className="icon-arrow-right-line-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CourseTypeOne;