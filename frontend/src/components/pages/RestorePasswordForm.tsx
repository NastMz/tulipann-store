import {apiRequest} from "../../api/request";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {getErrors} from "../../utils";
import {routes} from "../../config/routes";
import Logo from "../../assets/images/LogoTulipann.svg";
import {LoaderModal, Modal} from "../common";

/**
 * Restore password form component.
 *
 * This component is used to restore the password of a user. Shows a form with an email input.
 *
 * @returns {JSX.Element}
 */
export const RestorePasswordForm = () => {

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
        navigate(routes.home.path);
    }

    // Formik logics
    const formik = useFormik({
        initialValues: {
            email: '',
        },

        // Validate form
        validationSchema: Yup.object({
            email: Yup.string().email('El correo electrónico no es válido').required('Por favor ingrese su correo electrónico'),
        }),

        // Submit form
        onSubmit: async (values) => {
            setLoading(true);

            const response = await apiRequest('POST', `auth/password/restore/`, {email: values.email}, false);

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
                className={"bg-white py-6 px-8 rounded-lg border border-gray-100 shadow-sm w-full md:w-fit"}
            >

                {/* Email */}
                <label
                    className={"block text-sm font-medium pb-2"}
                    htmlFor="newPassword">
                    Correo electrónico asociado a la cuenta que desea recuperar
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
                <button
                    type={"submit"}
                    className={"w-full mt-6 bg-red-500 hover:bg-red-400 text-center p-2 text-white font-medium cursor-pointer flex-grow rounded-md"}
                >
                    Enviar
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
            message="Se ha enviado un correo electrónico a su cuenta con las instrucciones para recuperar su contraseña. Por favor revise su bandeja de entrada. Si no encuentra el correo, revise su bandeja de spam. Si no encuentra el correo en su bandeja de spam, por favor contacte a soporte. Gracias."
            buttonText="Aceptar"
            onButtonClick={() => handleSuccess()}
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
    </motion.div>;
}