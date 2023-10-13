import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { favContext } from "../contexts/favContext";
import { userContext } from "../contexts/userContext";
import { CartContext } from "../contexts/CartContext";
import AddToCartService from "../services/cart-service";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { readUserFavourites, addToFavourites, deleteFavourite } from "../services/fav-services";

export default function FavComponent() {
    const { favourites, setFavourites } = useContext(favContext)
    const { userData, setUserData } = useContext(userContext)
    const { cart, setCart } = useContext(CartContext)
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };

    useEffect(() => {
        readUserFavourites(userData.uid)
            .then(res => setFavourites(res || {}))
    }, [])

    function favouriteHandler(product, userID) {
        if (userData) {
            if (Object.keys(favourites)?.includes(product.id)) {
                deleteFavourite(userID, product.id)
                    .then(() => readUserFavourites(userID, (res) => {
                        setFavourites(res || {});
                    }))
            }
            else {
                setFavourites({ ...favourites, [product.id]: product })
                addToFavourites({ [product.id]: product }, userID)
            }
        }
    }

    function addToCart(product) {
        if (userData) {
            if (!Object.keys(cart).includes(product.id)) {
                //const cartDatas = {...cart,[product.id]: 1}
                setCart({ ...cart, [product.id]: 1 })
                AddToCartService({ ...cart, [product.id]: 1 }, userData.uid)
            } else {
                let itemNumber = Number(cart[product.id] + 1)
                setCart({ ...cart, [product.id]: itemNumber })
                AddToCartService({ ...cart, [product.id]: itemNumber }, userData.uid)
            }
        } else {
            toggleModal()
        }
    }

    return (
        <div>
            {Object.values(favourites).length ?
                <div className="card-container">
                    {Object.values(favourites)?.map(fav => (
                        <div className="card" key={fav.id}>
                            <h3>{fav.title}    <button className="fav-btn" onClick={() => favouriteHandler(fav, userData?.uid)}>{Object.keys(favourites)?.includes(fav.id) ? <FaHeart /> : <FaRegHeart />}</button> </h3>
                            <div className="card-img-container">
                                <img src={fav.ImageURL ? fav.ImageURL : "/betyarvar_logo_szurke.svg"} />
                            </div>

                            <div className="card-content">
                                <p>{`${fav.price} Ft`}</p>
                                <div className="product-card-buttons">
                                    <Link to={`/termekek/product/${fav.id}`}>Tovább a termékre</Link>
                                    <button className="red-btn" onClick={() => addToCart(fav)}>Kosárba</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <div className="empty-card">
                    <img className="img-sad" src="/sad-emoji-girl-holds-yellow-emoticon-with-sad-face-isolated-gray-background-unhappy-emoji_101969-2152.jpg"></img>
                    <h2>Nincsenek kedvenceid</h2>
                    <Link className="blue-text" to="/termekek/AToZ/1">Vissza a termékekhez</Link>
                </div>
            }
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

        </div>
    )
}