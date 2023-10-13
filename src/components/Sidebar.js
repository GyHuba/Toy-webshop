import '../css/components/sidebar.css'
import { NavLink } from "react-router-dom";

export default function Sidebar(){
    return(
        <nav>
            <ul className="sidebar">
                <li>Category 1</li>
                <li>Category 2</li>
                <li>Category 3</li>
                <li>Category 4</li>
                <li><NavLink to="/termekek/AToZ/1">See All</NavLink> </li>
            </ul>
        </nav>
    )
}