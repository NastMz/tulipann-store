import {motion} from "framer-motion";
import {routes} from "../../config/routes";
import {Link} from "react-router-dom";

/**
 * Payments component.
 *
 * This component displays the payments methods accepted by the store.
 *
 * @returns {ReactNode} The rendered component.
 */
export const Payments = () => {

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
                    <h3 className={'text-2xl font-bold text-red-500'}>Formas de pago</h3>
                    <h1 className={'text-5xl font-bold'}>Tulipann Store</h1>
                </div>
                <p>Ofrecemos una variedad de opciones para que pueda elegir la que mejor se adapte a sus necesidades. A
                    continuación, encontrará información detallada sobre cada una de las formas de pago que
                    aceptamos.</p>

                <ul className={'flex flex-col gap-6 justify-items-start w-full list-disc pl-4'}>
                    <li>
                        <p><span className={'font-bold text-xl'}>Tarjeta de crédito/débito:</span> Aceptamos todas las
                            principales tarjetas de crédito y débito, incluyendo Visa, Mastercard, American Express y
                            Discover. El pago con tarjeta de crédito/débito es seguro y se procesa de manera inmediata.
                        </p>
                    </li>
                    <li>
                        <p><span className={'font-bold text-xl'}>Contra entrega:</span> Es una forma de pago más directa
                            y con mayor interacción con el personal. Para este método de pago debes contactarte por el
                            WhatsApp para realizar el correcto proceso.</p>
                    </li>
                    <li>
                        <p><span className={'font-bold text-xl'}>Transferencia bancaria:</span> También ofrecemos la
                            opción de realizar el pago mediante transferencia bancaria. Una vez realizado el pedido, se
                            le proporcionará nuestros datos bancarios para que pueda realizar la transferencia. Por
                            favor tenga en cuenta que este método de pago puede tardar varios días en ser procesado.</p>
                    </li>
                </ul>
                <p>Si tiene alguna pregunta o problema con el pago, no dude en ponerse en <Link to={routes.contact.path}
                                                                                                className={'text-red-500'}>contacto</Link> con
                    nuestro servicio de atención al cliente. Estaremos encantados de ayudarle.</p>

            </div>
        </motion.div>
    )
};