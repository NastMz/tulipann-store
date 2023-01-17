import {motion} from "framer-motion";
import {routes} from "../../config/routes";
import {Link} from "react-router-dom";

/**
 * Returns component.
 *
 * This component displays the returns policy for the store.
 *
 * @returns {ReactNode} The rendered component.
 */
export const Returns = () => {

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
                    <h3 className={'text-2xl font-bold text-red-500'}>Política de devoluciones</h3>
                    <h1 className={'text-5xl font-bold'}>Tulipann Store</h1>
                </div>
                <p>En Tulipann Store, nos tomamos muy en serio la satisfacción de nuestros clientes y por eso ofrecemos
                    una política de devoluciones flexible y justa. A continuación, encontrará información detallada
                    sobre cómo realizar una devolución.</p>

                <h2 className={'font-bold text-xl'}>¿Qué productos pueden ser devueltos?</h2>
                <p>Aceptamos devoluciones de productos en su embalaje original y en perfectas condiciones, siempre y
                    cuando se haya realizado el pedido en nuestra tienda en línea. Cabe destacar que el Colágeno <strong>no
                        aplica para devolución</strong>.</p>

                <h2 className={'font-bold text-xl'}>¿Cuál es el plazo para realizar una devolución?</h2>
                <p>Los clientes tienen un plazo de 30 días desde la fecha de entrega para realizar una
                    devolución.</p>

                <h2 className={'font-bold text-xl'}>¿Cómo se realiza una devolución?</h2>
                <p>Para realizar una devolución, póngase en contacto con nuestro servicio de atención al cliente y
                    siga las instrucciones proporcionadas. Por favor, proporcione información detallada sobre el
                    motivo de la devolución e incluya el número de la orden.</p>

                <h2 className={'font-bold text-xl'}>¿Cómo se realiza el reembolso?</h2>
                <p>Una vez recibida la devolución y verificado que cumple con los requisitos, se realizará el
                    reembolso en el método de pago que haya decidido. Por favor, tenga en cuenta que el tiempo
                    necesario para recibir el reembolso puede variar según el método de pago utilizado.</p>

                <p>Si tiene alguna pregunta o problema con una devolución, no dude en ponerse en <Link
                    to={routes.contact.path}
                    className={'text-red-500'}>contacto</Link> con nuestro servicio de atención al cliente. Estaremos
                    encantados de ayudarle.</p>
            </div>
        </motion.div>
    )
};