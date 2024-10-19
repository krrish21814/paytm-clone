export function AppBar({name}){
    return <div className="flex justify-between h-12 shadow-md">
                 <div className="flex flex-col justify-center h-full ml-4 text-lg font-semibold">
                      Paytm App
                 </div>
             <div className="flex items-center">
                <div className="flex flex-col justify-center mr-3 text-lg ">
                     Hello
                </div>
                 <div className="rounded-full flex justify-center h-10 w-10 items-center bg-slate-300 mt-1 mr-2">
                     <div className=" text-xl text-gray-900">
                     {name ? name[0].toUpperCase() : "U"} 
                      </div>
                 </div>
        
                </div>
          </div>

}