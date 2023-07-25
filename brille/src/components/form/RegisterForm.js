import axios from 'axios';
import React, {useState} from 'react';
import {Navigate,Link} from 'react-router-dom';
import swal from "sweetalert";

const RegisterForm = () => {

    const subServicesData = {
        "2": ["Ménage Maison", "Ménage Bureau"],
        "3": ["Intérieur complet", "Extérieur complet", "Intérieur + Extérieur Complet"],
        "4": ["J'organise Ma Maison", "Je déménage / J'emménage", "J'ai envie de changement", "Rendez-vous conseil", "Coaching (visio ou téléphone) - 30 minutes"],
        "5": ["Jardon Propre"],
      };

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telUser, setTelUser] = useState('');
    const [adrs, setAdrs] = useState('');
    const [ville, setVille] = useState('');
    const [bankName, setBankName] = useState('');
    const [typeCompt, setTypeCompt] = useState('');
    const [numCompt, setNumCompt] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [isProfessionel, setIsProfessionel] = useState(false);
    const [files, setFiles] = useState(null);
    const [typeUser, setTypeUser] = useState('');
    const [services, setServices] = useState([]);
    const [subServices, setSubServices] = useState([]);

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    }
    const handleServiceChange = (e) => {
        const selectedServices = Array.from(e.target.options)
          .filter((option) => option.selected)
          .map((option) => option.value);
    
        setServices(selectedServices);
    
        // Fetch corresponding sub-services based on the selected services
        const selectedSubServices = selectedServices.flatMap((service) => subServicesData[service]);
        setSubServices(selectedSubServices);
      };

      const handleSubServiceChange = (e) => {
        const selectedSubServices = Array.from(e.target.options)
          .filter((option) => option.selected)
          .map((option) => option.value);
    
        setSubServices(selectedSubServices);
      };

    const hideShow = (idToHide, idToShow) => {
        let hideElement = document.getElementById(idToHide);
        let showElement = document.getElementById(idToShow);
        hideElement.style.display = 'none';
        showElement.style.display = 'block';
    }

    const onchangeEventOne = () => {
        let ident = document.getElementById('ident');
        let file = document.getElementById('file');
        let ser = document.getElementById('ser');
        file.required = true;
        ser.required = true;
        setTypeUser('1');
        ident.style.display = 'block';
    }

    const onchangeEventTwo = () => {
        let ident = document.getElementById('ident');
        setTypeUser('2');
        ident.style.display = 'none';
    }


    const createUser = async (e) => {
        e.preventDefault();
    // Get the CSRF token from the manually passed window.csrfToken
    const csrfToken = window.csrfToken;

    // Set the CSRF token in the request headers
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
    axios.defaults.withCredentials = true;
    
        const formData = new FormData();
        formData.append('fname', fname);
        formData.append('lname', lname);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('telUser', telUser);
        formData.append('adrs', adrs);
        formData.append('ville', ville);
        formData.append('bankName', bankName);
        formData.append('typeCompt', typeCompt);
        formData.append('numCompt', numCompt);
        formData.append('typeUser', typeUser);
        if(typeUser == 1) {
            for (let i = 0; i < files.length; i++) {
                formData.append(`myIdentities[]`, files[i]);
            }

            for (let i = 0; i < services.length; i++) {
                formData.append(`services[]`, services[i]);
            }
        }

        const url = "http://localhost:8000/api/SaveUser";

        console.log([...formData]);
        await axios.post(url, formData).then(({data}) => {

            let swalTitle = typeUser == 1 ?
                "Bienvenue professionnel ! Vous êtes inscrit sur notre liste." :
                "Bienvenue ! Vous êtes inscrit sur notre liste.";

            let swalText = typeUser == 1 ?
                "Votre compte n'est pas encore actif. Vous recevrez un e-mail lorsque votre compte sera activé." :
                "Veuillez vous connecter";

            swal({
                title: swalTitle,
                text: swalText,
                icon: "success",
                button: "OK!",
            }).then(() => {
                setIsRegister(true);
            });
            setIsRegister(true);
        }).catch(({response}) => {
            if (response.status === 442) {
                console.log(response.data.errors);
            } else {
                console.log(response.data.message);
            }
        });

        if (isRegister) {
            return <Navigate to="/" />;
        }

    }
    return <div className="login-form-box">
        <h3 className="mb-30">Inscription</h3>

        <form className="login-form" onSubmit={createUser}>
            <div className="fisrt" id='first'>

                <div className="input-box mb--30">
                    <input type="text" name='lname' required placeholder="Nom" value={fname}
                           onChange={(e) => setFname(e.target.value)}/>
                </div>
                <div className="input-box mb--30">
                    <input type="text" name='fname' required value={lname} placeholder="Prénom"
                           onChange={(e) => setLname(e.target.value)}/>
                </div>
                <div className="input-box mb--30">
                    <input type="email" name='email' required placeholder="Email" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="input-box mb--30">
                    <input type="tel" name='telUser' required value={telUser} onChange={(e) => setTelUser(e.target.value)}
                           placeholder="Téléphone"/>
                </div>
                <div className="input-box mb--30">
                    <input type="text" name='adrs' required placeholder="Adresse" value={adrs}
                           onChange={(e) => setAdrs(e.target.value)}/>
                </div>
                <div className="input-box mb--30">
                    <input type="text" name='ville' required placeholder="Ville" value={ville}
                           onChange={(e) => setVille(e.target.value)}/>
                </div>
                <div className="input-box mb--30">
                    <input type="password" name='password' required placeholder="Mot de passe" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type='button' className="rn-btn edu-btn w-100 mb--30"
                        onClick={() => hideShow('first', 'second')}>
                    <span>Suivant</span>
                </button>

            </div>
            <div id='second' style={{display: 'none'}}>
                <div className="input-box mb--30">
                    <input type="text" name='bankName' required placeholder="Nom du banque" value={bankName}
                           onChange={(e) => setBankName(e.target.value)}/>
                </div>
                <div className="input-box mb--30">
                    <input type="text" name='typeCompt' required placeholder="Type de compte bancaire" value={typeCompt}
                           onChange={(e) => setTypeCompt(e.target.value)}/>
                </div>
                <div className="input-box mb--30">
                    <input type="text" name='numCompt' required placeholder="numero du compte bancaire" value={numCompt}
                           onChange={(e) => setNumCompt(e.target.value)}/>
                </div>

                <button className="rn-btn edu-btn w-100 mb--30" type='button'
                        onClick={() => hideShow('second', 'third')}>
                    <span>Suivant</span>
                </button>
            </div>
            <div id='third' style={{display: 'none'}}>
                <div className="input-box">
                    <input id="checkbox-2"  name='typeCompte' value={1} type="radio" onChange={onchangeEventOne}/>
                    <label htmlFor="checkbox-2">Compte professionnel</label>
                </div>
                <div className="input-box mb-4">
                    <input id="checkbox-3" name='typeCompte' value={2} type="radio" onChange={onchangeEventTwo}/>
                    <label htmlFor="checkbox-3">Compte particulier</label>
                </div>
                <div id='ident' style={{display: "none"}}>
                    <label>Veuillez télécharger votre identité.</label>
                    <div className="input-box mb--30" >
                        <input type="file" id="file" name='identity[]' onChange={handleFileChange} placeholder="Identité" multiple/>
                    </div>
                    <div className="input-box mb--30">
                        <label>Veuillez choisir le service que vous proposez.</label>
                        <select id="ser" multiple onChange={handleServiceChange}>
                                <option value="2">MENAGE</option>
                                <option value="3">NETTOYAGE DE VOITURE</option>
                                <option value="4">HOME ORGANIZING</option>
                                <option value="5">JARDINAGE</option>
                        </select>
 {/* Render the sub-services based on the selected services */}
 {subServices.length > 0 && (
        <div>
          <h5>Sous Services:</h5>
          {/* <ul>
            {subServices.map((subService) => (
              <li key={subService}>{subService}</li>
            ))}
          </ul> */}
          <label>Veuillez choisir le sous-service que vous proposez.</label>
          <select id="subSer" multiple onChange={handleSubServiceChange}>
            {subServices.map((subService) => (
              <option key={subService} value={subService}>
                {subService}
              </option>
            ))}
          </select>
        </div>
      )}
                    </div>
                </div>

                <div className="comment-form-consent input-box mb--30">
                    <input id="checkbox-1" type="checkbox" required />
                    <label htmlFor="checkbox-1">Accepter <Link to="/conditions">les conditions</Link> Générales d'Utilisation</label>
                </div>
                <button className="rn-btn edu-btn w-100 mb--30" type='submit'>
                    <span>Inscrire</span>
                </button>
            </div>

        </form>
    </div>
}

export default RegisterForm;