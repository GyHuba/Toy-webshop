import { PRODUCTS_URL } from "../constants/url"

export function createProductFirebase(formData) {
    return fetch(`${PRODUCTS_URL}.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
}

export function readProductFirebase() {
    return fetch(`${PRODUCTS_URL}.json`)
        .then(res => res.json())
}

export function readOneProductFirebase(id) {
    return fetch(`${PRODUCTS_URL}/${id}.json`)
        .then(res => res.json())
}

export function updateProductFirebase(id, formData) {
    return fetch(`${PRODUCTS_URL}/${id}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
        .then(res => res.json())
}

export function deleteProductFirebase(id) {
    return fetch(`${PRODUCTS_URL}/${id}.json`, {
        method: "DELETE",
    })
}
