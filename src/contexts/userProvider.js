import { useEffect, useState } from "react";
import { userContext } from "./userContext";
import formatData from "../utilities/FormatData";
import { USERS_URL } from "../constants/url";

export default function UserProvider(props) {
    const [userData, setUserData] = useState(null)
    const [allUsers, setAllUsers] = useState([])

    const getAllUsers = () => {
        fetch(`${USERS_URL}/.json`).then(resp => resp.json()).then(data => setAllUsers(formatData(data)))
    }

    return (
        <userContext.Provider value={{ userData, setUserData, allUsers, getAllUsers }} >
            {props.children}
        </userContext.Provider>
    )
}

