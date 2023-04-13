import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServerAPI } from "../API/ServerAPI";

export default function AuthUser() {
    const navigate = useNavigate();
    const getToken = () => {
        const tokenString = localStorage.getItem("access");
        const userToken = JSON.parse(tokenString);
        return userToken;
    };
    const getUserInfo = () => {
        const userInfoString = localStorage.getItem("user_info");
        const user_info = JSON.parse(userInfoString);
        return user_info;
    };
    const [token, setToken] = useState(getToken());
    const [userInfo, setUserInfo] = useState(getUserInfo());
    const saveToken = (access, userInfo) => {
        localStorage.setItem("access", JSON.stringify(access));
        localStorage.setItem("user_info", JSON.stringify(userInfo));
        setToken(token);
        setUserInfo(userInfo);
        navigate("/");
    };
    const logout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload()
    };
    const http = axios.create({
        baseURL: `${ServerAPI}/user`,
        method: "GET",
        headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem('access')}`
        },
    });
    return {
        setToken: saveToken,
        token,
        getToken,
        http,
        getUserInfo,
        userInfo,
        logout,

    };
}
