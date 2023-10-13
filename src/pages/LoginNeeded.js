import { Link } from "react-router-dom";

export default function LoginNeeded(){
    return(
        <>
            <h2>Bejelentkezés szükséges</h2>
            <p>A kért oldal megtekintéséhez kérjük <Link to="/regisztracio">regisztrálj</Link>, vagy <Link to="/bejelentkezes">jelentkezz be</Link>!</p>
            
            <Link to="/">Vissza a kezdőlapra</Link>
        </>
    )
}