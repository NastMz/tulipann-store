import {Link} from "react-router-dom";
import {forwardRef, Ref} from "react";
import {routes} from "../routes/routes";

interface ArticleCardProps {
    id: number,
    title: string,
    summary: string,
    banner: string,
    date: string,
    className?: string
}

export const DiscoverCard = forwardRef((props: ArticleCardProps, ref: Ref<any>) => {
    return (
        <div ref={ref} className={`h-full overflow-hidden relative ${props.className}`}>
            <div className={"h-full w-full"}>
                <img src={props.banner} alt="" className={`h-full w-full object-cover`}/>
            </div>
            <div
                className={"absolute h-full w-full bg-black bg-opacity-30 top-0 text-white text-center flex flex-col justify-center items-center gap-2 md:gap-4 px-12 md:px-80"}>
                <h1 className={"font-bold"}>{props.title}</h1>
                <p className={"text-sm"}>{props.summary}</p>
                <Link to={`${routes.discover.path}/${props.id}`}
                      className={"py-2 px-4 bg-white rounded-lg w-36 mt-3 text-center cursor-pointer hover:bg-gray-100 text-sm text-black"}>
                    Leer más
                </Link>
            </div>
        </div>
    )
})