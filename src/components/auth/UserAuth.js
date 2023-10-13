import { useContext } from "react";
import { userContext } from "../../contexts/userContext";
import LoginNeeded from "../../pages/LoginNeeded";

export default function UserAuth(props){
    const {userData, setUserData} = useContext(userContext)

    if(userData) return props.children
    else return <LoginNeeded/>
}