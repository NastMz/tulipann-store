import hero from "../assets/images/hero.jpg";
import {scrollToSection} from "../utils";
import {PromoCard} from "./utils/PromoCard";

export const Hero = () => {
    return (
        <section className="md:grid md:grid-cols-2 gap-6 md:gap-20 lg:gap-40 relative h-fit md:h-screen">
            <div
                className={"flex flex-col gap-4 px-12 items-center justify-center md:items-start text-center md:text-left"}>
                <h1 className={"text-2xl md:text-5xl font-bold"}>Lorem ipsum dolor sit amet.</h1>
                <p className={"text-gray-500"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio eum
                    ipsam magni, quas sequi voluptatum. Adipisci facere laboriosam mollitia necessitatibus porro,
                    possimus quam rerum.</p>
                <div
                    className={"text-white py-2 px-4 bg-red-500 rounded-lg w-36 mt-3 text-center cursor-pointer hover:bg-red-400"}
                    onClick={() => scrollToSection('category', -130)}
                >
                    <span className={"text-sm"}>Ver categorias</span>
                </div>
            </div>
            <div className={"hidden md:block col-start-2 h-full -z-10"}>
                <div className={"grid grid-cols-3 h-full pt-6 gap-4 absolute top-0 overflow-hidden"}>
                    <div className={"flex flex-col gap-4 h-full items-center py-14"}>
                        <PromoCard img={hero} aspectRatio={"[2/3]"}/>
                        <PromoCard img={hero} aspectRatio={"[2/3]"}/>
                    </div>
                    <div className={"flex flex-col gap-4 h-full items-center"}>
                        <PromoCard img={hero} aspectRatio={"[2/3]"}/>
                        <PromoCard img={hero} aspectRatio={"[2/3]"}/>
                        <PromoCard img={hero} aspectRatio={"[2/3]"}/>
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