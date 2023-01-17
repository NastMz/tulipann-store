import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import {routes} from "../../config/routes";

/**
 * About component.
 *
 * This component displays the information about the company.
 *
 * @returns {ReactNode} The rendered component.
 */
export const About = () => {

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
                    <h3 className={'text-2xl font-bold text-red-500'}>Conocenos</h3>
                    <h1 className={'text-5xl font-bold'}>Tulipann Store</h1>
                </div>
                <p>En Tulipann Store, ofrecemos una amplia variedad de productos de alta calidad a precios competitivos.
                    Nuestra plataforma es fácil de navegar y ofrece un proceso de compra seguro y rápido. Además,
                    ofrecemos un servicio al cliente excepcional para asegurar que todas sus preguntas y inquietudes
                    sean respondidas de manera oportuna.</p>

                <h2 className={'font-bold text-xl'}>Plataforma fácil de navegar y proceso de compra seguro</h2>
                <p>Nuestra plataforma es fácil de navegar y ofrece un proceso de compra seguro y rápido. Puede buscar
                    fácilmente los productos que desea comprar utilizando nuestro buscador o navegar por nuestras
                    categorías. Una vez que haya encontrado el producto que desea, puede agregarlo a su carrito de
                    compras y completar su compra utilizando nuestro sistema de pago seguro.</p>

                <h2 className={'font-bold text-xl'}>Servicio al cliente excepcional para su satisfacción</h2>
                <p>Ofrecemos un servicio al cliente excepcional para asegurar que todas sus preguntas y inquietudes sean
                    respondidas de manera oportuna. Nuestro equipo está disponible para ayudarlo con cualquier problema
                    o pregunta que pueda tener, desde ayudarlo a encontrar el producto correcto hasta procesar una
                    devolución. Estamos comprometidos a brindarle un servicio de alta calidad para asegurar su
                    satisfacción.</p>

                <h2 className={'font-bold text-xl'}>Compromiso con brindar un servicio de alta calidad desde su visita
                    hasta la entrega del pedido</h2>
                <p>Nuestra misión es brindarle la mejor experiencia de compra en línea, ofreciendo una amplia selección
                    de productos de alta calidad, precios justos y un servicio al cliente excepcional. Estamos
                    comprometidos a brindarle un servicio de alta calidad, desde el momento en que visite nuestra página
                    web hasta que reciba su pedido.</p>

                <h2 className={'font-bold text-xl'}>Estamos siempre dispuestos a ayudarlo en caso de cualquier pregunta
                    o inquietud</h2>
                <p>Si tiene alguna pregunta o inquietud, no dude en ponerse en <Link to={routes.contact.path}
                                                                                     className={'text-red-500'}>contacto</Link> con
                    nosotros. Estaremos encantados de ayudarlo. Gracias por elegirnos como su tienda de compras en línea
                    de confianza.</p>
            </div>
        </motion.div>
    )
};