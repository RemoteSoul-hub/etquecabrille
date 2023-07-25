import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomeOne from './pages/HomeOne';
import CourseOne from './pages/CourseOne';
import LoginRegister from './pages/LoginRegister';
import ScrollToTop from './components/scrolltotop/ScrollToTop';
import './assets/scss/style.scss';
import AboutUs from "./pages/AboutUs";
import {LoginProvider} from './contexts/loginContext';
import {ServiceProvider} from "./contexts/ServiceContext";
import CourseDetails from "./pages/CourseDetails";
import FaireCommande from "./pages/FaireCommande";
import {CommandeProvider} from "./contexts/CommandeContext";
import Profile from "./pages/Profile";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Condition from "./pages/condition";

const stripePromise = loadStripe('pk_test_51Mamk0LWf3koMU05FRLqeMl4GYiaeyM11eaPFM9oi10NsMvqIPI5cT2AC2EWVLsX3MDkTY4EbSKkJaJoDeOtzAOP00UqUEAJX8');

function App() {
    return (
        <Router>
            <Elements stripe={stripePromise}>
                <LoginProvider>
                    <CommandeProvider>
                        <ServiceProvider> {/* Wrap the components needing ServiceContext with ServiceProvider */}
                            <ScrollToTop>
                                <Routes>
                                    <Route exact path='/' element={<HomeOne/>}/>
                                    <Route exact path='/servicedetails/:id' element={<CourseDetails/>}/>
                                    <Route exact path='/account' element={<LoginRegister/>}/>
                                    <Route exact path='/commande/:idSubService' element={<FaireCommande/>}/>
                                    <Route exact path='/about' element={<AboutUs/>}/>
                                    <Route exact path='/profile/:id' element={<Profile/>}/>
                                    <Route exact path='/conditions' element={<Condition/>}/>
                                </Routes>
                            </ScrollToTop>
                        </ServiceProvider>
                    </CommandeProvider>
                </LoginProvider>
            </Elements>
        </Router>
    );
}

export default App;
