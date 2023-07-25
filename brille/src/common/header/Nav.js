import React, { useContext, useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Add this line

import { ServiceContext } from '../../contexts/ServiceContext';

const Nav = () => {
 const {handleClick} = useContext(ServiceContext);
  const {services , fetchData} = useContext(ServiceContext);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ul className="mainmenu">
      <li><Link to="/">Accueil</Link></li>

      <li className="has-droupdown">
        <Link to="#">Services</Link>
        <ul className="submenu">
          {services && services.map((service) => (
            service.sub_services && service.sub_services.length > 0 ? (
              <li className="has-droupdown" key={service.id}>
                <Link to="#">{service.serviceName}</Link>
                <ul className="submenu">
                  {service.sub_services.map((sub_service) => (
                    <li key={sub_service.idSubService}>
                      <Link onClick={() => handleClick()} to={"/servicedetails/" + sub_service.idSubService}>
                        {sub_service.subServiceName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={service.id}>
                <Link to="#">{service.serviceName}</Link>
              </li>
            )
          ))}
        </ul>
      </li>

      <li><Link to="/about">À propos </Link></li>

      <li><Link to="#">FAQ</Link></li>

    </ul>
  );
};

export default Nav;
