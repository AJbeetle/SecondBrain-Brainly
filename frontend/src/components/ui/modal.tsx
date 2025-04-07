import {useRef, useState} from "react"
import {Button} from "./button"
import { LuCopy } from "react-icons/lu";
import { MdOutlineShare } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { MdAdd } from "react-icons/md";

// brought from backend ----------------------------------------------
/* type requiredObject = {
    title : string,
    link : string,
    type : string,
    tags : string[]
} */
// ----------------------------------------------

// type linkTypeIcon = "pdf" | "video" | "twitter" | "instagram" | "link"


// give placeholders for input boxes in props
interface AddContentPlaceholders {
    heading : string;
    description? : string;
    url : string;
    // linkType : linkTypeIcon;
    // tags : string[]; 
}



export const ModalAddContent = (props:AddContentPlaceholders) =>{


    const linkType = ["pdf","video","twitter","instagram","link"];

    const contentOfDialog = [
        {name:"Heading", placeholder:props.heading},
        {name:"Description", placeholder:props.description},
        {name:"URL", placeholder:props.url},
        {name:"Link Type", placeholder:linkType},
        {name:"Tags", placeholder:"Add tags.. SEPERATED BY COMMAS"},

    ]

    const dialog = useRef<HTMLDialogElement>(null);
    const [dialogStatus, setDialogStatus] = useState(false);
    const refArray = useRef(Array(5).fill(0));
    
    // console.log(refArray)

    function closeModel(){
        // @ts-ignore
        dialog.current.close();
        setDialogStatus(false);
    }

    function submitModel(){
        // @ts-ignore
        dialog.current.close();
        setDialogStatus(false);
        // logic for submitting it to backend and showing updates in frontend ---------------
        
        //logic for clearing inputs after saved to backend :-

        refArray.current.forEach((e,index)=>{
            console.log(e.current)
            // e.current.value=""
            if(e.current.tagName=="INPUT" || e.current.tagName=="TEXTAREA"){
                if(index==2){
                    e.current.value="https://"
                }
                else{
                    e.current.value=""
                }
            }
            else{
                e.current.value = e.current.options[0].value || ""
            }

        })



    }

    function clearAllInModel(){
        refArray.current.forEach((e,index)=>{
            console.log(e.current)
            // e.current.value=""
            if(e.current.tagName=="INPUT" || e.current.tagName=="TEXTAREA"){
                if(index==2){
                    e.current.value="https://"
                }
                else{
                    e.current.value=""
                }
            }
            else{
                e.current.value = e.current.options[0].value || ""
            }

        })
    }

    {dialogStatus ? dialog.current?.showModal() : dialog.current?.close()}

    return (
        <div className="">

            <Button variant={`primary`} text={`Add Content`} size={`sm`} icon={<MdAdd />} onClick={()=>setDialogStatus(true)} ></Button>

            <dialog ref={dialog} className="rounded-lg py-6 px-4 w-[70%] h-[70%] border border-solid border-gray-300"> 
                <div className="flex flex-col min-h-fit h-full justify-between pb-6 gap-14">    
                    <div className="flex flex-col gap-6 w-full md:p-4 lg:text-lg text-sm">
                    {
                        contentOfDialog.map((e,index)=>{
                            refArray.current[index] = useRef(null);
                            if(index==3){
                                return <div className = "flex w-[100%] rounded-lg items-center justify-between md:flex-row flex-col ">
                                    <p className="md:w-[15%]">Type of Link</p>
                                    <p className="md:flex hidden">:</p>
                                    <select ref={refArray.current[index]} className="w-[80%] p-2 rounded-lg hover:cursor-pointer bg-gray-200 text-gray-700" defaultValue={"none"}>
                                        <option value={"choose link type"}>--Type of Link</option>
                                        {
                                            linkType.map((e,index)=>{
                                                return <option key={index} value={e}>
                                                    {e}
                                                </option>
                                            })
                                        }
                                    </select>
                                </div>
                            }
                            else if(index==1){
                                return <div key={index} className="flex justify-between items-center md:flex-row flex-col" >
                                <p className="md:w-[15%]">{e.name}</p> 
                                <p className="md:flex hidden">:</p>
                                <textarea ref={refArray.current[index]} className={"bg-gray-200 px-2 py-1 rounded-lg text-black-primary outline-none w-[80%]"} placeholder={e.placeholder as string} ></textarea>
                            </div>
                            }
                            return <div key={index} className="flex justify-between md:flex-row flex-col items-center" >
                                <p className="md:w-[15%]">{e.name}</p>
                                <p className="md:flex hidden">:</p>
                                <input ref={refArray.current[index]} className={"bg-gray-200 px-2 py-1 rounded-lg text-black-primary outline-none w-[80%]"}  defaultValue={index==2?"https://":""} type="text" placeholder={e.placeholder as string} ></input>
                            </div>
                        })
                    }
                    </div>
                    <div className={"flex justify-around w-full flex-wrap gap-4 "}>
                        <Button variant={`primary`} size={"sm"} text={"Close"} onClick={closeModel}></Button>
                        <Button variant={`primary`} size={"sm"} text={"Submit"} onClick={submitModel}></Button>
                        <Button variant={`primary`} size={"sm"} text={"ClearAll"} onClick={clearAllInModel}></Button>
                        
                    </div>
                </div>
            </dialog>
        </div>
    )
}


export const ModalShareBrain = () => {
    const [dialogStatus, setDialogStatus] = useState(false);
    const dialog = useRef<HTMLDialogElement>(null);


    function shareBrain(){
        console.log("COPIED YOUR BRAIN ID")
        alert("Copied Your Brain Link !")
    }

    function cancelShare(){
        //write here logic for disposing shareLink if any generated

        setDialogStatus(false);
        alert("share Link access removed.")
    }

    function closeShareModal(){
        setDialogStatus(false);
    }
    {dialogStatus ? dialog.current?.showModal() : dialog.current?.close()}

    return (
        <div >
            <Button variant={`secondary`} text={`Share Brain`} icon={<MdOutlineShare />} size={`sm`} onClick={()=>setDialogStatus(true)} ></Button>

            <dialog ref={dialog} className="px-6 py-4  lg:w-[30%] sm:w-[50%] w-[70%] rounded-lg border border-solid border-gray-300">
                <div className="flex flex-col items-start">
                    <div className="mb-6 flex justify-between items-center w-full">
                        <p className="lg:text-xl md:text-lg text-base font-semibold ">Share your Second Brain</p>
                        <RxCross2 className="active:scale-90 text-gray-600 hover:cursor-pointer" onClick={closeShareModal}/>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm md:text-base text-justify">Share your entire collection of notes, documents, tweets, and videos with others. They'll be able to import your content into their own Second Brain.</p>
                    <div className="flex gap-4 justify-center w-full mobileS:flex-wrap shareUp:flex-nowrap">
                        <Button text={"Share Brain"} icon={<LuCopy />} size={`sm`} variant={`primary`} onClick={shareBrain} extras={`w-full`} ></Button>
                        <Button text={"Revoke All Links"} icon={<MdCancel />} size={`sm`} variant={"secondary"} onClick={cancelShare} extras={"w-full"}></Button>
                    </div>
                    <p className="text-xs text-gray-400 mt-4 font-semibold w-full flex justify-center">3 items will be shared</p>
                </div>

            </dialog>
        </div>
    )
}