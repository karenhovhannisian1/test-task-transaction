import React from "react";
import API from "../api";
import {useStateValue} from "../context";
import {getUserSuccess} from "../context/actions";

export function useAuth() {
    const [{}, dispatch] = useStateValue();

    async function getUserInfo() {
        try {
           const {data} = await API.getUserInfo();
           dispatch(getUserSuccess(data.user_info_token))
        } catch (e) {
            console.log(e)
        }
    }

    return {
        getUserInfo
    }
}
