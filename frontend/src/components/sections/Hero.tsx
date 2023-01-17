import {Images, scrollToSection} from "../../utils";
import {PromoCard} from "./PromoCard";

export const Hero = () => {
    return (
        <section className="flex flex-col md:flex-row relative h-[800px] text-left overflow-hidden">
            <div
                className={"flex flex-col gap-4 px-6 md:px-10 2xl:px-28 justify-center items-start text-left w-full lg:w-2/3 h-fit md:h-full mt-8 md:-mt-20 mb-12"}
            >
                <h1 className={"text-5xl 2xl:text-7xl font-bold"}>Tulipann Store, tu tienda online de confianza</h1>
                <p className={"text-gray-500 text-lg 2xl:text-xl 2xl:text-3xl"}>En Tulipann Store encontrarás una amplia variedad de productos de alta calidad y nos esforzamos por ofrecerte solo lo mejor. Además, nuestro compromiso con la satisfacción del cliente es nuestra prioridad máxima. ¡Visítanos hoy mismo y descubre por qué somos tu tienda online de confianza!</p>
                <div
                    className={"hidden md:block text-white py-3 px-5 bg-red-600 rounded-lg w-fit mt-3 text-center cursor-pointer hover:bg-red-500"}
                    onClick={() => scrollToSection('category', -130)}
                >
                    <span className={"font-medium"}>Ver categorias</span>
                </div>
            </div>
            <div
                className={"relative h-full w-full lg:p-0 md:w-2/3 -top-10 md:-right-10 -right-6 bottom-0 overflow-hidden"}>
                <div className={"flex h-full w-full gap-4"}>
                    <div className={"flex flex-col gap-4 h-fit md:py-14"}>
                        <div
                            className={"block md:hidden text-white py-4 px-6 bg-red-500 rounded-lg w-fit mt-3 text-center cursor-pointer hover:bg-red-500"}
                            onClick={() => scrollToSection('category', -130)}
                        >
                            <span className={"font-medium"}>Ver categorias</span>
                        </div>
                        <PromoCard
                            img={Images.hero}
                            className={'h-[250px] w-[200px] md:h-[300px] md:w-[250px] 2xl:h-[350px] 2xl:w-[300px]'}
                        />
                        <PromoCard
                            img={Images.hero}
                            className={'h-[250px] w-[200px] md:h-[300px] md:w-[250px] 2xl:h-[350px] 2xl:w-[300px]'}
                        />
                    </div>
                    <div className={"flex flex-col gap-4 h-fit relative -bottom-5"}>
                        <PromoCard
                            img={Images.hero}
                            className={'h-[250px] w-[200px] md:h-[300px] md:w-[250px] 2xl:h-[350px] 2xl:w-[300px]'}
                        />
                        <PromoCard
                            img={Images.hero}
                            className={'h-[250px] w-[200px] md:h-[300px] md:w-[250px] 2xl:h-[350px] 2xl:w-[300px]'}
                        />
                        <PromoCard
                            img={Images.hero}
                            className={'h-[250px] w-[200px] md:h-[300px] md:w-[250px] 2xl:h-[350px] 2xl:w-[300px]'}
                        />
                    </div>
                    <div className={"flex flex-col gap-4 h-fit py-14"}>
                        <PromoCard
                            img={Images.hero}
                            className={'h-[250px] w-[200px] md:h-[300px] md:w-[250px] 2xl:h-[350px] 2xl:w-[300px]'}
                        />
                        <PromoCard
                            img={Images.hero}
                            className={'h-[250px] w-[200px] md:h-[300px] md:w-[250px] 2xl:h-[350px] 2xl:w-[300px]'}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}