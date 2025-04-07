import {useState} from "react"
import SideBar from "./components/ui/sideBar"
import { GiHamburgerMenu } from "react-icons/gi";


import {ModalAddContent, ModalShareBrain} from "./components/ui/modal"

import {Card} from "./components/ui/card"
import SearchComp from "./components/ui/search"


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

                {/* <h1> Hey World</h1> */}
                <div className="flex justify-between w-full mb-10 flex-wrap items-start gap-4 md:flex-row flex-col ">
                    <div className="text-3xl font-bold md:text-left text-center  md:w-fit w-full">
                        <p className="">
                            All Notes
                        </p>
                    </div>
                    <div className={"flex gap-4 flex-wrap-reverse flex-1 justify-end items-center md:flex-row flex-col md:w-fit w-full"}>
                        <div className="flex justify-end w-fit ">
                            <SearchComp placeholder={"query your links !!"}></SearchComp>
                        </div>
                        <div className="flex justify-center items-center gap-4 mobileS:flex-row flex-col">
                            <ModalShareBrain></ModalShareBrain>
                            <ModalAddContent heading={`Add Heading`} description={"Describe your data"} url={"add Link"}></ModalAddContent>

                        </div>
                    </div>
                </div>

                <div className="flex gap-4 flex-wrap">
                    <Card heading={'Learning LLM doing a little more and what i donot know what'} description={"OpenAIs Model"} url={`www.google.com`} tags={["AI","ML","NLP","LLM"]} timestamp={new Date()} linkTypeIcon={"link"}>
                        <img src="./vite.svg"></img>
                    </Card>
                    <Card heading={'Learning LLM'} description={"OpenAIs Model"} url={`www.google.com`} tags={["AI","ML","NLP","LLM"]} timestamp={new Date()} linkTypeIcon={"instagram"}>
                        <img src="./vite.svg"></img>
                    </Card>
                    <Card heading={'Learning LLM'} description={"OpenAIs Model"} url={`www.google.com`} tags={["AI","ML","NLP","LLM"]} timestamp={new Date()} linkTypeIcon={"pdf"}>
                        <img src="./vite.svg"></img>
                    </Card>
                    <Card heading={'Learning LLM'} description={"OpenAIs Model"} url={`www.google.com`} tags={["AI","ML","NLP","LLM"]} timestamp={new Date()} linkTypeIcon={"twitter"}>
                        <img src="./vite.svg"></img>
                    </Card>
                </div>

            </div>

        </div>
    )
}


export default App