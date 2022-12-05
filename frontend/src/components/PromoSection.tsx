import {Link} from "react-router-dom";
import {BsArrowRightShort} from "react-icons/all";
import {PromoCard} from "./PromoCard";
import {Images} from "../utils";

export const PromoSection = () => {
    return (
        <section
            className="bg-red-500 flex gap-10 md:gap-20 lg:gap-40 relative h-44 md:h-96 md:pt-20 mt-20 md:mt-36 overflow-x-clip">
            <div className={"flex flex-col gap-2 md:gap-4 px-6 md:px-12 pb-8 md:pb-20 items-start justify-end text-white"}>
                <div>
                    <h2 className={"text-lg md:text-5xl font-bold"}>Lorem ipsum.</h2>
                    <h2 className={"text-lg md:text-5xl font-bold"}>Lorem ipsum.</h2>
                </div>
                <Link to={"#"} className={"font-medium text-sm flex justify-start items-center"}>
                    <span>Ver más</span> <BsArrowRightShort size={20}/>
                </Link>
            </div>
            <div className={"overflow-hidden absolute -top-6 md:-top-16 -right-5 bottom-0"}>
                <div className={"flex h-full gap-2 md:gap-4"}>
                    <div className={"flex flex-col h-fit gap-2 md:gap-4 relative -bottom-8 lg:-bottom-20"}>
                        <PromoCard
                            img={Images.hero}
                            className={'h-[130px] w-[110px] md:h-[250px] md:w-[200px] lg:h-[350px] lg:w-[300px]'}
                        />
                        <PromoCard
                            img={Images.hero}
                            className={'h-[130px] w-[110px] md:h-[250px] md:w-[200px] lg:h-[350px] lg:w-[300px]'}
                        />
                    </div>
                    <div className={"flex flex-col h-fit gap-2 md:gap-4 h-full relative"}>
                        <PromoCard
                            img={Images.hero}
                            className={'h-[130px] w-[110px] md:h-[250px] md:w-[200px] lg:h-[350px] lg:w-[300px]'}
                        />
                        <PromoCard
                            img={Images.hero}
                            className={'h-[130px] w-[110px] md:h-[250px] md:w-[200px] lg:h-[350px] lg:w-[300px]'}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
