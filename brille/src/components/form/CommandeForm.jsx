import React, {useContext, useEffect, useState} from 'react';
import {LoginContext} from '../../contexts/loginContext';

import {Navigate, useParams} from 'react-router-dom';
import {ServiceContext} from '../../contexts/ServiceContext';
import {CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe} from "@stripe/react-stripe-js";
import swal from 'sweetalert';

const CommandeForm = () => {


    const CARD_ELEMENT_OPTIONS = {
        style: {
            base: {
                color: '#424770',
                lineHeight: '24px',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '19px',
                '::placeholder': {
                    color: '#aab7c4',
                },
                padding: '10px 12px',
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        },
    };
    const {idSubService} = useParams();
    const {adresses, getAddresses} = useContext(LoginContext);
    const {service, getService, ignored} = useContext(ServiceContext);
    const [idAdrs, setIdAdrs] = useState('');
    const [date, setDate] = useState('');
    const [adrs, setAdrs] = useState('');
    const [ville, setVille] = useState('');
    const [information, setInfromtion] = useState('');
    const [total,setTotal] = useState('');

    const [duration, setDuration] = useState('');
    const [isPassed, setIsPassed] = useState(false);
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();


    useEffect(() => {
        getAddresses();
        getService(idSubService);
    }, [ignored]);

    const hideShow = (idToHide, idToShow) => {
        let hideElement = document.getElementById(idToHide);
        let showElement = document.getElementById(idToShow);
        hideElement.style.display = 'none';
        showElement.style.display = 'block';
    };
    useEffect(() => {
        if(idSubService == 10){
            setTotal(service.subServicePrice * ((duration)/60));
        }else{
            setTotal(service.subServicePrice);
        }

    }, [service, duration]);



    const createCommande = async (e) => {
        e.preventDefault();
        setLoading(true);

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
                    "information": information,
                    "date": date,
                    "duration":duration
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();

                // After creating the order, initiate the payment
                const {clientSecret} = await (await fetch("http://localhost:8000/api/payment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include',
                    body: JSON.stringify({amount: (total * 100)}) // amount in cents
                })).json();

                const result = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardNumberElement),
                    }
                });

                if (result.error) {
                    // The payment has been declined or failed, display the error message to your customer
                    console.log(result.error.message);
                } else {
                    // The payment has been processed!
                    if (result.paymentIntent.status === 'succeeded') {
                        setIsPassed(true);
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    }


    if (isPassed) {
        swal({
            title: "Félicitation",
            text: "Votre Commande a été effectué avec succès",
            icon: "success",
            button: "OK!",
        });
        return <Navigate to="/"/>;
    }

    return (
        <div className="login-form-box">
            <h3 className="mb-30">Faire Une Commande</h3>

            <form className="login-form" onSubmit={createCommande}>
                <div className="fisrt" id="first">
                    <h4>Information Sur La Commande</h4>
                    <div id="already-have-adrs">
                        {adresses.length > 0 && (
                            <div className="input-box mb--30">
                                <select required name="" id="" onChange={(e) => setIdAdrs(e.target.value)}>
                                    <option value="" selected disabled>
                                        Seletioner Une Adresse
                                    </option>
                                    {adresses.map((adresse) => (
                                        <option key={adresse.idAdrs} value={adresse.idAdrs}>
                                            {adresse.adrs} Ville {adresse.ville}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => hideShow('already-have-adrs', 'new-adrs')}
                        className="rn-btn edu-btn w-100 mb--30"
                    >
                        <span>Ajouter Une Nouvelle Adresse</span>
                    </button>
                    <div id="new-adrs" style={{display: 'none'}}>
                        <div className="input-box mb--30">
                            <input  type="text" name="adrs" placeholder="Adresse" value={adrs}
                                   onChange={(e) => setAdrs(e.target.value)}/>
                        </div>
                        <div className="input-box mb--30">
                            <input  type="text" name="ville" placeholder="Ville" value={ville}
                                   onChange={(e) => setVille(e.target.value)}/>
                        </div>
                    </div>

                    <div className="input-box mb--30">
                        <label><strong>Date De Realisation *</strong> </label><br/>
                        <input type="datetime-local" required name="date" placeholder="La Date" value={date}
                               onChange={(e) => setDate(e.target.value)}/>
                    </div>
                    {service.idSubService == 10 && (
                        <div className="input-box mb--30">
                            <label><strong>Duration *</strong></label><br/>
                            <select type="datetime-local" required name="duration"  value={duration}
                                   onChange={(e) => setDuration(e.target.value)}>
                                <option  disabled selected value="">Sélectionnez la durée.</option>
                                <option value="30">30 Minutes</option>
                                <option value="60">1 Heure</option>
                                <option value="90">1 Heure : 30 Minutes</option>
                                <option value="120">2 Heure</option>
                                <option value="150">2 Heure : 30 Minutes</option>
                                <option value="180">3 Heure</option>

                            </select>
                        </div>
                    )

                    }
                    <div className="input-box mb--30">
                        <label><strong>Information Sur La Commande *</strong></label><br/>
                        <textarea name="information" required placeholder="Information Sur La commande" value={information}
                                  onChange={(e) => setInfromtion(e.target.value)}></textarea>
                    </div>
                    <button
                        type="button"
                        onClick={() => hideShow('first', 'sec')}
                        className="rn-btn edu-btn w-100 mb--30"
                    >
                        <span>Suivant</span>
                    </button>
                </div>

                <div id="sec" style={{display: 'none'}}>
                    <h4>Information Bancaire</h4>
                    <div>
                        <div>
                            <h6 style={{margin: "0"}}>Card number:</h6>
                            <div style={{width: "100%", height: "40px" ,padding:"8px"}}>
                                <CardNumberElement options={CARD_ELEMENT_OPTIONS}/>
                            </div>
                        </div>
                        <div>
                            <h6 style={{margin: "0"}}>Expiration date:</h6>
                            <div style={{width: "100%", height: "40px" ,padding:"8px"}}>
                                <CardExpiryElement options={CARD_ELEMENT_OPTIONS}/>
                            </div>
                        </div>
                        <div>
                            <h6 style={{margin: "0"}}>CCV:</h6>
                            <div style={{width: "100%", height: "40px" ,padding:"8px",marginBottom:"20px"}}>
                                <CardCvcElement options={CARD_ELEMENT_OPTIONS}/>
                            </div>
                        </div>

                    </div>
                    <button type="submit" className="rn-btn edu-btn w-100 mb--30">
                        <span>Psser La Commande</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CommandeForm;
