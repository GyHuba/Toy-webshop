import { useState } from "react";
import { favContext } from "./favContext";

export function FavProvider(props){

    const [favourites, setFavourites] = useState({});

    return(
        <favContext.Provider value={{favourites, setFavourites}}>
            {props.children}
        </favContext.Provider>
    )
}