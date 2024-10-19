import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export const Signin = ()=>{
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [errorMessage,setErrorMessage] = useState();
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-96 h-max p-9 text-center">
        <Heading label={"Signin"}></Heading>
        <SubHeading label={"Enter your credentials to access your account"}></SubHeading>
        <InputBox onChange={(e)=>{
            setEmail(e.target.value)
        }} label={"Email"} placeholder={"john@gmail.com"}></InputBox>
        <InputBox onChange={(e)=>{
            setPassword(e.target.value)
        }} label={"Password"} placeholder={""}></InputBox>
        <Button onClick={async(e)=>{
         try{
          const response= await axios.post("http://localhost:3000/api/v1/user/signin",{
                username: email,
                password
            })
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("userName",encodeURIComponent(email) );
            navigate("/dashboard");
            
            }catch(error){
                if(error.response){
                    setErrorMessage(error.response.data.message);
                }else{
                    setErrorMessage("Please try again")
                }
            }

           

        }} label={"Sign In"}></Button>
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
        <BottomWarning label={"Dont have an account?"} buttonText={"Sign Up"} to={"/signup"}></BottomWarning>
        </div>
        </div>
    </div>
}