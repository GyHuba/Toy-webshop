import { useState } from "react";
import { categoryContext } from "./categoryContext";

export function CategoryProvider(props){
    const [category, setCategory] = useState("")

    return(
        <categoryContext.Provider value={{category, setCategory}}>
            {props.children}
        </categoryContext.Provider>
    )
}