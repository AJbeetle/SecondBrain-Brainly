
import { RxTwitterLogo } from "react-icons/rx";
import { AiOutlineYoutube } from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";
import { FaLink } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { PiHashBold } from "react-icons/pi";
import { LuBrain } from "react-icons/lu";
import {useState, useEffect} from "react"
import {Dispatch } from "react"
// import { IoEllipseSharp } from "react-icons/io5";

import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";


const navElements = [
    {icon:<RxTwitterLogo />, name:"Tweets",url:"#"},
    {icon:<AiOutlineYoutube />, name:"Videos",url:"#"},
    {icon:<GrDocumentText />, name:"Documents",url:"#"},
    {icon:<FaInstagram />,name:"Instagram",url:"#"},
    {icon:<FaLink />,name:"Links",url:"#"},
    {icon:<PiHashBold />,name:"Tags",url:"#"},
]

interface sideBarProps {
    sideBar : boolean;
    setSideBar : Dispatch<React.SetStateAction<boolean>>;

}

export default function SideBar(props:sideBarProps){
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(()=>{
        //effect to start one eventListener to check the window size

        // function to update window width on resize
        function handleResize(){
            if(window.innerWidth<=768){
                setSideBar(false)
            }else{
                setSideBar(true)
            }
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize",handleResize);

        return ()=>{
            window.removeEventListener("resize",handleResize);
        }


    },[])

    let sideBar = props.sideBar
    let setSideBar = props.setSideBar
    // const [toggleSideBar, setToggleSideBar] = useState(true); 
    
    function sideBarFunc(){
        console.log("toggling sideBar")
        setSideBar(false);   
    }

    // const [toggle, setToggle] = useState("");

    // if(!toggleSideBar) setToggle("-translate--[20%]");
    // else setToggle("")

    const pos = sideBar || windowWidth>768 ? "translate-x-[0%] " : "-translate-x-[100%] "

    return (
        // <div className={`fixed top-0 transition-all duration-1000 w-[0%] overflow-hidden lg:flex lg:w-[20%] bg-gray-bg_sidebar h-full border border-solid border-r-gray-300 shadow-lg xl:p-6 p-4 flex flex-col gap-4 ${pos} `}>
        <div className={`fixed top-0 transition-all duration-1000 w-60 md:w-[20%] bg-gray-bg_sidebar h-full border border-solid border-r-gray-300 shadow-lg xl:p-6 p-4 flex flex-col gap-4 ${pos} `}>
            <div className="flex justify-between items-center p-2 gap-2">
                {/* Branding */}
                <div className="text-blue-primary flex gap-4 justify-center items-center ">
                    <LuBrain className="md:text-2xl xl:text-4xl text-2xl"/>
                    <p className="font-bold text-black-primary lg:text-sm xl:text-lg ">Second Brain</p>
                </div>
                <button className="md:text-sm xl:text-xl active:scale-95 flex items-center bg-blue-secondary p-1 rounded-lg text-blue-primary shadow-lg" onClick={sideBarFunc}>
                    <TbLayoutSidebarLeftCollapse />
                </button>    

            </div>

            <div className="flex flex-col gap-4 ">
                {
                    navElements.map((e,index)=>{
                        return (
                            <button key={index} className="flex items-center gap-4 hover:bg-gray-200 py-2 px-4 rounded-sm text-gray-700 tabletBottom:text-xs tabletUp:text-base">
                                {e.icon} 
                                {e.name} 
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )

}



