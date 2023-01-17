import {motion} from "framer-motion";
import {routes} from "../../config/routes";
import {Link} from "react-router-dom";

/**
 * Warranty component.
 *
 * This component displays the warranty information for the store.
 *
 * @returns {ReactNode} The rendered component.
 */
export const Warranty = () => {

    return (
        <motion.div
            initial={{width: 0}}
            animate={{width: '100%'}}
            exit={{width: 0}}
            className={"min-h-screen h-fit overflow-hidden w-full grid grid-cols-1 md:grid-cols-4"}
        >
            <div className={'bg-gradient-to-bl from-red-500 to-red-800 h-16 md:h-full w-full'}/>
            <div className={'p-12 flex flex-col gap-6 justify-items-start w-full col-span-3'}>
                <div>
                    <h3 className={'text-2xl font-bold text-red-500'}>Garantías</h3>
                    <h1 className={'text-5xl font-bold'}>Tulipann Store</h1>
                </div>
                <p>En Tulipann Store, nos comprometemos a ofrecer productos de alta calidad y por eso ofrecemos
                    garantías en ciertos productos. A continuación, encontrará información detallada sobre las
                    garantías.</p>

                <ul className={'flex flex-col gap-6 justify-items-start w-full list-disc pl-4'}>
                    <li>
                        <p><span className={'font-bold text-xl'}>Cajas de herramientas:</span> Todas nuestras cajas de
                            herramientas cuentan con una garantía de 30 días contra defectos de fabricación. Si tiene
                            algún
                            problema con una caja de herramientas dentro del plazo de garantía, póngase en contacto con
                            nuestro
                            servicio de atención al cliente para obtener instrucciones de devolución.</p>
                    </li>
                    <li>
                        <p><span className={'font-bold text-xl'}>Delantales:</span> Todos nuestros delantales cuentan
                            con una
                            garantía de 30 días contra defectos de fabricación. Si tiene algún problema con un delantal
                            dentro
                            del plazo de garantía, póngase en contacto con nuestro servicio de atención al cliente para
                            obtener
                            instrucciones de devolución.</p>
                    </li>
                </ul>
                <p>Si tiene alguna pregunta o problema con un producto bajo garantía, no dude en ponerse en <Link
                    to={routes.contact.path}
                    className={'text-red-500'}>contacto</Link> con nuestro servicio de atención al cliente. Estaremos
                    encantados de ayudarle.</p>

            </div>
        </motion.div>
    )
};