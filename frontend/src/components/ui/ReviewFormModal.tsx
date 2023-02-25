import React, {useState} from "react";
import {motion} from "framer-motion";
import {User} from "../../models/interfaces";
import {useFormik} from "formik";
import * as Yup from "yup";
import {apiRequest} from "../../api/request";
import {getErrors} from "../../utils";
import {BiCommentDetail} from "react-icons/bi";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {LoaderModal, Modal} from "../common";
import {AiFillStar} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {routes} from "../../config/routes";

/**
 * Variants for animating the modal.
 *
 * @type {import('framer-motion').Variants}
 */
const modalVariants = {
    open: {scale: 1},
    closed: {scale: 0},
};

/**
 * Variants for animating the background.
 *
 * @type {import('framer-motion').Variants}
 */
const backgroundVariants = {
    open: {opacity: 1},
    closed: {opacity: 0},
};


/**
 * Interface for ReviewFormModal component props.
 *
 * @interface ReviewFormModalProps
 * @property {User} user - The user information.
 * @property {string} productId - The product id to be reviewed.
 * @property {boolean} isOpen - Whether the modal is open or closed.
 * @property {() => void} onClose - The function to close the modal.
 * @property {(value: boolean) => void} setLoading - The function to set the loading state.
 * @property {(value: boolean) => void} setShowSuccess - The function to set the show success state.
 * @property {(value: boolean) => void} setShowError - The function to set the show error state.
 * @property {(value: string) => void} setErrorMessage - The function to set the error message.
 */
interface ReviewFormModalProps {
    user: User;
    productId: string;
    isOpen: boolean;
    onClose: () => void;
}


