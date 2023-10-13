import { useContext, useEffect, useState } from "react"
import { categoryContext } from "../contexts/categoryContext"
import { readCategories } from "../services/category-services"
import { useNavigate } from "react-router-dom"
import "../css/components/category-links.css"

export default function CategoryLinks(){
    const [categoryList, setCategoryList] = useState([])
    const {category, setCategory} = useContext(categoryContext)
    const navigate = useNavigate();

    useEffect(() => {readCategories(setCategoryList)}, [])

    function catBtnHandler(categoryID){
        setCategory(categoryID)
        navigate("/termekek/AToZ/1")
    }

    return(
        <section className="card catlink-card">
            <h3>Fedezd fel termékeinket</h3>
            <div className="card-content">
                <ul className="catlink-ul">
                    {
                        categoryList?.map(category => (
                            <li key={category.id}><button className="red-outline-btn" onClick={() => catBtnHandler(category.id)} >{category.title}</button> </li>
                        ))
                    }
                    <li><button className="red-btn" onClick={() => catBtnHandler("")}>Összes megtekintése</button></li>
                </ul>
            </div>
        </section>
    )
}