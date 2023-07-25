import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ServiceContext } from '../../contexts/ServiceContext';

const RecipteOrder = () => {
  const { idSubService } = useParams();
  const { service , getService, ignored} = useContext(ServiceContext); 

  useEffect(() => {
      getService(idSubService);
  },[ignored])
  return (
    <div className="eduvibe-sidebar course-details-sidebar">
      <h4>{service.subServiceName}</h4>
        <div className="eduvibe-widget-details mt--35">
            <div className="widget-content">
              <div className="read-more-btn mt--45">
                  {service.idSubService == 10 && (

                      <a href="#" className="edu-btn btn-bg-alt w-100 text-center">
                          Price: {service.subServicePrice}$/H
                      </a>
                  )
                    ||
                      <a href="#" className="edu-btn btn-bg-alt w-100 text-center">
                          Price: {service.subServicePrice}$
                      </a>
                  }

              </div>
              <div className="read-more-btn mt--30 text-center">
                <div className="eduvibe-post-share">
                  <span>Share: </span>
                    <a className="linkedin" href="#"><i className="icon-linkedin"></i></a>
                    <a className="facebook" href="#"><i className="icon-Fb"></i></a>
                    <a className="twitter" href="#"><i className="icon-Twitter"></i></a>
                    <a className="youtube" href="#"><i className="icon-youtube"></i></a>
                </div>
              </div>
          </div>
      </div>

    </div>
  )
}

export default RecipteOrder