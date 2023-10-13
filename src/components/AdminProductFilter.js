import { useState, useEffect } from "react"
import { readSortedProduct } from "../services/product-services"
import { Link, useNavigate, useParams } from "react-router-dom"

export default function AdminProductFilter(){
    const [productList, setProductList] = useState([])

    const {searchterm, sortType} = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        readSortedProduct("", sortType, searchterm, setProductList)
    }, [searchterm, sortType])

    function navigateSortABC(){
        if(sortType != "AToZ" || sortType != "ZToA") navigate(`/admin/termekek/kereses/${searchterm}/AToZ`)
        if(sortType === "AToZ") navigate(`/admin/termekek/kereses/${searchterm}/ZToA`)
        if(sortType === "ZToA") navigate(`/admin/termekek/kereses/${searchterm}/AToZ`)
    }

    function navigateSortPrice(){
        if(sortType != "asc" || sortType != "desc") navigate(`/admin/termekek/kereses/${searchterm}/asc`)
        if(sortType == "asc") navigate(`/admin/termekek/kereses/${searchterm}/desc`)
        if(sortType == "desc") navigate(`/admin/termekek/kereses/${searchterm}/asc`)
    }

    return(
        <>
            <table className="zebra-table">
                <thead>
                    <tr>
                        <th>Cikkszám</th>
                        <th onClick={() => navigateSortABC()}>Terméknév</th>
                        <th onClick={() => navigateSortPrice()}>Ár</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productList.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <div className="table-btn-container">
                                    <Link className="red-outline-btn" to={`/admin/termekek/${product.id}/modositas`}>Módosítás</Link> 
                                    <Link className="red-btn" to={`/admin/termekek/${product.id}/torles`}>Törlés</Link>  
                                </div>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}