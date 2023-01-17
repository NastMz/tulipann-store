import {Link} from "react-router-dom";
import {BsFacebook, BsInstagram, BsTwitter, BsWhatsapp} from "react-icons/bs";
import Logo from "../../assets/images/LogoTulipannV2.svg";
import axios from 'axios';
import {useState} from "react";
import {Modal} from "../common";
import {routes} from "../../config/routes";

/**
 * Footer component.
 *
 * This component displays the footer of the website, including the newsletter subscription form and social media links.
 *
 * @returns {ReactNode} The rendered component.
 */
export const Footer = () => {
    // State to show or hide the credits
    const [showCredits, setShowCredits] = useState(false);
    // State to track whether the modal is open or closed
    const [modalIsOpen, setModalIsOpen] = useState(false);
    // State to store the type of modal to show (error, warning, info, or success)
    const [modalType, setModalType] = useState<'error' | 'warning' | 'info' | 'success'>('success');
    // State to store the title of the modal
    const [modalTitle, setModalTitle] = useState('');
    // State to store the message of the modal
    const [modalMessage, setModalMessage] = useState('');
    // State to store the email of the user who wants to subscribe to the newsletter
    const [email, setEmail] = useState('');

    /**
     * Subscribes the user to the newsletter.
     *
     * Sends a request to the server to subscribe the user to the newsletter, and displays a modal with the result of the
     * operation.
     */
    const subscribeToNewsletter = async () => {
        // Make the HTTP request using axios
        try {
            const response = await axios.post('/api/subscribe', {email});
            // If the request is successful, update the state of the modal
            setModalType('success');
            setModalTitle('¡Suscripción exitosa!');
            setModalMessage('Te has suscrito al boletín de noticias con éxito.');
        } catch (error) {
            // If the request fails, update the state of the modal
            setModalType('error');
            setModalTitle('Error');
            setModalMessage('Ha ocurrido un error al suscribirte al boletín de noticias. Por favor, inténtalo de nuevo.');
        }
        // Open the modal
        setModalIsOpen(true);
    };

    return (
        <>
            <footer
                className="flex flex-col gap-4 text-sm mx-0 md:mx-10 px-6 pt-10 text-gray-500 border-b-2 border-t-2 border-gray-100"
            >
                <div
                    className={"flex flex-col lg:flex-row gap-8 lg:gap-1 justify-between mb-4"}
                >
                    <div
                        className={
                            "w-full lg:flex-2 flex flex-col gap-4 md:gap-6 items-center lg:items-start justify-center lg:justify-start lg:max-w-sm"
                        }
                    >
                        {/* LOGO */}
                        <div className={"h-12"}>
                            <img
                                src={Logo}
                                alt={Logo}
                                className={`h-full w-full object-cover`}
                            />
                        </div>
                        {/* PHRASE */}
                        <p className={"text-center lg:text-left w-full mb-2"}>
                            ¡Estamos siempre dispuestos a ayudarte! Contáctanos y estaremos encantados de atender
                            cualquier
                            pregunta o de atender cualquier pregunta o duda que puedas tener.
                        </p>

                        {/* SOCIAL MEDIA */}
                        <div className={"flex gap-6"}>
                            <Link to={"#"} className={"hover:text-blue-700"}>
                                <BsFacebook size={25}/>
                            </Link>
                            <Link to={"#"} className={"hover:text-pink-700"}>
                                <BsInstagram size={25}/>
                            </Link>
                            <Link to={"#"} className={"hover:text-cyan-400"}>
                                <BsTwitter size={25}/>
                            </Link>
                            <Link to={"#"} className={"hover:text-green-700"}>
                                <BsWhatsapp size={25}/>
                            </Link>
                        </div>
                    </div>

                    {/* LINKS */}
                    <div
                        className={"flex flex-col md:flex-row px-14 lg:px-0 justify-center items-center lg:justify-end lg:items-start gap-4 lg:gap-12 text-lg"}
                    >
                        <ul className={"flex flex-col items-start gap-1"}>
                            <li className={"text-red-600 font-medium mb-1 text-center lg:text-left w-full"}>Información</li>
                            <li className={"hover:text-gray-300 text-center lg:text-left w-full"}>
                                <Link to={routes.about.path}>Acerca de nosotros</Link>
                            </li>
                            <li className={"hover:text-gray-300 text-center lg:text-left w-full"}>
                                <Link to={routes.privacy.path}>Política de privacidad</Link>
                            </li>
                            <li className={"hover:text-gray-300 text-center lg:text-left w-full"}>
                                <Link to={routes.terms.path}>Términos y condiciones</Link>
                            </li>
                        </ul>
                        <ul className={"flex flex-col items-start gap-1"}>
                            <li className={"text-red-600 font-medium mb-1 text-center lg:text-left w-full"}>Ayuda y
                                soporte
                            </li>
                            <li className={"hover:text-gray-300 text-center lg:text-left w-full"}>
                                <Link to={routes.faq.path}>Preguntas frecuentes</Link>
                            </li>
                            <li className={" hover:text-gray-300 text-center lg:text-left w-full"}>
                                <Link to={routes.contact.path}>Formulario de contacto</Link>
                            </li>
                            <li className={" hover:text-gray-300 text-center lg:text-left w-full"}>
                                <Link to={routes.guide.path}>Guía del usuario</Link>
                            </li>
                        </ul>
                        <ul className={"flex flex-col items-start gap-1"}>
                            <li className={"text-red-600 font-medium mb-1 text-center lg:text-left w-full"}>Métodos de
                                pago
                            </li>
                            <li className={" hover:text-gray-300 text-center lg:text-left w-full"}>
                                <Link to={routes.payments.path}>Formas de pago</Link>
                            </li>
                            <li className={" hover:text-gray-300 text-center lg:text-left w-full"}>
                                <Link to={routes.return.path}>Política de devoluciones</Link>
                            </li>
                            <li className={" hover:text-gray-300 text-center lg:text-left w-full"}>
                                <Link to={routes.warranty.path}>Garantías</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* NEWSLETTER */}
                <div className={"flex flex-col gap-2 border-t border-b border-gray-100 py-8"}>
                    <h4 className={"text-red-600 text-lg font-medium mb-1 text-center lg:text-left"}>
                        Recibe nuestras últimas noticias
                    </h4>
                    <div
                        className={'flex flex-col gap-8 lg:gap-20 justify-center lg:flex-row lg:justify-between lg:items-center text-center lg:text-left text-lg'}>
                        <p>Únete a nuestra lista de correo y recibe novedades de forma regular en tu bandeja de
                            entrada.</p>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                subscribeToNewsletter();
                            }}
                        >
                            <div className={"flex items-center gap-4 w-full justify-center lg:justify-end"}>
                                <input
                                    type="email"
                                    placeholder="Ingresa tu correo electrónico"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-full shadow-sm placeholder-slate-400 w-96"}
                                />
                                <button
                                    type="submit"
                                    className={"bg-red-600 rounded-full py-2 px-4 text-white hover:bg-red-500 text-sm font-medium"}
                                >
                                    Suscríbete
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* COPYRIGHT */}
                <div className={"text-center w-full pt-4 flex flex-col gap-1"}>
                    <p className={"text-sm"}>
                        Copyright {new Date().getFullYear()} Todos los derechos reservados
                    </p>
                    <div className={"mb-4 flex flex-col gap-4 items-center text-gray-500 text-center"}>
                    <span className={"text-sm"}>Desarrollado por <a href="https://nastmz.github.io/portfolio"
                                                                    target={"_blank"} className={"text-red-400"}>Kevin Martinez</a> y <a
                        href="https://www.linkedin.com/in/joshep-mateo-granada-quinchia-41b379207/" target={"_blank"}
                        className={"text-red-400"}>Mateo Granada</a></span>
                    </div>

                    {/* IMAGES CREDITS */}
                    <div className={'text-sm flex gap-1 -ml-14 relative w-fit'} onMouseLeave={() => setShowCredits(false)}>
                        <span className={'opacity-40'} onMouseEnter={() => setShowCredits(true)}>
                            Algunas imágenes fueron tomadas de <a href="https://www.freepik.es" target={'_blank'}
                                                                    className={'text-blue-600'}>Freepik</a>.
                        </span>
                        <div className={`absolute right-0 bottom-6 flex flex-col shadow-md h-fit w-fit bg-white opacity-100 p-2 rounded-md ${showCredits ? 'block': 'hidden'}`}>
                            <p><a
                                href="https://www.freepik.com/free-vector/teamwork-concept-landing-page_5155720.htm#query=about&position=2&from_view=search&track=sph">Image
                                by pikisuperstar</a> on Freepik</p>

                            <p>Image by <a
                                href="https://www.freepik.com/free-vector/flat-design-illustration-customer-support_12982910.htm#query=contact&position=8&from_view=search&track=sph">Freepik</a>
                            </p>

                            <p><a
                                href="https://www.freepik.com/free-vector/cloud-computing-security-abstract-concept-illustration_11668583.htm#query=privacy&position=6&from_view=search&track=sph">Image
                                by vectorjuice</a> on Freepik</p>

                            <p><a
                                href="https://www.freepik.com/free-vector/businessman-putting-electronic-signature-document-security-shields-electronic-signature-e-signature-template-e-sign-consent-agreement-concept-illustration_11669150.htm#query=terms%20and%20conditions&position=16&from_view=search&track=ais">Image
                                by vectorjuice</a> on Freepik</p>

                            <p><a
                                href="https://www.freepik.com/free-vector/man-paying-online-receiving-cashback-wallet_20922972.htm#query=payment&position=5&from_view=search&track=sph">Image
                                by redgreystock</a> on Freepik</p>

                            <p><a
                                href="https://www.freepik.com/free-vector/five-star-grading-evaluation-rating-estimating-excellent-review-customer-satisfaction-with-service-highest-score-client-feedback-concept-illustration_11668432.htm#query=quality&position=15&from_view=search&track=sph">Image
                                by vectorjuice</a> on Freepik</p>

                            <p>Image by <a
                                href="https://www.freepik.com/free-vector/flat-people-group-asking-questions_13560778.htm#query=preguntas&from_query=preguntas%20frecuentes&position=14&from_view=search&track=sph">Freepik</a>
                            </p>

                            <p><a
                                href="https://www.freepik.com/free-vector/express-delivery-service-flat_12085334.htm#query=returns&position=23&from_view=search&track=sph">Image
                                by vectorjuice</a> on Freepik</p>
                        </div>
                    </div>
                </div>
            </footer>
            {/* Modal for displaying messages to the user */}
            <Modal
                title={modalTitle}
                message={modalMessage}
                buttonText="Cerrar"
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                onButtonClick={() => setModalIsOpen(false)}
                type={modalType}
            />
        </>
    );
};

