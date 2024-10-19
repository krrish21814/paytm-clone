import { AppBar } from "../components/AppBar"
import { Users } from "../components/Users"
import {Balance} from "../components/Balance"
import { useEffect, useState } from "react"
import axios from "axios";
export const Dashboard = ()=>{
  
    const [balance, setBalance] =useState();
    const [errorMessage, setErrorMessage] = useState();
    const name = localStorage.getItem("userName");

    useEffect(()=>{
        const fetchBalance = async()=>{
    try{ const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"), 
        },
       })
       setBalance(Math.round(response.data.balance));
    } catch (error) {
        if (error.response) {
            setErrorMessage(error.response.data.message);
        } else {
            setErrorMessage("Failed to fetch balance");
        }
    }
    };
    fetchBalance();
},[]);
    

    return<div>
        <AppBar name={name}></AppBar>
        {errorMessage && <div className="text-red-500">
            {errorMessage}
            </div>}
        <Balance value={balance}></Balance>
        <Users></Users>
    </div>
}