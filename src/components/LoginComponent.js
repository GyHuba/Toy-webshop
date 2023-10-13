import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import '../css/components/login-signup.css'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../constants/authentication-initialize";
import { readUserData } from "../services/authentication-services";
import { userContext } from "../contexts/userContext";

export default function LoginComponent() {

    const {userData, setUserData} = useContext(userContext);

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [passwordShown, setPasswordShown] = useState(false);
    const [errorMsg, setErrorMsg] = useState("error-msg");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            console.log(userCredential, "sikeres belépés")
            readUserData(userCredential.user.uid, setUserData)
            setErrorMsg("error-msg")
        }
        catch (error) {
            setErrorMsg("error-div")
            console.log(error)
        }
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <label>email:</label>
                <p><input value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    type="text"
                    placeholder="abc@example.com"
                    id="email" /></p>
                <label>password:</label>
                <p><input type={passwordShown ? "text" : "password"}
                    onChange={(e) => setLoginPassword(e.target.value)} /></p>
                <div className={errorMsg}>Wrong password. Try again.</div>
                <button onClick={togglePassword}>Show Password</button>
                <button type="submit">Bejelentkezés</button>
            </form>
            <Link to="/regisztracio">No account yet? Sign up</Link>
        </div>
    )

}