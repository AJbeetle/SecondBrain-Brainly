import {ReactNode, cloneElement} from "react"
import { MdOutlineShare } from "react-icons/md";
import { GrDocumentText } from "react-icons/gr";
import { AiOutlineYoutube } from "react-icons/ai";
import { RxTwitterLogo } from "react-icons/rx";
import { FaInstagram } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";

import { format } from 'date-fns';

type linkTypeIcon = "pdf" | "video" | "twitter" | "instagram" | "link"

const IconForLinks = {
    "pdf" : <GrDocumentText />,
    "video" : <AiOutlineYoutube />,
    "twitter" : <RxTwitterLogo />,
    "instagram" : <FaInstagram />,
    "link" : <FaLink />
}

interface cardInterface {
    heading : string;
    description? : string;
    url : string;
    children? : ReactNode;
    linkTypeIcon : linkTypeIcon;
    tags : string[];
    timestamp : Date;

}

export const Card = (props:cardInterface) => {
    return (
        <div className="bg-gray-sidebar rounded-lg border border-gray-200 border-solid py-6 px-6 w-fit flex flex-col justify-between">
            {/* first part of card component */}
            <div className="">
                <div className="flex justify-between items-center mb-4 gap-14">
                    <div className="flex items-center gap-2 text-xl">
                        {IconForLinks[props.linkTypeIcon] && cloneElement(IconForLinks[props.linkTypeIcon],
                            {
                                className : `${IconForLinks[props.linkTypeIcon].props.className || ""} text-gray-500` 
                            }
                        )}
                        {props.heading}
                    </div>
                    <div className="flex items-center gap-2 text-xl">
                        <button className="active:scale-90">
                            <MdOutlineShare className="text-gray-500 font-bold"/>
                        </button>
                        <button className="active:scale-90">
                            <RiDeleteBinLine className="text-gray-500 font-bold" />  
                        </button>
                    </div>
                </div>
                <div className="flex flex-col mb-2">
                    <div className="w-full text-md mb-2" style={{whiteSpace:"pre-line"}}>
                            {props.description}
                    </div>
                    <div className="w-full h-full min-h-28  border border-solid border-gray-300 py-4 px-2 rounded-lg bg-gray-200 flex justify-center items-center hover:cursor-pointer active:scale-95">
                        {props.children}
                    </div>
                </div>
            </div>

            {/* Second part of card component */}
            <div className="">
                <div className="flex gap-2 mb-4 flex-wrap">
                    {
                        props.tags.map((e,index)=>{
                        return <div key={index} className="w-fit py-1 px-2 bg-blue-secondary text-blue-primary rounded-lg text-xs">
                            {e}
                        </div>
                        })
                    }
                </div>
                <div className="text-gray-600 px-1 text-xs">
                    {/* Added on {props.timestamp.toLocaleString()} */}
                    Added on {format(props.timestamp, 'MM/dd/yyyy')}
                </div>
            </div>
            
        </div>
    )
}