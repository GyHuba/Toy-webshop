import { Link, useNavigate, useParams } from "react-router-dom";
import { readSortedProduct, readProduct } from "../services/product-services";
import { useEffect, useState } from "react";
import "../css/components/page-buttons.css"
import ProductSort from "./ProductSort";
import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";
import "../css/global.css"
import "../css/components/product-list.css"
import AddToCartService from "../services/cart-service";
import { userContext } from "../contexts/userContext";
import { readCategories } from "../services/category-services";
import "../css/modal/modal.css"
import { categoryContext } from "../contexts/categoryContext";
import { favContext } from "../contexts/favContext";
import { addToFavourites, deleteFavourite, readUserFavourites } from "../services/fav-services";
import { FaHeart, FaRegHeart } from 'react-icons/fa';


export default function ProductList() {

    const { cart, setCart } = useContext(CartContext);
    const { userData, setUserData } = useContext(userContext);

    const [productList, setProductList] = useState([]);
    const [prices, setPrices] = useState([0, 0])
    const [categoryList, setCategoryList] = useState([])
    const {category, setCategory} = useContext(categoryContext)
    const {favourites, setFavourites} = useContext(favContext)

    const [modal, setModal] = useState(false);

    const navigate = useNavigate()

    const { sortType, pagenumber } = useParams();

    useEffect(() => {
        readProduct(setProductList).then(res => setMinMax(res))
        readCategories(setCategoryList)
    }, [])

    useEffect(() => {
        readSortedProduct(category, sortType, prices, setProductList)
    }, [sortType, prices, category])

    useEffect(() => {
        userData && 
        readUserFavourites(userData.uid)
            .then(res => setFavourites(res || {}))
    }, [])

    //LAPOZÓS RÉSZ
    //const [currentPage,setCurrentPage] = useState(1);
    const productPerPage = 9;
    const lastIndex = pagenumber * productPerPage;
    const firstIndex = lastIndex - productPerPage;

    const products = productList.slice(firstIndex, lastIndex);

    const numberPage = Math.ceil(productList.length / productPerPage);


    // ÁRAK BEÁLLÍTÁSA
    function setMinMax(productList) {
        const priceList = productList?.map(product => product.price);
        setPrices([Math.min(...priceList), Math.max(...priceList)]);
    }

    //FELUGRO ABLAK
    const toggleModal = () => {
        setModal(!modal);
      };

    return (
        <>
            <details className="sort-order-panel">
                <summary className="sort-order-title">Szűrés és rendezés</summary>
                <div className="sort-order-content">
                    <ProductSort pagenumber={pagenumber} />
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
            
            <div className="product-card-container">
                {products?.map(product => (
                    <div className="card" key={product.id}>
                        <h3>{product.title}    <button className="fav-btn" onClick={() => favouriteHandler(product, userData?.uid)}>{Object.keys(favourites)?.includes(product.id) ? <FaHeart/> : <FaRegHeart />}</button> </h3>
                        <div className="card-img-container">
                            <img src={product.ImageURL ? product.ImageURL : "/betyarvar_logo_szurke.svg"}/> 
                        </div>

                        <div className="card-content">
                            <p>{`${product.price} Ft`}</p>
                            <div className="product-card-buttons">
                                <Link to={`/termekek/product/${product.id}`}>Tovább a termékre</Link>
                                <button className="red-btn" onClick={() => addToCart(product)}>Kosárba</button>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>

            {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div className="modal-header"> <h2>Kedves vásárló!</h2><button className="close-modal" onClick={toggleModal}>
              X
            </button></div>
            
            <p>A vásárláshoz bejelentkezés szükséges! </p>
            <p>Ha még nem regisztrált <Link to="/regisztracio" >itt</Link> megteheti!</p>
            <Link className="modal-link" to={"/bejelentkezes"}>Bejelentkezés</Link>
          </div>
        </div>
      )}

            <div className="page-buttons">
                <span>
                    {
                        +pagenumber === 1 ? "" :
                            <button className="button" onClick={prevPage}>Prev</button>
                    }
                </span>

                <span>
                    {
                        prevButtons()
                    }
                </span>

                <span>
                    <button className="current button">{+pagenumber}</button>
                </span>

                <span>
                    {
                        nextButtons()
                    }
                </span>
                <span>
                    {
                        +pagenumber === numberPage ? "" :
                            <button className="button" onClick={NextPage}>Next</button>
                    }
                </span>
            </div>
        </>
    )


    function prevPage() {
        if (+pagenumber > 1) {
            navigate(`/termekek/${sortType}/${+pagenumber - 1}`)
        }
    }

    function NextPage() {
        if (+pagenumber !== numberPage) {
            navigate(`/termekek/${sortType}/${+pagenumber + 1}`)
        }

    }

    function prevButtons() {
        let arr = [];

        for (let i = +pagenumber - 3; i < +pagenumber; i++) {
            if (i > 0) {
                arr.push(<Link key={i} onClick={() => navigate(`/termekek/${sortType}/${i}`)} to="#" className="button">{i}</Link>)
            }
        }
        return arr
    }
    function nextButtons() {
        let arr = [];

        for (let i = +pagenumber + 1; i <= +pagenumber + 3; i++) {
            if (numberPage >= i) {
                arr.push(<Link key={i} onClick={() => navigate(`/termekek/${sortType}/${i}`)} to="#" className="button">{i}</Link>)
            }
        }
        return arr
    }    
    //Ez a jó!!
    function addToCart(product){
        if(userData){  
            if(!Object.keys(cart).includes(product.id)){
                //const cartDatas = {...cart,[product.id]: 1}
                setCart({...cart,[product.id]: 1})              
                AddToCartService({...cart,[product.id]: 1},userData.uid)
            }else{
                let itemNumber = Number(cart[product.id]+1)
                setCart({...cart,[product.id]:itemNumber})
                AddToCartService({...cart,[product.id]:itemNumber},userData.uid) 
            }    
        }else {
            toggleModal()
        }
    }
    
    function favouriteHandler(product, userID){
        if(userData){
            if(Object.keys(favourites)?.includes(product.id)){
                deleteFavourite(userID, product.id)
                    .then(() => readUserFavourites(userID, (res) => {
                        console.log("favourites", res)
                        setFavourites(res || {});
                    }))
            }
            else{
                setFavourites({...favourites, [product.id]:product})
                addToFavourites({[product.id]:product}, userID)
            }
        }else{
            alert("Kedvencek hozzáadásához kérjük jelentkezzen be!")
        }
    }
}