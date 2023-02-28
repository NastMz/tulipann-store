import {motion} from "framer-motion";
import {Order, UpdateOrder} from "../../models/interfaces";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {BiCategoryAlt} from "react-icons/bi";
import {updateOrder} from "../../api/data";
import {getErrors} from "../../utils";
import {useSelector} from "react-redux";
import {selectOrderStatus} from "../../redux/selector";
import {useEffect} from "react";

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
 * Interface for OrderForm component props.
 *
 * @interface OrderFormProps
 * @property {Order} order - The order information.
 * @property {boolean} isOpen - Whether the modal is open or closed.
 * @property {() => void} onClose - The function to close the modal.
 * @property {(value: boolean) => void} setLoading - The function to set the loading state.
 * @property {(value: boolean) => void} setShowSuccess - The function to set the show success state.
 * @property {(value: string) => void} setSuccessMessage - The function to set the success message.
 * @property {(value: boolean) => void} setShowError - The function to set the show error state.
 * @property {(value: string) => void} setErrorMessage - The function to set the error message.
 */
interface OrderFormProps {
    order: Order | null;
    isOpen: boolean;
    onClose: () => void;
    setLoading: (value: boolean) => void;
    setShowSuccess: (value: boolean) => void;
    setSuccessMessage: (value: string) => void;
    setShowError: (value: boolean) => void;
    setErrorMessage: (value: string) => void;
}


/**
 * OrderForm component.
 *
 * This component displays a form to update a categoryId's information.
 *
 * @param {OrderFormProps} props - Props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const OrderForm = ({
                              order,
                              isOpen,
                              setLoading,
                              setShowSuccess,
                              setSuccessMessage,
                              setShowError,
                              setErrorMessage,
                              onClose,
                          }: OrderFormProps) => {

    // Handle click on cancel button
    const closeForm = () => {
        formik.resetForm();
        onClose();
    };

    const queryClient = useQueryClient();

    const updateOrderMutation = useMutation({
        mutationFn: updateOrder,
        onSuccess: (response) => {
            queryClient.invalidateQueries(['apiOrders']).then(r => {
                if (response.status === 200) {
                    setSuccessMessage('Orden actualizada exitosamente');
                    setShowSuccess(true);
                    closeForm();
                } else {
                    const errors = getErrors(response.data.Errors);
                    setErrorMessage(errors);
                    setShowError(true);
                }
                setLoading(false)
            });
        },
        onError: (error: any) => {
            setLoading(false);
            setShowError(true);
            let errorMsg = getErrors(error.response.data.Errors);

            if (errorMsg) {
                setErrorMessage(errorMsg);
            } else {
                setErrorMessage('Ha ocurrido un error inesperado.');
            }
        }
    });

    // Formik logics
    const formik = useFormik({
        initialValues: {
            stateId: '',
            shippingValue: '',
        },

        // Validate form
        validationSchema: Yup.object({
            stateId: Yup.string().required('Por favor ingrese el estado de la orden'),
            shippingValue: Yup.string().required('Por favor ingrese el valor del envío'),
        }),

        // Submit form
        onSubmit: async (values) => {
            setLoading(true);
            if (order) {
                const updatedOrder: UpdateOrder = {
                    stateId: values.stateId,
                    shippingValue: Number(values.shippingValue),
                };

                updateOrderMutation.mutate({id: order.id, order: updatedOrder});
            }
        },
    });

    useEffect(() => {
        if (order) {
            const setFormValues = () => {
                formik.setValues({
                    shippingValue: '',
                    stateId: order.stateId,
                });
            };
            setFormValues();
        }
    }, [order]);

    // @ts-ignore
    let states = useSelector(selectOrderStatus);

    return (
        <motion.div
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
            exit="closed"
            variants={backgroundVariants}
            className={`${
                isOpen ? 'block' : 'hidden'
            } fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center`}
        >
            <motion.div
                initial="closed"
                animate={isOpen ? 'open' : 'closed'}
                exit="closed"
                transition={{delay: 0.2}}
                variants={modalVariants}
                className="rounded-lg bg-white relative w-[90%] lg:w-[60%] mx-auto max-h-[90%] overflow-y-auto rounded-lg shadow-lg overflow-x-hidden"
            >
                <div className="relative">
                    <div className={`flex items-center px-4 py-4 text-red-500`}>
                        <BiCategoryAlt size={48}/>
                        <div className={"ml-4 font-semibold text-lg leading-tight"}>
                            Actualizar orden
                        </div>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="px-4 pb-4 flex flex-col gap-2">

                        <div className={'grid md:grid-cols-1 gap-x-4 lg:gap-x-8'}>
                            {/* Name input field*/}
                            <div className={"pb-4 w-full"}>
                                <label
                                    className={"block text-sm font-medium pb-4"}
                                    htmlFor="shippingValue">
                                    Valor del envío
                                </label>
                                <input
                                    type="number"
                                    id="shippingValue"
                                    name="shippingValue"
                                    placeholder="99999"
                                    className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                    value={formik.values.shippingValue}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span className={"text-sm text-red-600 italic"}>
                                    {formik.touched.shippingValue && formik.errors.shippingValue ? formik.errors.shippingValue : ''}
                                </span>
                            </div>

                        </div>

                        <div className={'grid md:grid-cols-1 gap-x-4 lg:gap-x-8'}>
                            {/* State input field*/}

                            <label
                                className={"block text-sm font-medium pb-4"}
                                htmlFor="stateId"
                            >
                                Estado de la orden
                            </label>

                            {
                                states.length > 0 ? (
                                        <select
                                            id="stateId"
                                            name="stateId"
                                            className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                            value={formik.values.stateId}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            <option value=''>Selecciona un estado</option>
                                            {
                                                states.map((state) => {
                                                    return (
                                                        <option key={state.id}
                                                                value={state.id}>{state.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    )
                                    : (
                                        <div className={'flex gap-2 flex-wrap p-4'}>
                                            <span className={'text-sm text-gray-500'}>No hay estados disponibles, por favor cree uno nuevo</span>
                                        </div>
                                    )
                            }
                            <span className={"text-sm text-red-600 italic"}>
                                    {formik.touched.stateId && formik.errors.stateId ? formik.errors.stateId : ''}
                                </span>
                        </div>

                        <div className="px-4 py-4 flex gap-8 justify-center">
                            <button
                                type={'button'}
                                className="px-4 py-2 rounded-md text-sm font-semibold bg-slate-400 hover:bg-slate-500 focus:outline-none focus:bg-slate-500"
                                onClick={closeForm}
                            >
                                Cancelar
                            </button>
                            <button
                                type={'submit'}
                                className="ml-4 px-4 py-2 rounded-md text-white text-sm font-semibold bg-red-600 hover:bg-red-500 focus:outline-none focus:bg-red-500"
                            >
                                Actualizar
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};

