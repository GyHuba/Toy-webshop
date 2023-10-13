import { USERS_URL } from "../constants/url";


export function createUserFirebase(formData,userID) {
    return fetch(`${USERS_URL}/${userID}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
}

export function readUserFirebase(uid) {
    return fetch(`${USERS_URL}/${uid}.json`)
        .then(res => res.json())
}

export function readMultipleUserFirebase() {
    return fetch(`${USERS_URL}.json`)
        .then(res => res.json())
}