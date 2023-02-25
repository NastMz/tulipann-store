import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import React, {useEffect, useState} from "react";
import {AccordionLayout, LoaderModal, Modal} from "../common";
import {PayUButton} from "../utils";
import {Order, OrderProduct} from "../../models/interfaces/Order";
import {useDispatch, useSelector} from "react-redux";
import {selectDepartments, selectUser} from "../../redux/selector";
import {emptyCart} from "../../redux/actions";
import {routes} from "../../config/routes";
import {City} from "../../models/interfaces";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {apiRequest} from "../../api/request";
import {getErrors} from "../../utils";


/**
 * Interface for CheckoutForm component props
 *
 * @interface CheckoutFormProps
 * @property {Function} setInfo - Function to set order information.
 * @property {Function} sendOrder - Function to send order.
 * @property {Array<>}
 */
interface CheckoutFormProps {
    products: OrderProduct[];
}

/**
 * Interface for order information
 *
 * @interface OrderInformation
 * @property {any} contact - Contact information.
 * @property {any} payment - Payment information.
 * @property {any} address - Address information.
 */
interface OrderInformation {
    order: Order;
}

/**
 * CheckoutForm component.
 *
 * This component displays a form to collect order information.
 *
 * @param {CheckoutFormProps} props - Props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const CheckoutForm = (props: CheckoutFormProps) => {

    // Form interaction
    const [activeForm, setActiveForm] = useState<number>(0);

    const setActiveIndex = (index: number) => {
        setActiveForm(index);
    }

    // Loading state
    const [loading, setLoading] = useState<boolean>(false);

    // Show success modal state
    const [showSuccess, setShowSuccess] = useState(false);

    // Show error modal state
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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

    // Navigate hook
    const navigate = useNavigate();

    // Dispatch hook
    const dispatch = useDispatch();

    const user = useSelector(selectUser);

    const closeModal = () => {
        dispatch(emptyCart());
        setShowSuccess(false);
        navigate(routes.catalog.path)
    }

    const redirectToOrders = () => {
        dispatch(emptyCart());
        setShowSuccess(false);
        navigate(routes.orderHistory.path);
    }


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
                products: props.products,
                online: false
            }

            addOrderMutation.mutate(order);
        },
    });

    // Show cities
    useEffect(() => {
        setShowCities([]);
        const response = apiRequest('GET', `data/cities/department/${formik.values.departmentId}`, null, false);
        response.then((response) => {
            let cities: City[] = response.data.sort((a: City, b: City) => a.name.localeCompare(b.name));
            setShowCities(cities);
        });
    }, [formik.values.departmentId]);

    return (
        <div className={'w-full flex flex-col'}>
            <div className={"flex flex-col gap-2"}>
                <PayUButton products={props.products}/>
            </div>
            <div className="relative flex pt-5 items-center w-full">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">o</span>
                <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div>
                {/*Payment details*/}
                <AccordionLayout
                    title={'Pago contraentrega'}
                    index={0}
                    activeIndex={activeForm}
                    setActiveIndex={setActiveIndex}
                    titleClass={`${activeForm === 0 ? 'pointer-events-none text-black' : 'text-gray-400 cursor-pointer'} ${activeForm < 1 ? 'pointer-events-none' : 'hover:text-black'}`}
                >
                    <div className={'flex flex-col gap-4'}>
                        <p>Le informamos que para realizar el pago contra entrega, deberá enviar un mensaje de WhatsApp
                            con su número de orden y hablar con nuestro personal para que le indiquen cómo realizar su
                            pago. Asegúrese de tener a mano su número de orden y de contactar a nuestro personal para
                            evitar retrasos en la entrega de su pedido.</p>
                        <button
                            onClick={() => setActiveIndex(1)}
                            className={"w-full mt-2 bg-red-500 hover:bg-red-400 text-center p-2 text-white font-medium cursor-pointer flex-grow rounded-md"}
                        >
                            Continuar
                        </button>
                    </div>
                </AccordionLayout>
                {/*Shipping Address*/}
                <AccordionLayout
                    title={'Dirección de entrega'}
                    index={1}
                    activeIndex={activeForm}
                    setActiveIndex={setActiveIndex}
                    titleClass={`${activeForm === 1 ? 'pointer-events-none text-black' : 'text-gray-400 cursor-pointer'} ${activeForm < 2 ? 'pointer-events-none' : 'hover:text-black'}`}
                >
                    <form onSubmit={formik.handleSubmit} className="px-4 pb-4 flex flex-col gap-2 overflow-y-auto h-96">
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
                                placeholder={"Selecciona tu ciudad"}
                            >
                                {
                                    showCities.length > 0
                                        ? <>
                                            <option value={''}><span
                                                className={'italic text-gray-500'}>Selecciona tu ciudad</span>
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
                        <button type={'submit'}
                                className={"w-full mt-2 bg-red-500 hover:bg-red-400 text-center p-2 text-white font-medium cursor-pointer flex-grow rounded-md"}>
                            Ordenar ahora
                        </button>
                    </form>
                </AccordionLayout>
            </div>

            {/* Loader modal */}
            <LoaderModal isOpen={loading}/>

            {/* Success alert */}
            <Modal
                isOpen={showSuccess}
                onClose={() => closeModal()}
                type="success"
                title="Éxito"
                message="Se ha registrado su orden con éxito. De clic en el botón para ver sus ordenes. O puede continuar comprando."
                buttonText="Ir a Mis Ordenes"
                onButtonClick={() => redirectToOrders()}
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
        </div>
    )
}