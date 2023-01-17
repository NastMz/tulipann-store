import {motion} from "framer-motion";
import {routes} from "../../config/routes";
import {Link} from "react-router-dom";

/**
 * Terms component.
 *
 * This component displays the terms and conditions for the website.
 *
 * @returns {ReactNode} The rendered component.
 */
export const Terms = () => {

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
                    <h3 className={'text-2xl font-bold text-red-500'}>Términos y Condiciones</h3>
                    <h1 className={'text-5xl font-bold'}>Tulipann Store</h1>
                </div>
                <p>En esta sección, encontrará información importante sobre el uso de nuestra plataforma de compras en
                    línea, los productos que ofrecemos, y las responsabilidades que usted como cliente acepta al
                    realizar compras en nuestra tienda.</p>

                <p>Al acceder y utilizar nuestra tienda en línea, usted acepta cumplir con estos Términos y Condiciones.
                    Si no está de acuerdo con estos términos, le pedimos que no realice compras en nuestra
                    plataforma.</p>

                <p>En nuestra tienda en línea, se ofrecen productos y servicios para uso personal y no comercial,
                    cualquier otro uso está prohibido. No está permitido utilizar nuestra tienda en línea con ningún
                    propósito ilegal o no autorizado. No podrá reproducir, duplicar, copiar, vender, comercializar o
                    explotar ninguna parte de nuestra tienda en línea sin nuestro permiso previo por escrito.</p>

                <p>En cuanto a su información personal, al utilizar nuestra tienda en línea, usted acepta que nos
                    proporcione su información de contacto, incluyendo su correo electrónico y número de teléfono, los
                    cuales utilizaremos para brindarle un mejor servicio y mantenerlo informado sobre nuestras
                    promociones, ofertas y actualizaciones de su compra. También podremos utilizar esta información para
                    fines de investigación y análisis de mercado. Asimismo, nos comprometemos a proteger su información
                    personal y garantizar su privacidad. Para conocer más sobre nuestra política de privacidad, haga
                    clic aqui <Link to={routes.privacy.path}
                                    className={'text-red-500'}>(link a la politica de privacidad)</Link>.</p>

                <p>En cuanto a nuestras políticas de compra, nos aseguramos de ofrecer productos de alta calidad y
                    brindar un servicio al cliente excepcional. Sin embargo, en caso de que desee devolver un producto
                    adquirido en nuestra tienda, le pedimos revisar nuestra <Link to={routes.return.path}
                                                                                  className={'text-red-500'}>política de
                        devoluciones</Link> y <Link to={routes.warranty.path}
                                                    className={'text-red-500'}>garantías</Link> para
                    conocer los procedimientos a seguir.</p>

                <p>Además, nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento y
                    sin previo aviso. Le recomendamos que revise esta sección periódicamente para estar al tanto de
                    cualquier cambio.</p>

                <p>En caso de cualquier violación de estos Términos y Condiciones, nos reservamos el derecho de tomar
                    las medidas necesarias, incluyendo sin limitación, la cancelación de su compra y/o la terminación de
                    su acceso a la tienda en línea.</p>

                <p>Si tiene alguna pregunta o inquietud sobre estos Términos y Condiciones, no dude en ponerse en <Link
                    to={routes.contact.path}
                    className={'text-red-500'}>contacto</Link> con nuestro servicio de atención al cliente. Estaremos
                    encantados de ayudarle.</p>

                <p>Agradecemos su preferencia por comprar en nuestra tienda en línea y esperamos tener la oportunidad de
                    seguir siendo su opción de compra en el futuro.</p>

            </div>
        </motion.div>
    )
};

