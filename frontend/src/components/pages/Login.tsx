import {Link, useNavigate} from "react-router-dom";
import {routes} from "../../config/routes";
import {useFormik} from "formik";
import * as Yup from "yup";
import Logo from "../../assets/images/LogoTulipann.svg";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";
import {VscEye, VscEyeClosed} from "react-icons/vsc";
import {login} from '../../api/client';
import { Modal } from "../common";

/**
 * Login component.
 *
 * This component displays a login form and calls the `login` function when the form is submitted.
 *
 * @returns {ReactNode} The rendered component.
 */
export const Login = () => {
    // Formik logics
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: ''
        },

        // Validate form
        validationSchema: Yup.object({
            email: Yup.string().email('El formato del correo no es valido').required('Por favor introduce un correo'),
            password: Yup.string().required('Por favor introduce una contraseña'),
        }),

        // Submit form
        onSubmit: async (values) => {
            console.log(values);
            try {
                // Call the login function with the email and password from the form
                await login(values.email, values.password);

                // If the "remember me" checkbox is checked, save the email in the local storage
                if (values.rememberMe) {
                    localStorage.setItem("email", formik.values.email);
                } else {
                    // Otherwise, remove the email from the local storage
                    localStorage.removeItem("email");
                }

                // Show a success alert
                setShowSuccess(true);
            } catch (error) {
                // Show an error alert
                setShowError(true);
                // Use the error message from the Error object
                setErrorMessage('Ha ocurrido un error, intentalo de nuevo');
            }
        },
    });

    // State variables
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [shown, setShown] = useState<boolean>(false);

    const switchShown = () => setShown(!shown);

    useEffect(() => {
        // Load the email from the local storage
        const email = localStorage.getItem("email");
        // Set the email in the form
        if (email) {
            formik.setValues({ ...formik.values, email: email });
        }
    }, []);

    const navigate = useNavigate();

    const redirect = () => {
        setShowSuccess(false);
        navigate('/');
    };

    return (
        <motion.div
            initial={{width: 0}}
            animate={{width: '100%'}}
            exit={{width: 0}}
        >
            {/* Success alert */}
            <Modal
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                type="success"
                title="Éxito"
                message="Se ha iniciado sesión con éxito"
                buttonText="Aceptar"
                onButtonClick={() => redirect()}
            />

            {/* Error alert */}
            <Modal
                isOpen={showError}
                onClose={() => setShowError(false)}
                type="error"
                title="Error"
                message={errorMessage}
                buttonText="Aceptar"
                onButtonClick={() => setShowError(false)}
            />

            {/* Form */}
            <div className={"flex flex-col gap-8 justify-start items-center h-screen bg-gray-50 p-4 md:p-8"}>
                <div className={"flex flex-col items-center justify-center text-center gap-4"}>
                    <div className={"h-24"}>
                        <img src={Logo} alt={Logo} className={`h-full w-full object-cover`}/>
                    </div>
                    <div>
                        <h1 className={"text-3xl font-bold"}>Inicia sesión con tu cuenta</h1>
                        <span className={"text-sm"}>O unete a nosotros y <Link to={routes.register.path}
                                                                               className={"text-red-500 font-medium"}>crea una</Link></span>
                    </div>
                </div>
                <form onSubmit={formik.handleSubmit} action="src/components/pages"
                      className={"bg-white py-6 px-8 rounded-lg border border-gray-100 shadow-sm w-full md:w-96"}>
                    {/*Email input field*/}
                    <div className={"pb-4"}>
                        <label
                            className={"block text-sm font-medium pb-1"}
                            htmlFor="email">
                            Correo
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ingresa tu correo"
                            className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span
                            className={"text-sm text-red-600 italic"}>{formik.touched.email && formik.errors.email ? formik.errors.email : ''}</span>
                    </div>
                    {/*Password input field*/}
                    <div className={"pb-4"}>
                        <label
                            className={"block text-sm font-medium pb-1"}
                            htmlFor="password">
                            Contraseña
                        </label>
                        <div className="w-full h-fit relative">
                            <input
                                type={shown ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="Ingresa tu contraseña"
                                className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <AnimatePresence>
                                <motion.div
                                    initial={{opacity: 0, scale: 0.5}}
                                    animate={{opacity: 1, scale: 1}}
                                    exit={{opacity: 0, scale: 0.5}}
                                    className="absolute h-full right-3 top-0 flex justify-center items-center cursor-pointer"
                                    onClick={() => switchShown()}
                                    key={shown ? '1' : '2'}
                                >
                                    {shown
                                        ? <VscEyeClosed size={20} className={"text-slate-400"}/>
                                        : <VscEye size={20} className={"text-slate-400"}/>
                                    }
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <span
                            className={"text-sm text-red-600 italic"}>{formik.touched.password && formik.errors.password ? formik.errors.password : ''}</span>
                    </div>
                    {/*Remember me*/}
                    <div className={"pt-2 pb-5 text-sm flex justify-between items-center"}>
                        <div className="flex items-center">
                            <input
                                id={'rememberMe'}
                                name={`rememberMe`}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
                                value={formik.values.rememberMe}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label
                                htmlFor={`rememberMe`}
                                className="ml-2 min-w-0 flex-1 font-medium"
                            >
                                Recordarme
                            </label>
                        </div>
                        <Link to={"#"} className={"text-red-500 font-medium"}>Olvidaste tu contraseña?</Link>
                    </div>
                    <button type={'submit'}
                            className={"w-full my-1 md:my-4 bg-red-500 hover:bg-red-400 text-center p-2 text-white font-medium cursor-pointer flex-grow rounded-md"}>
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </motion.div>
    )
}