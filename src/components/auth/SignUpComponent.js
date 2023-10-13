import { useState } from "react"
import { auth } from "../../constants/authentication-initialize";
import { createUserWithEmailAndPassword, EmailAuthCredential } from "firebase/auth"
import { createUser } from "../../services/authentication-services";
import { toast, ToastContainer } from 'react-toastify';
import "../../css/pages/sign-up.css"
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";



export default function SignUpComponent() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate();

   

    const handleAlert = () => {
        const alertSignUp = [];

        // Password
        if (password.length < 6) {
            toast.error('A jelszónak minimum 6 karakter hosszúságunak kell lennie!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }

        // Name
        const regexName = /[a-zA-Z]+\d*/;
        const foundRegexName = regexName.test(String(name));
        if (name.length < 4 || name.length === 0) {
            toast.error('A név minimum 3 karakter kell hogy legyen és tartalmaznia kell betűket!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
        if (foundRegexName === false) {
            toast.error("A névnek betűt is kell tartalmaznia!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }

        // Email
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const foundRegexEmail = regexEmail.test(String(email));
        if (foundRegexEmail === false) {
            toast.error("Az email mezőnek email cím formátumot kell tartalmaznia (pl.: proba@proba.hu)!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }

        if (alertSignUp.length > 0) {
            alert(alertSignUp);
            return false;
        } else {
            return true;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (handleAlert()) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                const userID = userCredential.user.uid;


                createUser({
                    uid: userID,
                    name: name,
                    email: email,
                    role: "user"
                }, userID, incorrect)
            }
            catch (error) {
                console.log(error)
                toast.error(`Sikertelen regisztráció!`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                
            }
        }
    }

    function incorrect(response) {

        if (response.ok) {
            toast.success('🦄 Sikeres regisztráció! Át lesz irányítva a bejelentkezés oldalra.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            }); 
            setTimeout(() => {
                navigate("/bejelentkezes")
            }, 4000);
        }
    }
    return (
        <>
            
                <div className="sign-up-wall">
                    <div className="sign-up-auth-container">
                        <div className="signup-title-wrap">
                            <Link to="/"><img className='navbar-logo' src="/betyarvar_logo_kek.svg" /></Link>
                            <h2>Regisztráció</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <label className="sign-card-form" htmlFor="name">Név</label>
                            <p>
                                <input className="sign-input" value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    placeholder="Név"
                                    id="name" />
                            </p>
                            <label className="sign-card-form" htmlFor="email">Email</label>
                            <p>
                                <input className="sign-input" value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="text"
                                    placeholder="abc@betyarvar.hu"
                                    id="email" />
                            </p>
                            <label className="sign-card-form" htmlFor="password">Jelszó</label>
                            <p>
                                <input className="sign-input" value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Min. 6 karakter"
                                    id="password" />
                            </p>
                            <div className="signbtn">
                                <button className="sign-btn-log" type="submit" onClick={incorrect}>Regisztráció</button>
                            </div>
                        </form>
                        <ToastContainer />
                        </div>
                        </div>
                       
                     
                        
                    </> )}