import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter,setFilter] = useState("");
    const currentemail = decodeURIComponent(localStorage.getItem("userName")); 
   
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+ filter)
            .then (response =>{
                const filteredUsers = response.data.user.filter(user => user.username !== currentemail);
                setUsers(filteredUsers)
            })
    },[filter])
    
    return <>
    <div className="font-bold ml-2 mt-6 text-lg">
        Users
    </div>
    <div className="my-2">
        <input onChange={(e)=>{
            setFilter(e.target.value)
        }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded shadow-md border-slate-200"></input>
    </div>
    <div>
        {users.map(user =><User user={user}></User>)}
    </div>
    </>

}

function User({user}){

        const navigate = useNavigate();
    return <div className="flex justify-between items-center">
                <div className="flex items-center"> 

                <div className="bg-slate-300 h-10 w-10 items-center rounded-full flex justify-center">
                    <div className="text-lg">
                    {user.firstName[0].toUpperCase()}
                    </div>
                </div>
            
                <div className="text-lg ml-2">
                    {user.firstName} {user.lastName}
                </div>
                </div>

                <div className="mr-2">
                    <Button onClick={(e) =>{
                        navigate("/send?id="+ user._id + "&name="+ user.firstName)
                    }} label={"Send Money"}></Button>
                </div>  
        </div>
}