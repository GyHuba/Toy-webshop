import { useEffect, useState } from "react"
import { readOneProduct } from "../services/product-services";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../css/global.css"

export default function SingleProductData() {

    const [product, setProduct] = useState('');
    const pathParameters = useParams()

    const productID = pathParameters.productid

    useEffect(() => {
        readOneProduct(productID, setProduct)
    })

    return (
            <div className="card">
                <h2>{product.title}</h2>
                <div className="card-img-container">
                        <img src={product.ImageURL ? product.ImageURL : "/betyarvar_logo_szurke.svg"}/> 
                    </div>
                <div className="card-content">
                    <p className="product-price">{product.price}</p>
                    <p className="product-description">{product.description}</p>
                    <div className="product-card-buttons">
                        <NavLink to={-1}>Vissza a termékekhez</NavLink>
                        <button className="red-btn">Kosárba</button>
                    </div>
                </div>
            </div>
    )
}