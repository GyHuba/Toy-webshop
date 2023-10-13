import { useState } from "react";
import { CartContext } from "./CartContext";

export const CartContextProvider= (props)=>{

    const [cart, setCart] = useState({});

    return(
            <CartContext.Provider value={{cart,setCart}}>
                {props.children}
            </CartContext.Provider>
    )
}