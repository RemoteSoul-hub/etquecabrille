import React, {createContext, useReducer, useState} from 'react';
import axios from 'axios';

export const ServiceContext = createContext();
export const ServiceProvider = ({children}) => {
    const [services, setServices] = useState([]);
    const [service, setService] = useState([]);
    const [medias, setMedias] = useState([]);
    const [subServices, setSubServices] = useState([]);
    const [relatedSubServices, setRelatedSubServices] = useState([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/displayservices');
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };


    const getService = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/getsubservice/${id}`);
            setService(response.data);
        } catch (error) {
            console.error('Error fetching service:', error);
        }

    };

    const getMedia = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/getmedia/${id}`);
            setMedias(response.data);
        } catch (error) {
            console.error('Error fetching service:', error);
        }

    };

    const getRelatedSubServices = async (idService,idSubService) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/getrelatedsubservices/${idService}/${idSubService}`);
            setRelatedSubServices(response.data);
        } catch (error) {
            console.error('Error fetching related services:', error);
        }

    };

    const getSubServices = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/getsubservices/`);
            setSubServices(response.data);
        } catch (error) {
            console.error('Error fetching sub services:', error);
        }

    };


    const handleClick = () => {
        forceUpdate();
    }
    //console.log(relatedSubServices)
    const contextValues = {
        services,
        service,
        fetchData,
        getService,
        getRelatedSubServices,
        relatedSubServices,
        ignored,
        getMedia,
        medias,
        forceUpdate,
        handleClick,
        subServices,
        getSubServices,
        setRelatedSubServices,


    }


    return (
        <ServiceContext.Provider value={contextValues}>
            {children}
        </ServiceContext.Provider>
    );
};
