import {motion} from "framer-motion";
import {routes} from "../../config/routes";
import {Link} from "react-router-dom";

/**
 * Privacy component.
 *
 * This component displays the privacy policy of the website.
 *
 * @returns {ReactNode} The rendered component.
 */
export const Privacy = () => {

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
                    <h3 className={'text-2xl font-bold text-red-500'}>Políticas de privacidad</h3>
                    <h1 className={'text-5xl font-bold'}>Tulipann Store</h1>
                </div>
                <p>En esta sección, encontrará información importante sobre cómo recopilamos, utilizamos y protegemos su
                    información personal mientras utiliza nuestra plataforma de compras en línea.</p>

                <p>Al acceder y utilizar nuestra tienda en línea, usted acepta nuestras políticas de privacidad y el uso
                    de su información personal de acuerdo a estas políticas. Si no está de acuerdo con estas políticas,
                    le pedimos que no realice compras en nuestra plataforma.</p>

                <p>Recopilamos información personal como su nombre, dirección de correo electrónico, número de teléfono
                    y dirección de envío al momento de realizar una compra en nuestra tienda en línea.</p>

                <p>Utilizamos esta información para procesar y completar sus compras, brindarle un mejor servicio al
                    cliente, y mantenerlo informado sobre nuestras promociones y ofertas. También podremos utilizar esta
                    información para fines de investigación y análisis de mercado.</p>

                <p>Nos comprometemos a proteger su información personal y garantizar su privacidad. Tomamos medidas de
                    seguridad para evitar accesos no autorizados, uso, modificación o destrucción de su información
                    personal. Sin embargo, es importante tener en cuenta que ninguna transmisión de datos a través de
                    internet es completamente segura.</p>

                <p>En caso de que tenga alguna pregunta o inquietud sobre nuestras políticas de privacidad, no dude en
                    ponerse en <Link to={routes.contact.path}
                                     className={'text-red-500'}>contacto</Link> con nuestro servicio de atención al
                    cliente. Estaremos encantados de ayudarle.</p>

                <p>Además, nos reservamos el derecho de modificar estas políticas de privacidad en cualquier momento y
                    sin previo aviso. Le recomendamos que revise esta sección periódicamente para estar al tanto de
                    cualquier cambio.</p>

                <p>Agradecemos su confianza en nuestra tienda en línea y nos esforzamos por garantizar la privacidad y
                    seguridad de su información personal en todo momento.</p>

            </div>
        </motion.div>
    )
};