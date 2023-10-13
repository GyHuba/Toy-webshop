import { USERS_URL } from "../constants/url";


export function addToCartFirebase(formData, userID) {
    return fetch(`${USERS_URL}/${userID}/cart.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
}

export function readUserCartFirebase(userID) {
    return fetch(`${USERS_URL}/${userID}/cart.json`)
        .then(res => res.json())
}


export function deleteCartProductFirebase(userID) {
    return fetch(`${USERS_URL}/${userID}/cart.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
    })
        .then(res => res.json())
}


export function deleteOneCartItemFirebase(uid,id) {
    return fetch(`${USERS_URL}/${uid}/cart/${id}.json`, {
        method: "DELETE",
    })
}
