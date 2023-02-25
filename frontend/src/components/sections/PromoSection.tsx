import {Link} from "react-router-dom";
import {BsArrowRightShort} from "react-icons/bs";
import {PromoCard} from "./PromoCard";
import {Images} from "../../utils";


/**
 * PromoSection component.
 *
 * This component is used to display the promo section.
 *
 * @returns {JSX.Element} The promo section.
 */
export const PromoSection = () => {
    return (
        <section
            className="-z-10 bg-red-500 flex gap-4 lg:gap-30 relative h-44 md:h-96 md:pt-20 mt-20 md:mt-36 overflow-x-clip">
            <div
                className={"flex flex-col gap-2 md:gap-4 px-6 md:px-12 pb-8 md:pb-20 items-start justify-end text-white px-2 w-full"}>
                <div className={'flex flex-col gap-1 lg:gap-4'}>
                    <h2 className={"text-lg md:text-4xl font-bold"}>¡Vive una experiencia diferente!</h2>
                    <p className={"text-sm md:text-lg font-bold"}>Ven a la Finca Villa Andrea ubicada en la Vereda
                        Chingafrio, Cundinamarca
                        Y vuélvete un gran turista de este hermoso departamento</p>
                </div>
                <Link to={"#"} className={"font-medium text-sm flex justify-start items-center"}>
                    <span>Ver más</span> <BsArrowRightShort size={20}/>
                </Link>
            </div>
            <div className={'relative w-fit md:w-full'}>
                <div className={"overflow-hidden absolute -z-10 lg:z-0 -top-10 md:-top-60 -right-20 lg:right-5 bottom-0"}>
                    <div className={"flex h-full gap-2 md:gap-4"}>
                        <div className={"flex flex-col h-fit gap-2 md:gap-4 relative -bottom-8 lg:-bottom-20"}>
                            <PromoCard
                                image={Images.promo1}
                                className={'h-[130px] w-[110px] md:h-[250px] md:w-[200px] lg:h-[350px] lg:w-[300px]'}
                            />
                            <PromoCard
                                image={Images.promo3}
                                className={'h-[130px] w-[110px] md:h-[250px] md:w-[200px] lg:h-[350px] lg:w-[300px]'}
                            />
                        </div>
                        <div className={"flex flex-col h-fit gap-2 md:gap-4 h-full relative"}>
                            <PromoCard
                                image={Images.promo2}
                                className={'h-[130px] w-[110px] md:h-[250px] md:w-[200px] lg:h-[350px] lg:w-[300px]'}
                            />
                            <PromoCard
                                image={Images.promo3}
                                className={'h-[130px] w-[110px] md:h-[250px] md:w-[200px] lg:h-[350px] lg:w-[300px]'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
