import { addToCartFirebase, deleteCartProductFirebase } from "../repos/cart-repos"
import { deleteOneCartItemFirebase } from "../repos/cart-repos"

export default function AddToCartService(formData, userID, callbackFn) {
    return (
        addToCartFirebase(formData, userID)
            .then(res => callbackFn?.(res))
    )
}

/* export function readUserCart(userID) {
    
        return readUserCartFirebase(userID)
        
    } */
   /*  return readUserCartFirebase(userID)
        .then(json => {
            const array = Object.keys(json).map(product => {
               return readOneProduct(product, callbackFn, "cart")
            })
        }) 
} */


 export function deleteCartProduct(userID, callbackFn) {
    return deleteCartProductFirebase(userID)
    .then(res => callbackFn?.(res))
} 

export function deleteOneCartItem(uid,id, callbackFn) {
    return deleteOneCartItemFirebase(uid,id)
        .then(res => callbackFn?.(res))
}
