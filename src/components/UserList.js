import { useContext, useEffect } from "react";
import { userContext } from "../contexts/userContext";
import "../css/global.css"

export default function UserList() {

    const { allUsers, getAllUsers } = useContext(userContext);
    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <table className="zebra-table">
            <thead>
                <tr>
                    <th>User ID </th>
                    <th>Name </th>
                    <th>Email </th>
                </tr>
            </thead>
            <tbody>
                {allUsers && allUsers.map((user) =>{
                    if(user.role === "admin") return;
                    else{
                    return(
                    <tr key={user.uid}>
                        <td>{user.uid}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                    </tr>)
                    }
                })}
            </tbody>
        </table>



    )
}