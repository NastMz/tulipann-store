import {apiRequest} from "../../api/request";
import {Link, useNavigate, useParams} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {getErrors} from "../../utils";
import {routes} from "../../config/routes";
import Logo from "../../assets/images/LogoTulipann.svg";
import {LoaderModal, Modal} from "../common";
import {VscEye, VscEyeClosed} from "react-icons/vsc";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {BsArrowRightShort} from "react-icons/bs";
import {validateSession} from "../../api/client";
import {useDispatch} from "react-redux";
import {resetUser} from "../../redux/actions";


/**
 * Verify the token in the restore password URL.
 *
 * @param {string} token - The token to verify.
 * @returns {Promise<boolean>} - True if the token is valid, false otherwise.
 */
async function verifyToken(token: string) {
    const response = await apiRequest('GET', `auth/token/verify/${token}`, undefined, false);
    if (response.status === 200) {
        return true;
    }
    return false;
}


/**
 * Not valid token component.
 *
 * This component is shown when the token in the URL is not valid.
 * @returns {JSX.Element} - The not valid token component.
 */
const NotValidToken = () => {
    return (
        <motion.div
            initial={{width: 0}}
            animate={{width: "100%"}}
            exit={{width: 0}}
            className={"min-h-screen h-fit"}
        >
            <div className={"flex flex-col gap-8 justify-start items-center h-screen bg-gray-50 p-4 md:p-8"}>
                <div className={"flex flex-col items-center justify-center text-center gap-4"}>
                    <div className={"h-24"}>
                        <img src={Logo} alt={Logo} className={`h-full w-full object-cover`}/>
                    </div>
                    <div>
                        <h1 className={"text-3xl font-bold"}>Recuperar contraseña</h1>
                    </div>
                </div>
                <div
                    className={"bg-white py-6 px-8 rounded-lg border border-gray-100 shadow-sm w-full md:w-96 min-h-48 flex flex-col gap-4 justify-center items-center text-center text-gray-500 font-medium text-lg"}>
                    <AiOutlineCloseCircle size={64} className={"text-red-500"}/>
                    <p>Parece que el enlace de recuperación es invalido o ya expiro.</p>
                    <Link to={"/"} className={"font-medium text-sm text-red-600 flex justify-center items-center"}>
                        <span>Regresar al inicio</span> <BsArrowRightShort size={20} className={""}/>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}


/**
 * Restore password form component.
 *
 * This component is shown when the token in the URL is valid.
 * @param props
 * @constructor
 */
const RestorePasswordForm = ({token}: { token: string; }) => {

    // Show new password
    const [shown2, setShown2] = useState<boolean>(false);

    const switchShown2 = () => setShown2(!shown2);

    // Show repeat password
    const [shown3, setShown3] = useState<boolean>(false);

    const switchShown3 = () => setShown3(!shown3);

    // Loading state
    const [loading, setLoading] = useState<boolean>(false);

    // Show success modal state
    const [showSuccess, setShowSuccess] = useState(false);

    // Show error modal state
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const handleSuccess = () => {
        setShowSuccess(false);
        navigate(routes.login.path);
    }

    // Formik logics
    const formik = useFormik({
        initialValues: {
            newPassword: '',
            repeatPassword: ''
        },

        // Validate form
        validationSchema: Yup.object({
            newPassword: Yup.string().min(8, 'La contraseña debe contener minimo 8 caracteres').required('Por favor introduce una contraseña'),
            repeatPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Las contraseñas no coinciden').required('Por favor repite la contraseña'),
        }),

        // Submit form
        onSubmit: async (values) => {
            setLoading(true);

            const response = await apiRequest('PUT', `auth/password/change/${token}`, {newPassword: values.newPassword}, false);

            if (response.status === 200) {
                setLoading(false);
                setShowSuccess(true);
            } else {
                const errors = response.data.Errors;
                setErrorMessage(getErrors(errors));
                setLoading(false);
                setShowError(true);
            }
        },
    });

    return <motion.div
        initial={{width: 0}}
        animate={{width: "100%"}}
        exit={{width: 0}}
        className={"min-h-screen h-fit"}
    >
        <div
            className={"flex flex-col gap-8 justify-start items-center h-screen bg-gray-50 p-4 md:p-8"}>
            <div className={"flex flex-col items-center justify-center text-center gap-4"}>
                <div className={"h-24"}>
                    <img src={Logo} alt={Logo} className={`h-full w-full object-cover`}/>
                </div>
                <div>
                    <h1 className={"text-3xl font-bold"}>Recuperar contraseña</h1>
                </div>
            </div>
            <form
                onSubmit={formik.handleSubmit}
                className={"bg-white py-6 px-8 rounded-lg border border-gray-100 shadow-sm w-full md:w-96"}
            >

                {/* New Password */}
                <label
                    className={"block text-sm font-medium pb-1"}
                    htmlFor="newPassword">
                    Contraseña nueva
                </label>
                <div className="w-full h-fit relative">
                    <input
                        type={shown2 ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        placeholder="Ingresa tu nueva contraseña"
                        className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <AnimatePresence>
                        <motion.div
                            initial={{opacity: 0, scale: 0.5}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.5}}
                            className="absolute h-full right-3 top-0 flex justify-center items-center cursor-pointer"
                            onClick={() => switchShown2()}

                        >
                            {shown2
                                ? <VscEyeClosed size={20} className={"text-slate-400"}/>
                                : <VscEye size={20} className={"text-slate-400"}/>
                            }
                        </motion.div>
                    </AnimatePresence>
                </div>
                <span
                    className={"text-sm text-red-600 italic"}>{formik.touched.newPassword && formik.errors.newPassword ? formik.errors.newPassword : ""}</span>

                {/* Repeat New Password */}
                <label
                    className={"block text-sm font-medium pb-1"}
                    htmlFor="repeatPassword">
                    Repite la contraseña nueva
                </label>
                <div className="w-full h-fit relative">
                    <input
                        type={shown3 ? "text" : "password"}
                        id="repeatPassword"
                        name="repeatPassword"
                        placeholder="Repite tu nueva contraseña"
                        className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                        value={formik.values.repeatPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <AnimatePresence>
                        <motion.div
                            initial={{opacity: 0, scale: 0.5}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.5}}
                            className="absolute h-full right-3 top-0 flex justify-center items-center cursor-pointer"
                            onClick={() => switchShown3()}

                        >
                            {shown3
                                ? <VscEyeClosed size={20} className={"text-slate-400"}/>
                                : <VscEye size={20} className={"text-slate-400"}/>
                            }
                        </motion.div>
                    </AnimatePresence>
                </div>
                <span
                    className={"text-sm text-red-600 italic"}>{formik.touched.repeatPassword && formik.errors.repeatPassword ? formik.errors.repeatPassword : ""}</span>
                <button
                    type={"submit"}
                    className={"w-full mt-2 bg-red-500 hover:bg-red-400 text-center p-2 text-white font-medium cursor-pointer flex-grow rounded-md"}
                >
                    Cambiar
                </button>
            </form>
        </div>

        {/* Loader modal */}
        <LoaderModal isOpen={loading}/>

        {/* Success alert */}
        <Modal
            isOpen={showSuccess}
            onClose={() => handleSuccess()}
            type="success"
            title="Éxito"
            message="Contraseña actualizada correctamente"
            buttonText="Aceptar"
            onButtonClick={() => handleSuccess()}
        />

        {/* Error alert */}
        <Modal
            isOpen={showSuccess}
            onClose={() => setShowError(false)}
            type="error"
            title="Error"
            message={errorMessage}
            buttonText="Aceptar"
            onButtonClick={() => setShowError(false)}
        />
    </motion.div>;
}

/**
 * Restore password page.
 *
 * This page is used to restore the password of a user.
 *
 * @returns {JSX.Element} - The restore password page.
 */
export const RestorePassword = () => {

    // State to show the logged alert modal when the user is logged in and tries to access this page.
    const [showLoggedAlert, setShowLoggedAlert] = useState<boolean>(false);

    // State to know if the user wants to delete the session and continue with the restore password process.
    const [deleteSession, setDeleteSession] = useState<boolean>(false);

    const [isLogged, setIsLogged] = useState<boolean>(false);

    // Check if the user is logged in.
    validateSession().then((response) => {
        if (response) {
            setIsLogged(true);
            setShowLoggedAlert(true);
        }
    });

    // Get the token from the URL
    const {token} = useParams();


    // Send the token to the server for validation
    let isValid = false;
    if (token !== undefined) {
        verifyToken(token).then((response) => {
            isValid = response;
        });
    }

    const navigate = useNavigate();


    const dispatch = useDispatch();

    const handleDeleteSession = () => {
        localStorage.removeItem('id_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_token');
        sessionStorage.removeItem('id_token');
        sessionStorage.removeItem('refresh_token');
        sessionStorage.removeItem('access_token');

        dispatch(resetUser);

        setShowLoggedAlert(false);
        setDeleteSession(true);
    }

    if (!isValid) {
        return (
            <div className={'min-h-screen'}>
                <Modal
                    title={'Atención'}
                    message={'Tienes una sesión activa, si continúas se cerrará la sesión actual y podrás recuperar tu contraseña.'}
                    buttonText={'Continuar'}
                    isOpen={showLoggedAlert}
                    onClose={() => navigate('/')}
                    onButtonClick={() => handleDeleteSession()}
                    type={"warning"}
                />
                {
                    isLogged
                        ? deleteSession && <NotValidToken/>
                        : <NotValidToken/>
                }
            </div>
        )
    } else {
        return (
            <div className={'min-h-screen'}>
                <Modal
                    title={'Atención'}
                    message={'Tienes una sesión activa, si continúas se cerrará la sesión actual y podrás recuperar tu contraseña.'}
                    buttonText={'Continuar'}
                    isOpen={showLoggedAlert}
                    onClose={() => navigate('/')}
                    onButtonClick={() => handleDeleteSession()}
                    type={"warning"}
                />
                {
                    isLogged
                        ? deleteSession && <RestorePasswordForm token={token ?? ''}/>
                        : <RestorePasswordForm token={token ?? ''}/>
                }
            </div>
        )
    }
}