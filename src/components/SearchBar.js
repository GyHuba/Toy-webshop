import "../css/components/searchbar.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function SearchBar(){

    const [searchTerm, setSearchTerm] = useState("");
    const [type, setType] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        if(window.location.href.includes("admin")) setType("admin")
        else setType("user")
    }, [window.location.href])

    function handleSearch(e){
        e.preventDefault();
        if(type === "user") navigate(`/termekek/kereses/${searchTerm}/AToZ`);
        if(type === "admin") navigate(`/admin/termekek/kereses/${searchTerm}/AToZ`);
        setSearchTerm("")        
    }

    return(
        <>
        <form className="search-wrapper" onSubmit={handleSearch}>
            <span className="material-symbols-rounded">search</span>
            <input className="search-input" type="text" placeholder="Keresés" value={searchTerm} onChange={(e) =>setSearchTerm(e.target.value)}/>
            <button className="search-btn yellow-bg" type="submit">Keresés</button>        
        </form>
        </>
    )
}