/**
 * ReviewFormModal component.
 *
 * This component displays a form to add a review to a product.
 *
 * @param {ReviewFormModalProps} props - Props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const ReviewFormModal = ({
                                    user,
                                    productId,
                                    isOpen,
                                    onClose
                                }: ReviewFormModalProps) => {

    // Loading state
    const [loading, setLoading] = useState<boolean>(false);

    // Show success modal state
    const [showSuccess, setShowSuccess] = useState(false);

    // Show error modal state
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [rate, setRate] = useState(5);
    const [hoverRate, setHoverRate] = useState(5);

    // Handle click on cancel button
    const handleClick = () => {
        formik.resetForm();
        onClose();
    };

    const closeSuccessModal = () => {
        setShowSuccess(false);
    }

    const queryClient = useQueryClient();

    const addCommentaryMutation = useMutation({
        mutationFn: (commentary: any) => {
            return apiRequest('POST', 'data/commentaries/create/', commentary);
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries(['apiProducts']).then(r => {
                if (response.status === 201) {
                    setShowSuccess(true);
                    handleClick();
                } else {
                    const errors = response.data.Errors;
                    setErrorMessage(getErrors(errors));
                    setShowError(true);
                }
                setLoading(false)
            });
        },
        onError: (error) => {
            setErrorMessage('Ocurrio un error al registrar tu reseña. Por favor intenta de nuevo.');
            setShowError(true);
            setLoading(false);
        }
    });


    // Formik logics
    const formik = useFormik({
        initialValues: {
            text: "",
        },

        // Validate form
        validationSchema: Yup.object({
            text: Yup.string().max(255, 'Su reseña no puede contener mas de 255 caracteres').required('Por favor introduce tu reseña'),
        }),

        // Submit form
        onSubmit: async (values) => {
            setLoading(true);
            let commentary = {
                rate: rate,
                text: values.text,
                productId: productId
            }

            addCommentaryMutation.mutate(commentary);
        },
    });

    if (user.id === "") {
        const [showLoginError, setShowLoginError] = useState(true);
        const navigate = useNavigate();
        return (
        <Modal
            isOpen={showLoginError}
            onClose={() => setShowLoginError(false)}
            type="error"
            title="Error"
            message={'Para poder realizar una reseña debes iniciar sesión.'}
            buttonText="Ir a Iniciar Sesión"
            onButtonClick={() => navigate(routes.login.path)}
        />
        )
    } else {

        return (
            <motion.div
                initial="closed"
                animate={isOpen ? 'open' : 'closed'}
                exit="closed"
                variants={backgroundVariants}
                className={`${
                    isOpen ? 'block' : 'hidden'
                } fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center`}
            >
                <motion.div
                    initial="closed"
                    animate={isOpen ? 'open' : 'closed'}
                    exit="closed"
                    transition={{delay: 0.2}}
                    variants={modalVariants}
                    className="relative w-96 mx-auto"
                >
                    <div className="relative rounded-lg shadow-lg bg-white overflow-x-hidden">
                        <div className={`flex items-center px-4 py-4 text-red-500`}>
                            <BiCommentDetail size={48}/>
                            <div className={"ml-4 font-semibold text-lg leading-tight"}>Deja tu reseña</div>
                        </div>

                        <form onSubmit={formik.handleSubmit} className="px-4 pb-4 flex flex-col gap-2">

                            {/*Rate input field*/}
                            <div className={"pb-4 w-full flex-grow flex flex-col"}>
                                <span
                                    className={"block text-sm font-medium pb-1 flex justify-between"}>Calificación</span>
                                <div className={"flex items-center gap-1"}>
                                    {[...Array(5)].map((star, index) => {
                                        return (
                                            hoverRate > index
                                                ? (
                                                    <AiFillStar
                                                        key={Math.random()}
                                                        onClick={() => setRate(index + 1)}
                                                        size={30}
                                                        className={"cursor-pointer text-yellow-400"}
                                                        onMouseEnter={() => setHoverRate(index + 1)}
                                                        onMouseLeave={() => setHoverRate(rate)}
                                                    />
                                                )
                                                : (
                                                    <AiFillStar
                                                        key={Math.random()}
                                                        onClick={() => setRate(index + 1)}
                                                        size={30}
                                                        className={"cursor-pointer text-gray-400"}
                                                        onMouseEnter={() => setHoverRate(index + 1)}
                                                        onMouseLeave={() => setHoverRate(rate)}
                                                    />
                                                )
                                        );
                                    })}
                                </div>
                            </div>

                            {/*Commentary input field*/}
                            <div className={"pb-4 w-full flex-grow flex flex-col"}>
                                <label
                                    className={"block text-sm font-medium pb-1 flex justify-between"}
                                    htmlFor="text">
                                    Reseña
                                    <span
                                        className={'text-slate-400 font-normal'}>
                                    {
                                        0 < 255 - formik.values.text.length && 255 - formik.values.text.length < 255
                                            ? `${255 - formik.values.text.length} caracteres restantes`
                                            : 'Máximo 255 caracteres'}
                                </span>
                                </label>
                                <textarea
                                    id="text"
                                    name="text"
                                    placeholder="Ingresa tu reseña"
                                    className={"resize-none border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full flex-grow"}
                                    value={formik.values.text}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span
                                    className={"text-sm text-red-600 italic"}
                                >
                                {formik.touched.text && formik.errors.text ? formik.errors.text : ''}
                            </span>
                            </div>

                            <div className="px-4 py-4 bg-gray-100 flex justify-center">
                                <button
                                    type={'button'}
                                    className="px-4 py-2 rounded-md text-sm font-semibold bg-gray-400 hover:bg-gray-500 focus:outline-none focus:bg-gray-500"
                                    onClick={handleClick}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type={'submit'}
                                    className="ml-4 px-4 py-2 rounded-md text-white text-sm font-semibold bg-red-600 hover:bg-red-500 focus:outline-none focus:bg-red-500"
                                >
                                    Enviar reseña
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>

                {/* Loader modal */}
                <LoaderModal isOpen={loading}/>

                {/* Success alert */}
                <Modal
                    isOpen={showSuccess}
                    onClose={() => closeSuccessModal()}
                    type="success"
                    title="Éxito"
                    message="Tu reseña ha sido registrada con éxito"
                    buttonText="Aceptar"
                    onButtonClick={() => closeSuccessModal()}
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
            </motion.div>
        );
    }
};

