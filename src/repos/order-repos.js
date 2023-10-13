import { ORDER_URL } from "../constants/url";


export function readOrdersFirebase() {
    return fetch(`${ORDER_URL}.json`)
        .then(res => res.json())
}

export function createOrderFirebase(formData) {
    return fetch(`${ORDER_URL}.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
}

export function updateOrderFirebase(id, formData) {
    return fetch(`${ORDER_URL}/${id}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
        .then(res => res.json())
}