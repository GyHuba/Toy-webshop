import {readOrdersFirebase, updateOrderFirebase } from "../repos/order-repos"
import formatData from "../utilities/FormatData"
import { createOrderFirebase } from "../repos/order-repos"


export function readOrders(callbackFn) {
    return readOrdersFirebase()
        .then(json => {
            callbackFn(formatData(json))
            return formatData(json)
        })
}


export function createOrder(formData) {
    return (
        createOrderFirebase(formData)
            .then(res => {
                 return(res)
            })
            
    )
}


export function updateOrder(id, formData, callbackFn) {
    return updateOrderFirebase(id, formData)
        .then(data =>{
            callbackFn?.(data)
            console.log(data)
            return data
        } )
}
