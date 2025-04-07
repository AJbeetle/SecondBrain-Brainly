//  -------------------------------------------------------------------------------------------
// THE MAIN APP SHOULD HAVE FOLLOWING CONFIGS TO USE SIDEBAR PROPERLY
//  -------------------------------------------------------------------------------------------
/* 
import {useState} from "react"
import SideBar from "./components/ui/sideBar"
import { GiHamburgerMenu } from "react-icons/gi";


function App(){
    const [sideBar, setSideBar] = useState(true); 

    function sideBarOn(){
        setSideBar(true);
    }

    const view = sideBar ? "w-0 overflow-hidden p-0 text-white" : "p-2 w-fit bg-blue-secondary active:scale-95 rounded-lg text-blue-primary shadow-lg" 
    const positioningMain = sideBar ? "w-full md:w-[80%] sm:w-[100%] " : "w-full md:w-[100%] "
    
    return (
        <div>
            <SideBar sideBar={sideBar} setSideBar={setSideBar}></SideBar>

            <div className={`flex flex-col p-10 gap-4 bg-gray-bg_main items-start ${positioningMain} md:absolute md:right-0 transition-all duration-1000 h-full`}>

                <button className={` ${view} transition-all duration-100 `} onClick={sideBarOn}> 
                    <GiHamburgerMenu />
                </button> 

                <h1> Hey World</h1>

            </div>

        </div>
    )
}


export default App */