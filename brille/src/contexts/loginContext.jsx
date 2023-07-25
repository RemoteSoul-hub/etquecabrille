import React, {createContext, useEffect, useReducer, useState} from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

// Create the LoginContext
export const LoginContext = createContext();

// Create the LoginProvider component
export const LoginProvider = ({children}) => {
    const [user, setUser] = useState('');
    const [adresses, setAdresses] = useState([]);
    const [total, setTotal] = useState('');
    const [mesParinnage, setMesParinnage] = useState([]);

    const [isPassed, setIsPassed] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);


    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('http://localhost:8000/api/user', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });

                const content = await response.json();
                if(content){
                    setUser(content);
                }

            } catch (error) {
                console.error('Error fetching user:', error);
            }
        })();
    }, []);
    // Your login-related functions and logic

    const getAddresses = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/getadresses`, {credentials: 'include'});
            setAdresses(response.data);
        } catch (error) {
            console.error('Error fetching Adresses:', error);
        }

    };

    const getTotal = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/total/${id}`, {credentials: 'include'});
            setTotal(response.data.total);
        } catch (error) {
            console.error('Error fetching Total:', error);
        }
    }

    const mesParinage = async () =>{
        try {
            const response = await axios.post(`http://localhost:8000/api/mesparrinage`, {credentials: 'include'});
            setMesParinnage(response.data);
        } catch (error) {
            console.error('Error fetching Parinnage:', error);
        }
    }

    const iWantWithdraw = async (formData) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/wantwithdraw`,formData, {credentials: 'include'});

        } catch (error) {
            console.error('Error fetching Parinnage:', error);
        }
    }

    const addAdresse = async (formData) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/addadresse`, formData, {credentials: 'include'});
            forceUpdate();
        } catch (error) {
            console.error('Error fetching Adresses:', error);
        }
    }
    const deleteAdresse = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/deleteadresse/${id}`, { withCredentials: true });
            forceUpdate();  // you might want to do something with the response
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    }


    const editInforamtion = async (formData) => {
        try{
            const response = await axios.post("http://localhost:8000/api/edituser",formData,{ withCredentials: true });
            setIsEdited(true);
        }catch(error){
            console.log("Error edit informations: ",error);
        }
    }

    const logIn = async (formData) => {
        try{
            const response = await axios.post("http://localhost:8000/api/login",formData,{ withCredentials: true });
        }catch(error){
            console.log("Error Log OUT: ",error);
        }
    }
    const logOut = async () => {
        try{
            const response = await axios.post("http://localhost:8000/api/logout",{ withCredentials: true });
            return new Promise(resolve => {
                setUser(null); // assuming user should be null after logging out
                resolve();
            });
        } catch(error){
            console.log("Error Log OUT: ",error);
        }
    }

    const setAvaibility = async (formData) =>{
        try{
            const response = await axios.post("http://localhost:8000/api/setavailability",formData,{ withCredentials: true });

        } catch(error){
            console.log("Error Set Avaibility: ",error);
        }
    }


    const faireCommande = async (idAdrs, adrs, ville, idSubService, information, date, nomPrenom, numC, dEC, ccv) => {
        try {
            const response = await fetch("http://localhost:8000/api/passecommande", {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    "idAdrs": idAdrs,
                    "adrs": adrs,
                    "ville": ville,
                    "idSubService": idSubService,
                    "inforamtion": information,
                    "date": date,
                    "nomPrenom": nomPrenom,
                    "numC": numC,
                    "dEC": dEC,
                    "ccv": ccv,
                }),

            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                console.log(data.message);
                setIsPassed(true);
            }
        } catch (error) {
            console.error(error);
        }
    }


    // Create the context value
    const contextValue = {
        user,
        setUser,
        logOut,
        getAddresses,
        adresses,
        ignored,
        forceUpdate,
        faireCommande,
        addAdresse,
        isPassed,
        deleteAdresse,
        editInforamtion,
        isEdited,
        logIn,
        setAvaibility,
        getTotal,
        total,
        mesParinnage,
        mesParinage,
        iWantWithdraw
        // Other values or functions related to the login context
    };

    return (
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
    );
};
