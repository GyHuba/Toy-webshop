import { useEffect} from "react";
import "../css/global.css"
import { deleteOneCartItem } from "../services/cart-service";

export default function CartItem({userData,amount,product,productID}){
  /*   if (!product) {return null}; */

    return(
        <tr key={product.id}>
          <td> </td>
          <td>{product.title} </td>
          <td>{amount}</td>
          <td>{`${product.price} Ft`}</td>
          <td><button className="red-btn" onClick={()=>{
            deleteOneCartItem(userData.uid, product.id) 
          }}>Törlés</button></td>
        </tr>
    )

    function decreaseAmount(item){
     /*    const idx = cartData.findIndex(product => product.id == item.id);
          const copy = {...cartData[idx], amount: setAmount(amount - 1) };
          setCartData([
              ...cartData.slice(0, idx),
              copy,
              ...cartData.slice(idx - 1)
          ]);
          if(amount<2){
            setAmount(1);
          } */
      }
  
      function addAmount(item){
       /*  const idx = cartData.findIndex(product => product.id == item.id);
        const copy = {...cartData[idx], amount: setAmount(amount + 1) };
        setCartData([
            ...cartData.slice(0, idx),
            copy,
            ...cartData.slice(idx + 1)
        ]);
   */
      }

      function deleteItem(id){

      }
}