import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {City, User} from "../../models/interfaces";
import {useFormik} from "formik";
import * as Yup from "yup";
import {apiRequest} from "../../api/request";
import {getErrors} from "../../utils";
import {useSelector} from "react-redux";
import {BsTruck} from "react-icons/bs";
import {selectDepartments} from "../../redux/selector";
import {OrderProduct} from "../../models/interfaces/Order";
import {useMutation, useQueryClient} from "@tanstack/react-query";

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
 * Interface for ShippingAddressForm component props.
 *
 * @interface ShippingAddressFormProps
 * @property {User} user - The user information.
 * @property {OrderProduct[]} products - The products in the order.
 * @property {boolean} isOpen - Whether the modal is open or closed.
 * @property {() => void} onClose - The function to close the modal.
 * @property {(value: boolean) => void} setLoading - The function to set the loading state.
 * @property {(value: boolean) => void} setShowSuccess - The function to set the show success state.
 * @property {(value: boolean) => void} setShowError - The function to set the show error state.
 * @property {(value: string) => void} setErrorMessage - The function to set the error message.
 */
interface ShippingAddressFormProps {
    user: User;
    products: OrderProduct[];
    isOpen: boolean;
    onClose: () => void;
    setLoading: (value: boolean) => void;
    setShowSuccess: (value: boolean) => void;
    setShowError: (value: boolean) => void;
    setErrorMessage: (value: string) => void;
}


