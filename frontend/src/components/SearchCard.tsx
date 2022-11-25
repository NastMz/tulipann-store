import {Link} from "react-router-dom";
import {Stars} from "./Stars";

interface ShoppingCartCardProps {
    id: number,
    name: string,
    image: string,
    rate?: number,
    summary?: string,
    path: string,
    tag: string,
    closeSearchBar: Function,
    className?: string
}

export const SearchCard = (props: ShoppingCartCardProps) => {

    return (
        <Link
            to={`${props.path}/${props.id}`}
            className={`w-full max-h-14 ${props.className}`}
            onClick={() => props.closeSearchBar()}
        >
            <div className={`relative grid grid-cols-3 gap-4 p-4 h-full w-full border-t border-b border-gray-100`}>
                <div className={"h-full w-full overflow-hidden rounded-lg"}>
                    <img src={props.image} alt={props.image} className={`h-full min-w-full object-cover`}/>
                </div>
                <div className={"col-span-2 flex flex-col gap-1 w-full"}>
                    <div className={"flex flex-col items-start gap-1 w-full"}>
                        <span className={"text-sm text-red-500"}>{props.tag}</span>
                        <p className={"truncate text-lg w-full text-black"}>{props.name}</p>
                        {
                            props.rate && <Stars rate={props.rate} size={20}/>
                        }
                        {
                            props.summary && <p className={"truncate text-sm text-gray-400 w-full"}>{props.summary}</p>
                        }
                    </div>
                </div>
            </div>
        </Link>
    )
}