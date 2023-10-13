import "../css/global.css"
import "../css/pages/admin-delete-product.css"
import { useNavigate, useParams } from "react-router-dom"
import { deleteProduct } from "../services/product-services"

export default function AdminDeleteProduct(){

    const {id} = useParams()
    const navigate = useNavigate()

    return(
        <>
            <div className="card">
                <h2>Termék törlése</h2>
                <div className="card-content">
                    <p>Biztosan törölni szeretnéd a terméket?</p>
                    <div className="delete-btn-wrapper">
                        <button className="red-btn" onClick={() => {
                            deleteProduct(id, console.log)
                            navigate(-1)
                        }} >Törlés</button>
                        <button className="red-outline-btn" onClick={() => navigate(-1)}>Mégse</button>
                    </div>
                </div>
            </div>
        </>
    )
}