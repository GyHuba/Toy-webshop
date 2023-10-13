import { useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../contexts/userContext";
import { signOut } from "firebase/auth";
import { auth } from "../constants/authentication-initialize";
import { GrCart } from 'react-icons/gr';
import { FaHeart } from 'react-icons/fa';
import "../css/components/navbar-right.css"
import { BiLogIn } from "react-icons/bi"
import { BiUserPlus } from "react-icons/bi";
import { CartContext } from "../contexts/CartContext";
import { readUserCartFirebase } from "../repos/cart-repos";

export default function NavBarRight(){
    const {userData, setUserData} = useContext(userContext)
    const {cart, setCart} = useContext(CartContext)
    const navigate = useNavigate()

    useEffect(() => {
            readUserCartFirebase(userData?.uid)
            .then(res => setCart(res || {}))
    }, [])

    const cartProducts = () => {
        return Object.values(cart).reduce((sum, n) => sum + n)
    }

    const userSignOut = () => {
        signOut(auth)
          .then(() => {
            console.log("sign out successful");
            setUserData(null)
            navigate("/")
          })
          .catch((error) => console.log(error));
      };

    if(!userData) return (
        <ul className="navbar-ul">
            <li className='navbar-li'><NavLink className='navbar-signup-link' to="/regisztracio">Regisztráció <BiUserPlus/></NavLink> </li>
            <li className='navbar-li'><NavLink className='navbar-login-link' to="/bejelentkezes">Bejelentkezés <BiLogIn/></NavLink> </li>
        </ul>
    )
    if(userData.role === "user") return (
        <ul className="navbar-ul">
            <li className='navbar-li'>Szia <Link to={`/profil`} className="user-link">{`${userData.name}`}</Link> !</li>
            <li className='navbar-li'><Link className='navbar-cart-link' to="/kosar"><GrCart/></Link> {Object.values(cart).length ? <small className="cart-number">{cartProducts()} </small> : ""}  </li>
            <li className="navbar-li"><Link className='navbar-fav-link' to="/kedvencek"><FaHeart /></Link> </li>
            <li className='navbar-li'><button className="sign-out-btn" onClick={userSignOut} >Kijelentkezés</button> </li>
        </ul>
    )
    if(userData.role === "admin") return(
        <ul className="navbar-ul">
            <li className='navbar-li'>Szia <Link to={`/profil`} className="user-link" >{`${userData.name}`}</Link> !</li>
            <li className='navbar-li'><button className="sign-out-btn" onClick={userSignOut} >Kijelentkezés</button> </li>
        </ul>
    )
}