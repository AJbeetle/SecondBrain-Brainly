// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { FaPlus } from "react-icons/fa6";
import { MdOutlineShare } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
 
import ShareIcon from "./components/icons/share"

import {Button} from "./components/ui/button"
import {Card} from "./components/ui/card"
import SideBar from "./components/ui/sideBar"

import {useState} from "react"
import { ModalAddContent, ModalShareBrain } from './components/ui/modal';



function App() {
  const [sideBar, setSideBar] = useState(true); 
      
  // function sideBarFunc(){
  //     console.log("toggling sideBar")
  //     setToggleSideBar(t=>!t);   
  // }

  function DoConsole(){
    console.log("Button Pressed")
  }

  function sideBarOn(){
    setSideBar(true);
  }

  const view = sideBar ? "w-0 overflow-hidden p-0 text-white" : "p-2 w-fit bg-blue-secondary active:scale-95 rounded-lg text-blue-primary shadow-lg" 
  const positioningMain = sideBar ? "w-full md:w-[80%] sm:w-[100%] " : "w-full md:w-[100%] "

  return (
    <div> 
      
    <SideBar sideBar={sideBar} setSideBar={setSideBar}></SideBar>

    

    {/* <div className={`flex flex-col p-10 gap-4 bg-gray-bg_main justify-center w-full w-[80%] absolute right-0 transition-all duration-1000`} >   */}
    <div className={`flex flex-col p-10 gap-4 bg-gray-bg_main justify-center ${positioningMain} md:absolute md:right-0 transition-all duration-1000`} >  
    {/* <div className={`flex flex-col p-10 gap-4 bg-gray-bg_main justify-center transition-all duration-100`} > */}

       <button className={` ${view} transition-all duration-100 `} onClick={sideBarOn}> 
        <GiHamburgerMenu />
      </button> 
       {/* <button className={`p-2 w-fit bg-blue-secondary text-black-primary active:scale-95 rounded-lg transition-all duration-100 `} onClick={sideBarOn}> 
        <GiHamburgerMenu />
      </button>  */}



      {/* Checking of Button Component */}

      <h1> Checking Button Component</h1>

      <Button variant={`secondary`} text={`Submit`} onClick={DoConsole} size={`sm`} extras={`shadow-xl`} icon={<FaPlus />} ></Button>
      <Button variant={`primary`} text={`Share`} onClick={DoConsole} icon={<MdOutlineShare />} size={`sm`} extras={"shadow-xl"}></Button>

      <hr/>
      <Button variant={`primary`} text={`Share`} onClick={DoConsole} icon={<ShareIcon size={"sm"}/>} size={`sm`} extras={"shadow-xl"}></Button>
      <Button variant={`primary`} text={`Share`} onClick={DoConsole} icon={<ShareIcon size={"md"}/>} size={`md`} extras={"shadow-xl"}></Button>
      <Button variant={`primary`} text={`Share`} onClick={DoConsole} icon={<ShareIcon size={"lg"}/>} size={`lg`} extras={"shadow-xl"}></Button>

      <hr/>

      <Button variant={"secondary"} text={`share`} onClick={DoConsole} icon={<ShareIcon size={`sm`}/>} size={`sm`} />
      <Button variant={"secondary"} text={`share`} onClick={DoConsole} icon={<ShareIcon size={`md`}/>} size={`md`} />
      <Button variant={"secondary"} text={`share`} onClick={DoConsole} icon={<ShareIcon size={`lg`}/>} size={`lg`} />

      <hr/>
      <hr/>
      <h1>Checking Modal Component</h1>

      <ModalAddContent heading={"Write heading"} description={"describe more.." } url={"add Link"}>
      </ModalAddContent>

      <ModalShareBrain></ModalShareBrain>

      <hr/>
      <hr/>
      <hr/>

      <h1>Checking Card Component</h1>

      <div className="flex gap-6 p-4 flex-wrap justify-center ">
        <Card heading={"React Basics"} url={"www.google.com"} tags={["education", "CompScience","Career"]} timestamp={new Date()} description={"This is basic for React and all imp things to revise"} linkTypeIcon={'link'}> 
        <img src="/vite.svg"></img>
      </Card>
        <Card heading={"React Basics"} url={"www.google.com"} tags={["education",]} timestamp={new Date()} description={"This is basic for React and all imp things to revise"} linkTypeIcon={'video'}> 
        <img src="/vite.svg"></img>
      </Card>
        <Card heading={"React Basics"} url={"www.google.com"} tags={["education",]} timestamp={new Date()} description={"This is basic for React and all imp things to revise"} linkTypeIcon={'twitter'}> 
        <img src="/vite.svg"></img>
      </Card>
        <Card heading={"React Basics"} url={"www.google.com"} tags={["education",]} timestamp={new Date()} description={"This is basic for React and all imp things to revise"} linkTypeIcon={'instagram'}> 
        <img src="/vite.svg"></img>
      </Card>
        <Card heading={"React Basics"} url={"www.google.com"} tags={["education",]} timestamp={new Date()} description={`This is basic for React and all imp things to revise.
          1. Hey you
          2. What you
          3. lala
          `} linkTypeIcon={'pdf'}> 
        <img src="/vite.svg"></img>
      </Card>
        
      </div>

      

      


    </div>
    </div>
  )
}

export default App
