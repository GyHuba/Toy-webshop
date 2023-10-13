import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../constants/authentication-initialize";
import { readUserData } from "../../services/authentication-services";
import { userContext } from "../../contexts/userContext";
import "../../css/pages/login.css"
import { AiOutlineEyeInvisible } from "react-icons/ai";

export default function LoginComponent(response) {

    const {userData, setUserData} = useContext(userContext);
    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [passwordShown, setPasswordShown] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
  

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            console.log(userCredential, "sikeres belépés")
            readUserData(userCredential.user.uid, setUserData).then(res => res.role === "admin" ? navigate("/admin") : navigate("/"))
            
        }
        catch (error) {
            setErrorMsg("Hibás név vagy jelszó!")
            
        }
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <div className="login-wall">
            <div className="login-auth-container">
                <div className="login-title-wrap">
                    <Link to="/"><img className='navbar-logo' src="/betyarvar_logo_kek.svg" /></Link>
                    <h2 className="login-card-logo">Bejelentkezés</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <label className="login-card-form" htmlFor="email">Email:</label>
                    <p><input className="login-input" value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        type="text"
                        placeholder="Enter your e-mail"
                        id="email" /></p>
                    <label htmlFor="password">Jelszó:</label>
                    <p><input className="login-input" id="password" type={passwordShown ? "text" : "password"}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter password" />
                        <span><Link className="show-pass-btn" onClick={togglePassword}><AiOutlineEyeInvisible /></Link></span>
                        </p>
                    <div className="errorMsg">{errorMsg}</div>
                    <div className="loginbtn"><button className="login-btn-log" type="submit">Belépés</button></div>
                </form>
                <div className="login-card-footer"><Link to="/regisztracio">Még nincs fiókod? Regisztrálj</Link></div>
            </div>
        </div>
    )

}