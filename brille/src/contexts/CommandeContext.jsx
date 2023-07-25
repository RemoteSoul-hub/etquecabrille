import React, {createContext, useReducer, useState} from 'react'
import axios from 'axios';
axios.defaults.withCredentials = true;



export const CommandeContext = createContext();

export const CommandeProvider = ({children}) => {

    const [commandes , setCommandes] = useState([]);
    const [demmandes, setDemmandes] = useState([]);
    const [demmandesAccepter, setDemmandesAccepter] = useState([]);


    const mesCommandes = async () =>{
        try {
            const response = await axios.get(`http://localhost:8000/api/mescommandes`,{ credentials: 'include' });
            setCommandes(response.data);
        } catch (error) {
            console.error('Error fetching Commandes:', error);
        }
    }

    const anullerCommade = async (idOrder) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/anullercommande/${idOrder}`,{ credentials: 'include' });
            setCommandes(response.data);
        } catch (error) {
            console.error('Error fetching Commandes:', error);
        }
    }

    const mesDemmandesAccepter = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/mesdemandesaccepter`,{ credentials: 'include' });
            setDemmandesAccepter(response.data);
        } catch (error) {
            console.error('Error fetching Commandes:', error);
        }
    }
    const mesDemmandes = async () =>{
        try{
            const response = await axios.get("http://localhost:8000/api/mesdemmandes",{ withCredentials: true });
            setDemmandes(response.data);
        } catch(error){
            console.log("Error Getting Orders: ",error);
        }
    }

    const accepterDemmande = async (id) =>{
        try{
            const response = await axios.post("http://localhost:8000/api/acceptorder/"+id,{ withCredentials: true });

        } catch(error){
            console.log("Error Accepting Orders: ",error);
        }
    }

    const contextValue   ={
        mesDemmandesAccepter,
        mesCommandes,
        commandes,
        mesDemmandes,
        demmandes,
        accepterDemmande,
        anullerCommade,
        demmandesAccepter
    }
    return (
        <CommandeContext.Provider value={contextValue} >
            {children}
        </CommandeContext.Provider>
    )
    
}