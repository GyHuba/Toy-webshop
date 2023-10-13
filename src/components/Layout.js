import '../css/components/layout.css'
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from './Footer';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect,useContext } from 'react';
import { userContext } from '../contexts/userContext';
import { readUserData } from '../services/authentication-services';
import { auth } from '../constants/authentication-initialize';
import { CartContext } from '../contexts/CartContext';

export default function Layout() {

    const {userData, setUserData} = useContext(userContext);
    const {cart, setCart} = useContext(CartContext)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
    
            readUserData(uid, setUserData)
          } else {
            setUserData(null);
          }
        });
      }, []);

    return (
        <div className="layout-container">
            <div className='nav-container'>
                <Navbar />
            </div>
            <div className='outlet-container'>
                <Outlet />
            </div>
            <div className='footer-container'>
                <Footer />
            </div>
        </div>
    )
}