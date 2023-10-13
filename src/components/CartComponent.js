import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { userContext } from "../contexts/userContext";
import { Link } from "react-router-dom";
import "../css/global.css"
import "../css/components/cart-btns.css"
import "../css/modal/modal.css"
import CartItem from "./CartItem";
import { readProduct } from "../services/product-services";
import { readUserCartFirebase } from "../repos/cart-repos";
import { createOrder, updateOrder } from "../services/order-service";
import { deleteCartProduct } from "../services/cart-service";


export default function CartComponent(){
   const {cart,setCart}=useContext(CartContext); 
   const {userData, setUserData} = useContext(userContext);
   const [allProduct,setAllProduct]= useState([]);
   const [cartProducts, setCartProducts] = useState([])
   const [orderData, setOrderData] = useState({});
   const [modal, setModal] = useState(false);
  
   useEffect(()=> {
    readUserCartFirebase(userData.uid)
    .then(res => setCart(res || {})) 
    .then(res => readProduct(setAllProduct))
    .then(all => {
      let filtered = all.filter(p => Object.keys(cart).includes(p.id))
      setCartProducts(filtered)})
      setOrderData({
        uid: userData.uid,
        products:cart,
      })
},[cart])


const toggleModal = () => {
  setModal(!modal);
};


  return (
    <>
      {allProduct.length && Object.keys(cart).length ?
        <div>
          <Link className="blue-text" to="/termekek/AToZ/1">Vissza a termékekhez</Link>
          <h2>Kosár tartalma</h2>
          <table className="zebra-table">
            <thead>
              <tr>
                <th></th>
                <th>Név</th>
                <th>Mennyiség</th>
                <th>Egységár</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(cart)?.map((productID) => (
                <CartItem userData={userData} productID={productID} amount={cart[productID]} product={allProduct.find(productData => productData.id == productID)} />
              ))}
              <tr>
                <td></td>
                <td></td>
                <td>Végösszeg: </td>
                <td>{`${cartProducts?.reduce((sum, n) => sum + n.price * (cart[n.id]), 0)} Ft`}</td>
                <td><button className="red-btn" onClick={() => {
                  createOrder(orderData)
                    .then(res => {
                      updateOrder(res.name, { ...orderData, id: res.name })
                        .then(res => {
                          if (res) {
                            deleteCartProduct(userData.uid)  //Ide az uid mellé kell egy sikeres rendelés toast <3 //
                              .then(res => setCart({}))
                              toggleModal()
                          }
                        })
                    })
                }}>Megrendelés</button></td>
              </tr>
            </tbody>
          </table>

        </div>
        :
        <div className="empty-card">
          <img className="img-sad" src="/sad-emoji-girl-holds-yellow-emoticon-with-sad-face-isolated-gray-background-unhappy-emoji_101969-2152.jpg"></img>
          <h2>A kosarad üres!</h2>
          <Link className="blue-text" to="/termekek/AToZ/1">Vissza a termékekhez</Link>
        </div>
      }
      
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Sikeres megrendelés!</h2>
            <button className="red-btn close-modal" onClick={toggleModal}>
              x
            </button>
          </div>
        </div>
      
      )}
      
        
      </>
  )  

  
}