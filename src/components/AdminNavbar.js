import "../css/global.css"
import "../css/components/admin-navbar.css"
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { userContext } from "../contexts/userContext";
import { categoryContext } from "../contexts/categoryContext";

export default function AdminNavbar (){
    const {userData, setUserData} = useContext(userContext)
    const {category, setCategory} = useContext(categoryContext)

    if(userData?.role === "admin"){
        return(
            <nav className="admin-nav yellow-bg">
                <ul className="admin-navbar-ul">
                    <li><NavLink className="admin-navlink" to="/admin/termek-felvitel"> Új termék </NavLink></li>
                    <li><NavLink className="admin-navlink" to="/admin/termekek/AToZ/1" onClick={() => setCategory("")}>Admin terméklista</NavLink></li>
                    <li><NavLink className="admin-navlink" to="/admin/kategoriak/uj-kategoria">Új kategória</NavLink></li>
                    <li><NavLink className="admin-navlink" to="/admin/vasarlok">Regisztrált vásárlók</NavLink></li>
                    <li><NavLink className="admin-navlink" to="/admin/megrendelesek">Megrendelések</NavLink></li>
                </ul> 
            </nav>
        )
    } else{
        return ""
    }
}