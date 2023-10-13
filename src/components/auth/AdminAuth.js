import { useContext } from "react";
import { userContext } from "../../contexts/userContext";
import { Navigate } from "react-router-dom";

export default function AdminAuth(props){
    const {userData, setUserData} = useContext(userContext)

    if(userData?.role === "admin") return props.children
    else return <Navigate to="/" />   
}