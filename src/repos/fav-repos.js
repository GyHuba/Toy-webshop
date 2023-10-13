import { USERS_URL } from "../constants/url";

export function addToFavouritesFirebase(product, userID){
    return fetch(`${USERS_URL}/${userID}/favourites.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    })
}

export function readUserFavouritesFirebase(userID){
    return fetch(`${USERS_URL}/${userID}/favourites.json`)
        .then(res => res.json())
}

export function deleteFavouriteFirebase(userID, productID){
    return fetch(`${USERS_URL}/${userID}/favourites/${productID}.json`, {
        method: "DELETE",
    })
}