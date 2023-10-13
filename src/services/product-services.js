import { createProductFirebase, deleteProductFirebase, readOneProductFirebase, readProductFirebase, updateProductFirebase } from "../repos/product-repos"
import filterByTitle from "../utilities/FilterByTitle"
import formatData from "../utilities/FormatData"
import sortPrice from "../utilities/SortPrice"
import sortAndFilterProduct from "../utilities/SortAndFilterProduct"
import { json } from "react-router-dom"

export function createProduct(formData, callbackFn) {
    return (
        createProductFirebase(formData)
            .then(res => {
                callbackFn?.(res)
                return res
            })
    )
}

export function readProduct(callbackFn) {
    return readProductFirebase()
        .then(json => {
            callbackFn?.(formatData(json))
            return formatData(json)
        })
}

export function readOneProduct(id, callbackFn, type) {
    if (type !== "cart") {
        return readOneProductFirebase(id)
            .then(json => {
                callbackFn?.(json)
                return json
            })
    }
    if (type === "cart") {
        return readOneProductFirebase(id)
            .then(json => {
                callbackFn(prev => [...prev, json])
                return json
            })
    }
}

export function readFilteredProductByTitle(searchTerm, callbackFn) {
    return readProductFirebase()
        .then(json => callbackFn?.(filterByTitle(formatData(json), searchTerm)))
}

export function readSortedProduct(category, sortType, searchTerm, callbackFn) {
    return readProductFirebase()
        .then(json => callbackFn?.(sortAndFilterProduct(formatData(json), category, sortType, searchTerm)))
}

export function readSortedPrice(sortType, callbackFn) {
    return readProductFirebase()
        .then(json => callbackFn?.(sortPrice(formatData(json), sortType)))
}

export function updateProduct(id, formData, callbackFn) {
    return updateProductFirebase(id, formData)
        .then(data =>{
            callbackFn?.(data)
            return data
        } )
}

export function deleteProduct(id, callbackFn) {
    return deleteProductFirebase(id)
        .then(res => callbackFn?.(res))
}