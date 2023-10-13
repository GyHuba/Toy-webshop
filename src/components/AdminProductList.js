import { useState, useEffect, useContext } from "react"
import { readProduct, readSortedProduct } from "../services/product-services"
import { Link, useNavigate, useParams } from "react-router-dom"
import "../css/components/page-buttons.css"
import "../css/components/admin-product-list.css"
import "../css/global.css"
import { readCategories } from "../services/category-services"
import { categoryContext } from "../contexts/categoryContext"


export default function AdminProductList(){
    const [productList, setProductList] = useState([])
    const [prices, setPrices] = useState([0, 0])
    const [categoryList, setCategoryList] = useState([])
    const {category, setCategory} = useContext(categoryContext)

    const {sortType, pagenumber} = useParams()

    const navigate = useNavigate()


    const productPerPage = 9;
    const lastIndex = pagenumber * productPerPage;
    const firstIndex = lastIndex - productPerPage;

    const products = productList.slice(firstIndex, lastIndex);

    const numberPage = Math.ceil(productList.length / productPerPage);
   


    function navigateSortABC(){
        if(sortType != "AToZ" || sortType != "ZToA") navigate(`/admin/termekek/AToZ/${pagenumber}`)
        if(sortType === "AToZ") navigate(`/admin/termekek/ZToA/${pagenumber}`)
        if(sortType === "ZToA") navigate(`/admin/termekek/AToZ/${pagenumber}`)
    }

    function navigateSortPrice(){
        if(sortType != "asc" || sortType != "desc") navigate(`/admin/termekek/asc/${pagenumber}`)
        if(sortType == "asc") navigate(`/admin/termekek/desc/${pagenumber}`)
        if(sortType == "desc") navigate(`/admin/termekek/asc/${pagenumber}`)
    }

    useEffect(() => {
        readProduct(setProductList).then(res => setMinMax(res))
    }, [])

    useEffect(() => {
        readSortedProduct(category, sortType, prices, setProductList)
    }, [category, sortType, prices, pagenumber])

    useEffect(() => {
        readCategories(setCategoryList)
    }, []
    )


    function setMinMax(productList) {
        const priceList = productList?.map(product => product.price);
        setPrices([Math.min(...priceList), Math.max(...priceList)]);
    }

    return(
        <div>
            <details className="sort-order-panel">
                <summary className="sort-order-title">Szűrés és rendezés</summary>
                <div className="sort-order-content">
                    <div className="range-slider">
                        <span className="sort-order-label">Szűrés ár szerint</span>
                        <label htmlFor="min-price">Min</label>
                        <input type="text" className="sort-order-input" id="min-price" value={prices[0]} placeholder="Minimum price" onChange={(e) => setPrices(prev => [Number(e.target.value), prev[1]])} />
                        <label htmlFor="max-price">Max</label>
                        <input type="text" className="sort-order-input" id="max-price" value={prices[1]} placeholder="Maximum price" onChange={(e) => setPrices(prev => [prev[0], Number(e.target.value)])} />
                    </div>
                    <label htmlFor="category" className="sort-order-label">Szűrés kategória szerint</label>
                    <select id='category' value={category}
                            onChange={(e) => setCategory(e.target.value)} className="sort-order-input">
                            <option value="" disabled defaultValue hidden>Válassz!</option>
                            {
                                categoryList?.map(category => (
                                    <option key={category.id} value={category.id}>{`${category.title}`}</option>
                                ))
                            }
                            <option value="">Összes termék</option>
                    </select>
                </div>
            </details>
            <table className="zebra-table admin-list">
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
                        products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td> 
                                    <div className="table-btn-container">
                                        <Link className="red-outline-btn" to={`/admin/termekek/${product.id}/modositas`}>Módosítás</Link> 
                                        <Link className="red-btn" to={`/admin/termekek/${product.id}/torles`}>Törlés</Link>  
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>


            <div className="page-buttons">
                <span>
                    {
                        +pagenumber === 1 ? "" :
                            <Link to="#" className="button" onClick={prevPage}>Előző</Link>
                    }
                </span>

                <span>
                    {
                        prevButtons()
                    }
                </span>

                <span>
                    <Link to="#" className="current button">{+pagenumber}</Link>
                </span>

                <span>
                    {
                        nextButtons()
                    }
                </span>
                <span>
                    {
                        +pagenumber === numberPage ? "" :
                            <Link to="#" className="button" onClick={NextPage}>Következő</Link>
                    }
                </span>
            </div>
        </div>
    )


    function prevPage() {
        if (+pagenumber > 1) {
            navigate(`/admin/termekek/${sortType}/${+pagenumber - 1}`)
        }
    }

    function NextPage() {
        if (+pagenumber !== numberPage) {
            navigate(`/admin/termekek/${sortType}/${+pagenumber + 1}`)
        }

    }

    function prevButtons() {
        let arr = [];

        for (let i = +pagenumber - 3; i < +pagenumber; i++) {
            if (i > 0) {
                arr.push(<Link onClick = {() =>navigate (`/admin/termekek/${sortType}/${i}`)} to="#" className="button">{i}</Link>)
            }
        }
        return arr
    }
    function nextButtons() {
        let arr = [];

        for (let i = +pagenumber + 1; i <= +pagenumber + 3; i++) {
            if (numberPage >= i) {
                arr.push(<Link onClick = {() =>navigate (`/admin/termekek/${sortType}/${i}`)} to="#" className="button">{i}</Link>)
            }
        }
        return arr
    }


}
        
    
