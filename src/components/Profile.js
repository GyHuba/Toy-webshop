import { useContext } from "react";
import { userContext } from "../contexts/userContext";

export default function Profile(){
    const {userData, setUserData} = useContext(userContext)

    return(
        <>
            <div className="card">
                <h2>Vásárlói adatok</h2>
                <div className="card-content">
                    <p>Név: {userData?.name}</p>
                    <p>Email: {userData?.email}</p>
                </div>
            </div>
        </>
    )
}