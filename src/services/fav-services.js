import { addToFavouritesFirebase, deleteFavouriteFirebase, readUserFavouritesFirebase } from "../repos/fav-repos";

export function addToFavourites(product, userID){
    return(
        addToFavouritesFirebase(product, userID)
            .then(res => {return res})
    )
}

export function readUserFavourites(userID, callbackFn){
    return(
        readUserFavouritesFirebase(userID)
            .then(res => {
                callbackFn?.(res)
                return res
            })
    )
}

export function deleteFavourite(userID, productID){
    return(
        deleteFavouriteFirebase(userID, productID)
    )
}