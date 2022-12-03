import {Link} from "react-router-dom";
import {BsArrowRightShort} from "react-icons/all";
import {PromoCard} from "./PromoCard";
import {Images} from "../utils";

export const PromoSection = () => {
    return (
        <section
            className="bg-red-500 grid grid-cols-2 gap-6 md:gap-20 lg:gap-40 relative h-44 md:h-96 md:pt-20 mt-20 md:mt-36">
            <div className={"flex flex-col gap-4 px-6 md:px-12 pb-8 md:pb-20 items-start justify-end text-white"}>
                <div>
                    <h2 className={"text-lg md:text-5xl font-bold"}>Lorem ipsum.</h2>
                    <h2 className={"text-lg md:text-5xl font-bold"}>Lorem ipsum.</h2>
                </div>
                <Link to={"#"} className={"font-medium text-sm flex justify-start items-center"}>
                    <span>Ver más</span> <BsArrowRightShort size={20}/>
                </Link>
            </div>
            <div className={"col-start-2 pr-4 md:pr-12 overflow-hidden absolute -top-8 md:-top-16 right-0 bottom-0"}>
                <div className={"grid grid-cols-2 h-full gap-4"}>
                    <div className={"grid gap-4 relative -bottom-20"}>
                        <PromoCard img={Images.hero}/>
                        <PromoCard img={Images.hero}/>
                    </div>
                    <div className={"grid gap-4 h-full relative -bottom-5"}>
                        <PromoCard img={Images.hero}/>
                        <PromoCard img={Images.hero}/>
                    </div>
                </div>
            </div>
        </section>
    )
}
