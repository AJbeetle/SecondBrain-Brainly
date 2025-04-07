import { FaSearch } from "react-icons/fa";
import {Button} from "./button"

interface searchCompInterface {
    placeholder :string
}
function SearchComp(props:searchCompInterface){
    return (
        <div className="flex items-center justify-center gap-2 w-full mobileM:flex-row flex-col">
            {/* <FaSearch className="text-gray-600 " /> */}
            <FaSearch className="text-blue-primary mobileM:flex hidden"  />
            <p className="mobileM:flex hidden">:</p>
            <input type="search" className="bg-gray-100 px-4 py-2 rounded-lg w-full outline-none border border-solid border-gray-400" placeholder={`${props.placeholder}`}></input>
            <Button text={"search"} size={'sm'} variant={'primary'} onClick={()=>console.log("Searching..")}></Button>
        </div>
    )
}

export default SearchComp