/**
 * ShippingAddressForm component.
 *
 * This component displays a form to update the shipping address of the order.
 *
 * @param {ShippingAddressFormProps} props - Props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({
                                                                            user,
                                                                            products,
                                                                            isOpen,
                                                                            setLoading,
                                                                            setShowSuccess,
                                                                            setShowError,
                                                                            setErrorMessage,
                                                                            onClose
                                                                        }: ShippingAddressFormProps) => {

    // Handle click on cancel button
    const handleClick = () => {
        formik.resetForm();
        onClose();
    };

    const departments = useSelector(selectDepartments);

    // Cities to show in the select input
    const [showCities, setShowCities] = useState<Array<City>>([]);

        const queryClient = useQueryClient();

    const addOrderMutation = useMutation({
            mutationFn: (order: any) => {
                return apiRequest('POST', 'data/orders/create/', order);
            },
            onSuccess: (response) => {
                queryClient.invalidateQueries(['apiOrders']).then(r => {
                    if (response.status === 201) {
                        setShowSuccess(true);
                        onClose();
                    } else {
                        const errors = response.data.Errors;
                        setErrorMessage(getErrors(errors));
                        setShowError(true);
                    }
                    setLoading(false)
                });
            },
            onError: (error) => {
                setErrorMessage('Ocurrio un error inesperado');
                setShowError(true);
                setLoading(false);
            }
        });


    // Formik logics
    const formik = useFormik({
        initialValues: {
            address: user.address,
            zipCode: '',
            neighborhood: '',
            departmentId: user.departmentId,
            cityId: user.cityId,
        },

        // Validate form
        validationSchema: Yup.object({
            address: Yup.string().required('Por favor introduce una dirección'),
            zipCode: Yup.string().matches(/\d+/, 'El código postal solo puede contener números').min(6, 'El código postal debe contener 6 caracteres').max(6, 'El código postal no puede exceder los 6 caracteres').required('Por favor introduce un código postal'),
            neighborhood: Yup.string().required('Por favor introduce un barrio'),
            departmentId: Yup.string().required('Por favor selecciona un departamento'),
            cityId: Yup.string().required('Por favor selecciona una ciudad'),
        }),

        // Submit form
        onSubmit: async (values) => {
            setLoading(true);
            let order = {
                shippingAddress: {
                    address: values.address,
                    zipCode: values.zipCode,
                    neighborhood: values.neighborhood,
                    departmentId: values.departmentId,
                    cityId: values.cityId
                },
                products: products,
                online: true
            }

            addOrderMutation.mutate(order);
        },
    });

    // Show cities
    useEffect(() => {
        setShowCities([]);
        const response = apiRequest('GET', `data/cities/department/${formik.values.departmentId}`, undefined, false);
        response.then((response) => {
            let cities: City[] = response.data.sort((a: City, b: City) => a.name.localeCompare(b.name));
            setShowCities(cities);
        });
    }, [formik.values.departmentId]);

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
                className="relative w-[90%] lg:w-[60%] mx-auto"
            >
                <div className="relative rounded-lg shadow-lg bg-white overflow-x-hidden">
                    <div className={`flex items-center px-4 py-4 text-red-500`}>
                        <BsTruck size={48}/>
                        <div className={"ml-4 font-semibold text-lg leading-tight"}>Dirección de entrega</div>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="px-4 pb-4 flex flex-col gap-2">

                        <div className={'grid md:grid-cols-2 gap-x-4 lg:gap-x-8'}>
                            {/* Address input field*/}
                            <div className={"pb-4 w-full"}>
                                <label
                                    className={"block text-sm font-medium pb-1"}
                                    htmlFor="address">
                                    Dirección
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    placeholder="Ingresa la dirección de entrega"
                                    className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span className={"text-sm text-red-600 italic"}>
                                    {formik.touched.address && formik.errors.address ? formik.errors.address : ''}
                                </span>
                            </div>

                            {/* Neighborhood input field*/}
                            <div className={"pb-4 w-full"}>
                                <label
                                    className={"block text-sm font-medium pb-1"}
                                    htmlFor="neighborhood">
                                    Barrio
                                </label>
                                <input
                                    type="text"
                                    id="neighborhood"
                                    name="neighborhood"
                                    placeholder="Ingresa el barrio de entrega"
                                    className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                    value={formik.values.neighborhood}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span className={"text-sm text-red-600 italic"}>
                                    {formik.touched.neighborhood && formik.errors.neighborhood ? formik.errors.neighborhood : ''}
                                </span>
                            </div>


                            {/*Department input field*/}
                            <div className={"pb-4 w-full"}>
                                <label
                                    className={"block text-sm font-medium pb-1"}
                                    htmlFor="departmentId">
                                    Departamento
                                </label>
                                <select
                                    id="departmentId"
                                    name="departmentId"
                                    className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                    value={formik.values.departmentId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder={"Selecciona un departamento"}
                                >
                                    {
                                        departments.map((department) => {
                                            return (
                                                <option key={department.id}
                                                        value={department.id}>{department.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            {/*City input field*/}
                            <div className={"pb-4 w-full"}>
                                <label
                                    className={"block text-sm font-medium pb-1"}
                                    htmlFor="cityId">
                                    Ciudad
                                </label>
                                <select
                                    id="cityId"
                                    name="cityId"
                                    className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                    value={formik.values.cityId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder={"Selecciona una ciudad"}
                                >
                                    {
                                        showCities.length > 0
                                            ? <>
                                                <option value={''}><span className={'italic text-gray-500'}>Selecciona tu ciudad</span>
                                                </option>
                                                {showCities.map((city) => {
                                                    return (
                                                        <option key={city.id} value={city.id}>{city.name}</option>
                                                    )
                                                })
                                                }
                                            </>
                                            : <option value={''}><span className={'italic text-gray-500'}>Cargando las ciudades, por favor espera...</span>
                                            </option>
                                    }
                                </select>
                                <span
                                    className={"text-sm text-red-600 italic"}
                                >
                            {formik.touched.cityId && formik.errors.cityId ? formik.errors.cityId : ''}
                        </span>
                            </div>

                            {/* Zip code input field*/}
                            <div className={"pb-4 w-full"}>
                                <label
                                    className={"block text-sm font-medium pb-1"}
                                    htmlFor="zipCode">
                                    Código Postal
                                </label>
                                <input
                                    type="text"
                                    id="zipCode"
                                    name="zipCode"
                                    placeholder="Ingresa el código postal"
                                    className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                    value={formik.values.zipCode}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span className={"text-sm text-red-600 italic"}>
                                    {formik.touched.zipCode && formik.errors.zipCode ? formik.errors.zipCode : ''}
                                </span>
                            </div>
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
                                Realizar orden
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};

