import React, {useEffect} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export default function LogOut() {
    useEffect(() => {
        axios.post('/auth/logout/', {"refresh": localStorage.getItem("refresh")}).then(res => {
            toast.success("Logged out successfully.");
        }).catch(err => {
            toast.error("Logged out successfully.");
        })
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = '/signin';
    });
    return (<React.Fragment/>);
}