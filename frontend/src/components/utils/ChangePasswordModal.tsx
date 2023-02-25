import React, {MouseEventHandler, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {User} from "../../models/interfaces";
import {useFormik} from "formik";
import * as Yup from "yup";
import {apiRequest} from "../../api/request";
import {getErrors} from "../../utils";
import {VscEye, VscEyeClosed} from "react-icons/vsc";
import {setUser} from "../../redux/actions";
import {useDispatch} from "react-redux";
import {HiOutlineKey} from "react-icons/hi";

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
 * Interface for ChangePasswordModal component props.
 *
 * @interface ChangePasswordModalProps
 * @property {User} user - The user information.
 * @property {boolean} isOpen - Whether the modal is open or closed.
 * @property {() => void} onClose - The function to close the modal.
 * @property {(value: boolean) => void} setLoading - The function to set the loading state.
 * @property {(value: boolean) => void} setShowSuccess - The function to set the show success state.
 * @property {(value: boolean) => void} setShowError - The function to set the show error state.
 * @property {(value: string) => void} setErrorMessage - The function to set the error message.
 */
interface ChangePasswordModalProps {
    user: User;
    isOpen: boolean;
    onClose: () => void;
    setLoading: (value: boolean) => void;
    setShowSuccess: (value: boolean) => void;
    setShowError: (value: boolean) => void;
    setErrorMessage: (value: string) => void;
}


/**
 * ChangePasswordModal component.
 *
 * This component displays a modal with a form to change the user's password.
 *
 * @param {ChangePasswordModalProps} props - Props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
                                                                            user,
                                                                            isOpen,
                                                                            setLoading,
                                                                            setShowSuccess,
                                                                            setShowError,
                                                                            setErrorMessage,
                                                                            onClose
                                                                        }: ChangePasswordModalProps) => {
    // Create a ref for the modal element
    const modalRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();

    // Handle click events on the modal element
    const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
        // Check if the clicked element is the modal element or one of its descendants
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            formik.resetForm();
            // If it's not, then close the modal
            onClose();
        }
    };


    // Formik logics
    const formik = useFormik({
        initialValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            oldPassword: '',
            newPassword: '',
            repeatPassword: '',
            phone: user.phone,
            address: user.address,
            departmentId: user.departmentId,
            cityId: user.cityId,
        },

        // Validate form
        validationSchema: Yup.object({
            newPassword: Yup.string().min(8, 'La contraseña debe contener minimo 8 caracteres').required('Por favor introduce una contraseña'),
            repeatPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Las contraseñas no coinciden').required('Por favor repite la contraseña'),
        }),

        // Submit form
        onSubmit: async (values) => {
            setLoading(true);
            let user = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
                phone: values.phone,
                address: values.address,
                departmentId: values.departmentId,
                cityId: values.cityId
            }

            const response = await apiRequest('PUT', 'data/user/update/', user);

            if (response.status === 200) {
                let newUser = apiRequest('GET', 'data/user/');
                newUser.then(res => {
                    dispatch(setUser(res.data));
                    setShowSuccess(true);
                    onClose();
                }).catch(err => {
                    setErrorMessage('Ha ocurrido un error al actualizar la contraseña');
                    setShowError(true);
                });
                setLoading(false);

            } else {
                const errors = response.data.Errors;
                setErrorMessage(getErrors(errors));
                setLoading(false);
                setShowError(true);
            }
        },
    });

    // Show password
    const [shown, setShown] = useState<boolean>(false);

    const switchShown = () => setShown(!shown);

    // Show new password
    const [shown2, setShown2] = useState<boolean>(false);

    const switchShown2 = () => setShown2(!shown2);

    // Show repeat password
    const [shown3, setShown3] = useState<boolean>(false);

    const switchShown3 = () => setShown3(!shown3);

    return (
        <motion.div
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
            exit="closed"
            variants={backgroundVariants}
            className={`${
                isOpen ? 'block' : 'hidden'
            } fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center`}
            onClick={handleClick}
        >
            <motion.div
                initial="closed"
                animate={isOpen ? 'open' : 'closed'}
                exit="closed"
                transition={{delay: 0.2}}
                variants={modalVariants}
                ref={modalRef}
                className="relative w-96 mx-auto"
            >
                <div className="relative rounded-lg shadow-lg bg-white overflow-x-hidden p-6">
                    <div className={`flex items-center px-4 py-4 text-red-500`}>
                        <HiOutlineKey size={48}/>
                        <div className="font-semibold text-lg leading-tight">Cambiar contraseña</div>
                    </div>
                    <form onSubmit={formik.handleSubmit} className="px-4 pb-4 flex flex-col gap-2">
                        {/* Old Password */}
                        <label
                            className={"block text-sm font-medium pb-1"}
                            htmlFor="oldPassword">
                            Contraseña actual
                        </label>
                        <div className="w-full h-fit relative">
                            <input
                                type={shown ? 'text' : 'password'}
                                id="oldPassword"
                                name="oldPassword"
                                placeholder="Ingresa tu contraseña actual"
                                className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                value={formik.values.oldPassword}
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
                            className={"text-sm text-red-600 italic"}>{formik.touched.oldPassword && formik.errors.oldPassword ? formik.errors.oldPassword : ''}</span>

                        {/* New Password */}
                        <label
                            className={"block text-sm font-medium pb-1"}
                            htmlFor="newPassword">
                            Contraseña nueva
                        </label>
                        <div className="w-full h-fit relative">
                            <input
                                type={shown2 ? 'text' : 'password'}
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
                                    key={shown2 ? '1' : '2'}
                                >
                                    {shown2
                                        ? <VscEyeClosed size={20} className={"text-slate-400"}/>
                                        : <VscEye size={20} className={"text-slate-400"}/>
                                    }
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <span
                            className={"text-sm text-red-600 italic"}>{formik.touched.newPassword && formik.errors.newPassword ? formik.errors.newPassword : ''}</span>

                        {/* Repeat New Password */}
                        <label
                            className={"block text-sm font-medium pb-1"}
                            htmlFor="repeatPassword">
                            Repite la contraseña nueva
                        </label>
                        <div className="w-full h-fit relative">
                            <input
                                type={shown3 ? 'text' : 'password'}
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
                                    key={shown3 ? '1' : '2'}
                                >
                                    {shown3
                                        ? <VscEyeClosed size={20} className={"text-slate-400"}/>
                                        : <VscEye size={20} className={"text-slate-400"}/>
                                    }
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <span
                            className={"text-sm text-red-600 italic"}>{formik.touched.repeatPassword && formik.errors.repeatPassword ? formik.errors.repeatPassword : ''}</span>
                        <button
                            type={'submit'}
                            className={"w-full mt-2 bg-red-500 hover:bg-red-400 text-center p-2 text-white font-medium cursor-pointer flex-grow rounded-md"}
                        >
                            Cambiar
                        </button>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};

