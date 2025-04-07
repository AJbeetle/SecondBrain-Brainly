// import { ReactElement, cloneElement} from "react"

type Variants = "primary" | "secondary" | "random" 
type Sizes = "lg" | "sm" | "md"

export interface ButtonProps{
    variant : Variants,
    icon? : any,    //it can be a react icon component too
    // icon : ReactElement<any,string | React.JSXElementConstructor<any>>,    //it sould be somethign like this, try to find what it is supposed to be
    text : string,
    onClick : ()=>void,
    size : Sizes,
    extras?: string
}


export const Button = (props:ButtonProps) =>{
    /* const width = useRef("");
    if(size == "sm") width.current = `w-[10%]`
    else if (size == "md") width.current = `w-[20%]`
    else width.current = `w-[40%]`
    console.log(`bg-blue-${variant}`); */

    // let backgroundColor = `bg-blue-${variant}` as string;

    //better way
    let VariantsForButton :Record<Variants,string> = {
        "primary" : "bg-blue-primary text-blue-secondary",
        "secondary" : "bg-blue-secondary text-blue-primary",
        "random" : "bg-blue-random"
    }

    //doing sam thing for size too 
    let sizeOfButton : Record<Sizes,string> = {
        "sm" : "w-[10%] min-w-fit text-sm",
        "md" : "w-[20%] min-w-fit text-base",
        "lg" : "w-[40%] min-w-fit text-xl",
    }

    let defaultStyles = `py-2 px-4 rounded-lg flex justify-center items-center gap-4 active:scale-95 shadow-lg` 

    // let iconSize: Record<Sizes,string> = {
    //     sm : "w-2 h-2",
    //     md : "w-6 h-6",
    //     lg : "w-8 h-8"
    // }

    return (<>
    <button className={`${VariantsForButton[props.variant]} ${sizeOfButton[props.size]} ${props.extras} ${defaultStyles}`} onClick={(props.onClick)}>
        {/* Not Working as expected */}
        {/* {props.icon && cloneElement(props.icon, {
                className: `${props.icon.props.className || ""} ${iconSize[props.size]}`,
            }
            )
        } */}
        {props.icon}
        {props.text}
    </button>
    </>)
}

//<Button variant={"primary"} size={"lg"} onClick={()=>{}} text={"aayushis button"}></Button> 