import hero from "../assets/images/hero.jpg";
import {scrollToSection} from "../utils";
import {PromoCard} from "./PromoCard";

export const Hero = () => {
    return (
        <section className="flex gap-12 relative h-fit md:h-screen 2xl:h-[800px]">
            <div
                className={"flex flex-col gap-4 px-12 2xl:px-28 items-center justify-center md:items-start text-center md:text-left w-[80%] h-full -mt-14"}
            >
                <h1 className={"text-2xl md:text-5xl 2xl:text-7xl font-bold"}>Lorem ipsum dolor sit amet.</h1>
                <p className={"text-gray-500 text-base 2xl:text-2xl"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio eum
                    ipsam magni, quas sequi voluptatum. Adipisci facere laboriosam mollitia necessitatibus porro,
                    possimus quam rerum.</p>
                <div
                    className={"text-white py-2 px-4 bg-red-500 rounded-lg w-36 mt-3 text-center cursor-pointer hover:bg-red-400"}
                    onClick={() => scrollToSection('category', -130)}
                >
                    <span className={"text-sm lg:text-base"}>Ver categorias</span>
                </div>
            </div>
            <div className={"hidden md:block h-full w-full"}>
                <div className={"grid grid-cols-3 h-full w-fit gap-4 absolute -top-5 -right-5 overflow-hidden"}>
                    <div className={"flex flex-col gap-4 h-full items-center py-14"}>
                        <PromoCard img={hero} aspectRatio={"[2/3]"}/>
                        <PromoCard img={hero} aspectRatio={"[2/3]"}/>
                    </div>
                    <div className={"flex flex-col gap-4 h-full items-center"}>
                        <PromoCard img={hero} aspectRatio={"[1/2]"}/>
                        <PromoCard img={hero} aspectRatio={"[1/2]"}/>
                        <PromoCard img={hero} aspectRatio={"[1/2]"}/>
                    </div>
                    <div className={"flex flex-col gap-4 h-full items-center py-14"}>
                        <PromoCard img={hero} aspectRatio={"[2/3]"}/>
                        <PromoCard img={hero} aspectRatio={"[2/3]"}/>
                    </div>
                </div>
            </div>
        </section>
    )
}