
import { Heading } from "./Heading";
import { InputBox } from "./InputBox";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


export function SendCash({}){

    const [searchParms] =useSearchParams();
    const id = searchParms.get("id");
    const name = searchParms.get("name");
    const [amount,setAmount] = useState(0);
    const [errorMessage,setErrorMessage] = useState();
    const [successMessage,setSuccessMessage] = useState();
    return <>
    <div className="bg-slate-200 h-screen flex justify-center items-center ">
        <div className="rounded-lg bg-white w-[500px] h-max p-10 text-center shadow-lg" >
            <div className="mb-8">
                <div>
                    <Link to={"/dashboard"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    </Link>
                </div>
            <Heading label={"Send Money"}></Heading>
            </div>
            <div className="flex items-center mb-4">
                 <div className="bg-green-500 h-10 w-10 items-center rounded-full flex justify-center">
                    <div className="text-lg text-white">
                    {name[0].toUpperCase()}
                    </div>
                </div>
                        <div className="ml-2  text-xl font-semibold">
                            {name}
                        </div>
            </div>
            <div >
            <InputBox onChange={(e)=>{
                setErrorMessage("")
                setSuccessMessage("")
                setAmount(e.target.value);

            }} label={"Amount (in Rs)"} placeholder={"Enter amount"}></InputBox>
            </div>
             <button onClick={async()=>{
              try{ const response = await axios.post("http://localhost:3000/api/v1/account/transfer",{
                    to: id,
                    amount: amount
                },{
                    headers:{
                        Authorization: "Bearer "+ localStorage.getItem("token")
                    }
                }
            )
            setSuccessMessage(response.data.message)
        }catch(error){
                    if(error.response){
                        setErrorMessage(error.response.data.message)
                    }else{
                        setErrorMessage("Transaction failed")
                    }
                }

             }} className=" w-full mt-3 text-white bg-green-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                 Initiate Transfer
            </button>
            <div className="text-lg text-left text-green-500">
                     {successMessage}
                </div>
            <div className="flex ">
        {errorMessage && (
            <>
                 <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                </div>
                <div className="ml-1">
                        {errorMessage}
                </div>
              
                </>
        )}
       
        </div>
        </div>
   </div>
    </>
}