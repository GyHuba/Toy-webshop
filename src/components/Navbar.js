import '../css/global.css'
import '../css/components/navbar.css'
import { NavLink, Link } from "react-router-dom";
import SearchBar from './SearchBar';
import { useContext } from 'react';
import { userContext } from '../contexts/userContext';
import { signOut } from "firebase/auth";
import { auth } from "../constants/authentication-initialize";
import { GrCart } from 'react-icons/gr';
import NavBarRight from './NavbarRight';
import AdminNavbar from './AdminNavbar';
import { categoryContext } from '../contexts/categoryContext';



export default function Navbar() {
    
    const {userData, setUserData} = useContext(userContext)
    const {category, setCategory} = useContext(categoryContext)
/* 
    const userSignOut = () => {
        signOut(auth)
          .then(() => {
            console.log("sign out successful");
            setUserData(null)
          })
          .catch((error) => console.log(error));
      }; */

    return (
        <div>
            <nav className='header-nav blue-bg'>
                <div className='navbar-title-container'>
                    <Link to={userData?.role === "admin" ? "/admin" : "/"}><img className='navbar-logo' src="/betyarvar_logo_kek.svg" /></Link> 
                    <h1 className='navbar-logo'>Betyárvár</h1>
                </div>
                <ul className="navbar-ul">
                    <li className='navbar-li'><NavLink className='navbar-link' to="/">Kezdőlap</NavLink> </li>
                    <li className='navbar-li'><NavLink className='navbar-link' to="/termekek/AToZ/1" onClick={() => setCategory("")}> Termékek</NavLink> </li>
                </ul>
                <SearchBar />
                <NavBarRight />
            </nav>
            <AdminNavbar />
        </div>
    )
}