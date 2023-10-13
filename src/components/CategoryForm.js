import "../css/global.css"
import "../css/components/product-form.css"
import { createCategory } from "../services/category-services"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function CategoryForm (){
    
    const [catformdata,setCatformdata] = useState(
        {
            title:""
        }
    )

    const navigate = useNavigate();

    return(
        <div className="card form-card">
            <h2>Új termékkategória</h2>        
            <form onSubmit={(e) => handleSubmit(e)} >
                <label htmlFor='title'>Név</label>
                <input type='text' id='title' className="prod-form-input"
                value={catformdata.title} 
                onChange={(e) => setCatformdata({"title": e.target.value})} 
                placeholder='Kategória neve'/>
                <div className="btn-wrap">
                    <button type="button" onClick={() => navigate(-1)} className="red-outline-btn">Mégse</button>
                    <button type="submit" className="red-btn">Mentés</button>
                </div>
            </form>
        </div>
    )

    function handleSubmit(e){
        e.preventDefault()
        createCategory(catformdata)
        setCatformdata({title:""})
    }
}