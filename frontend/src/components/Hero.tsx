import {Images, scrollToSection} from "../utils";
import {PromoCard} from "./PromoCard";

export const Hero = () => {
    return (
        <section className="flex gap-12 relative h-fit md:h-screen 2xl:h-[800px]">
            <div
                className={"flex flex-col gap-4 px-12 2xl:px-28 items-center justify-center md:items-start text-center md:text-left w-2/3 h-full -mt-14"}
            >
                <h1 className={"text-2xl md:text-5xl 2xl:text-7xl font-bold"}>Lorem ipsum dolor sit amet.</h1>
                <p className={"text-gray-500 text-base 2xl:text-2xl"}>Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Distinctio eum
                    ipsam magni, quas sequi voluptatum. Adipisci facere laboriosam mollitia necessitatibus porro,
                    possimus quam rerum.</p>
                <div
                    className={"text-white py-2 px-4 bg-red-500 rounded-lg w-36 mt-3 text-center cursor-pointer hover:bg-red-400"}
                    onClick={() => scrollToSection('category', -130)}
                >
                    <span className={"text-sm lg:text-base"}>Ver categorias</span>
                </div>
            </div>
            <div className={"relative h-full w-2/3 -top-5 -right-10 bottom-0  overflow-hidden"}>
                <div className={"grid grid-cols-3 h-full w-full gap-4"}>
                    <div className={"grid gap-4 h-full py-14"}>
                        <PromoCard img={Images.hero}/>
                        <PromoCard img={Images.hero}/>
                    </div>
                    <div className={"grid gap-4 h-full relative -bottom-5 top-0"}>
                        <PromoCard img={Images.hero}/>
                        <PromoCard img={Images.hero}/>
                        <PromoCard img={Images.hero}/>
                    </div>
                    <div className={"grid gap-4 h-full py-14"}>
                        <PromoCard img={Images.hero}/>
                        <PromoCard img={Images.hero}/>
                    </div>
                </div>
            </div>
        </section>
    )
}