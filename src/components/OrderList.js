import { useEffect, useState } from "react";
import { readOrders } from "../services/order-service";
import { readMultipleUserData, readUserData } from "../services/authentication-services";
import "../css/global.css"

export default function OrderList() {

    const [orderList, setOrderList] = useState([]);
    const [userNames, setUserNames] = useState([]);



    useEffect(() => {
        readOrders(setOrderList)
        readMultipleUserData(setUserNames)
    }, [])

    // console.log(orderList)
    // console.log(userNames)
    return (

        <table className="zebra-table">
            <thead>
                <tr>
                    <th>Megrendelés ID </th>
                    <th>Vásárló ID </th>
                    <th>Vásárló név </th>
                    <th>Megrendelés tartalma </th>
                </tr>
            </thead>
            <tbody>
                {orderList.length !== 0 && orderList.map((order) =>(
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.uid}</td>
                        <td>{userNames?.find(userName => userName.uid === order.uid)?.name}</td>
                        <td>{Object.keys(order.products)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}