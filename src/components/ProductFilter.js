import { useState } from "react";
import { useParams } from "react-router-dom";
import { readSortedProduct, readProduct } from "../services/product-services";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/components/product-list.css"


export default function ProductFilter() {

    const [products, setProducts] = useState([]);

    const [prices, setPrices] = useState([0, 0])
    const navigate = useNavigate()

    const {searchTerm, sortType} = useParams();

    useEffect(() => {
        readProduct(setProducts).then(res => setMinMax(res))
    }, [])

    useEffect(() => {
        readSortedProduct("", sortType, searchTerm, setProducts)
    },[searchTerm, sortType, prices])

    function setMinMax(productList) {
        const priceList = productList?.map(product => product.price);
        setPrices([Math.min(...priceList), Math.max(...priceList)]);
    }


    return (
        <div>
            <h2>Keresési eredmények</h2>
            <details className="sort-order-panel">
                <summary className="sort-order-title">Szűrés és rendezés</summary>
                <div className="sort-order-content">
                    <label htmlFor="sort" className="sort-order-label">Találatok rendezése</label>
                    <select onChange={(e) => (navigate(`/termekek/kereses/${searchTerm}/${e.target.value}/`))} id="sort" className="sort-order-input">
                        <option value="AToZ">Abc szerint növekvő</option>
                        <option value="ZToA">Abc szerint csökkenő</option>
                        <option value="asc">Ár szerint növekvő</option>
                        <option value="desc">Ár szerint csökkenő</option>
                    </select>
                </div>
            </details>
            
            <div className="product-card-container">
                {
                products?.map(product => (
                        <div className="card" key={product.id}>
                            <h2>{product.title}</h2>
                            <div className="card-img-container">
                            <img src={product.ImageURL ? product.ImageURL : "/betyarvar_logo_szurke.svg"}/> 
                        </div>
                            <div className="card-content">
                                <p className="product-price">{product.price}</p>
                                <div className="product-card-buttons">
                                    <Link to={`/termekek/product/${product.id}`}>Tovább a termékre</Link>
                                    <button className="red-btn">Kosárba</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}