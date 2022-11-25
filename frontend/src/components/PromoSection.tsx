import {Link} from "react-router-dom";
import {BsArrowRightShort} from "react-icons/all";
import {PromoCard} from "./PromoCard";
import hero from "../assets/images/hero.jpg";

export const PromoSection = () => {
    return (
        <section
            className="bg-red-500 grid grid-cols-2 gap-6 md:gap-20 lg:gap-40 relative h-44 md:h-96 md:pt-20 mt-20 md:mt-36 mb-8 md:mb-14">
            <div className={"flex flex-col gap-4 px-6 md:px-12 pb-8 md:pb-20 items-start justify-end text-white"}>
                <div>
                    <h2 className={"text-lg md:text-5xl font-bold"}>Lorem ipsum.</h2>
                    <h2 className={"text-lg md:text-5xl font-bold"}>Lorem ipsum.</h2>
                </div>
                <Link to={"#"} className={"font-medium text-sm flex justify-start items-center"}>
                    <span>Ver más</span> <BsArrowRightShort size={20}/>
                </Link>
            </div>
            <div className={"col-start-2 pr-4 md:pr-12 overflow-hidden absolute -top-6 md:-top-12 bottom-0 right-0"}>
                <div className={"grid grid-cols-2 h-full gap-4 relative"}>
                    <div className={"flex flex-col gap-4 pt-8 md:pt-16"}>
                        <PromoCard img={hero} aspectRatio={"[3/2]"} className={"h-32 md:h-60"}/>
                        <PromoCard img={hero} aspectRatio={"[3/2]"} className={"h-32 md:h-60"}/>
                    </div>
                    <div className={"flex flex-col gap-4 h-full"}>
                        <PromoCard img={hero} aspectRatio={"[3/2]"} className={"h-32 md:h-60"}/>
                        <PromoCard img={hero} aspectRatio={"[3/2]"} className={"h-32 md:h-60"}/>
                    </div>
                </div>
            </div>
        </section>
    )
}
