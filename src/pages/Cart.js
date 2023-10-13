import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import CartComponent from "../components/CartComponent";

export default function Cart(){
    
    return(
        <> 
            <CartComponent/>
        </>
    )
    
}