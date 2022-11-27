import {Link, useNavigate} from "react-router-dom";
import {FaPaypal} from "react-icons/all";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useState} from "react";
import {AccordionLayout} from "./AccordionLayout";

interface CheckoutFormProps {
    setInfo: Function,
    sendOrder: Function
}


interface OrderInformation {
    contact: any,
    payment: any,
    address: any
}

export const CheckoutForm = (props: CheckoutFormProps) => {

    const info: OrderInformation = {
        contact: undefined,
        payment: undefined,
        address: undefined
    }

    // Formik logics
    const contactFormik = useFormik({
        initialValues: {
            email: '',
            phone: '',
        },

        // Validate form
        validationSchema: Yup.object({
            email: Yup.string().email('El formato del correo no es valido').required('Por favor introduce un correo'),
            phone: Yup.string().matches(/\d+/, 'El teléfono solo puede contener números').min(10, 'El teléfono debe contener 10 caracteres').max(15, 'El teléfono no puede exceder los 15 caracteres').required('Por favor introduce un télefono'),
        }),

        // Submit form
        onSubmit: (values) => {
            info.contact = values;
            setActiveForm(activeForm + 1)
        },
    });

    const paymentFormik = useFormik({
        initialValues: {},

        // Validate form
        validationSchema: Yup.object({}),

        // Submit form
        onSubmit: (values) => {
            info.payment = values;
            setActiveForm(activeForm + 1)
        },
    });

    const addressFormik = useFormik({
        initialValues: {},

        // Validate form
        validationSchema: Yup.object({}),

        // Submit form
        onSubmit: (values) => {
            info.address = values;
            props.setInfo(info);
            props.sendOrder(true);
        },
    });

    // Form interaction
    const [activeForm, setActiveForm] = useState<number>(0);

    const setActiveIndex = (index: number) => {
        setActiveForm(index);
    }

    return (
        <div className={'w-full flex flex-col'}>
            <div className={"flex flex-col gap-2"}>
                <Link
                    to={"#"}
                    className={`mx-auto bg-blue-800 text-white px-10 py-2 rounded-md hover:bg-blue-700 font-medium w-full h-fit flex justify-center items-center`}
                >
                    <FaPaypal/>
                    Paypal
                </Link>
                <Link
                    to={"#"}
                    className={`mx-auto bg-red-500 text-white px-10 py-2 rounded-md hover:bg-red-400 font-medium w-full h-fit flex justify-center  items-center`}
                >
                    <FaPaypal/>
                    Paypal
                </Link>
                <Link
                    to={"#"}
                    className={`mx-auto bg-yellow-500 text-white px-10 py-2 rounded-md hover:bg-yellow-400 font-medium w-full h-fit flex justify-center  items-center`}
                >
                    <FaPaypal/>
                    Paypal
                </Link>
            </div>
            <div className="relative flex pt-5 items-center w-full">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">o</span>
                <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div>
                {/*Contact Information*/}
                <AccordionLayout
                    title={'Información de contacto'}
                    index={0}
                    activeIndex={activeForm}
                    setActiveIndex={setActiveIndex}
                >
                    <form onSubmit={contactFormik.handleSubmit}>
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
                                value={contactFormik.values.email}
                                onChange={contactFormik.handleChange}
                                onBlur={contactFormik.handleBlur}
                            />
                            <span
                                className={"text-sm text-red-600 italic"}>{contactFormik.touched.email && contactFormik.errors.email ? contactFormik.errors.email : ''}</span>
                        </div>
                        {/*Phone input field*/}
                        <div className={"pb-4 w-full"}>
                            <label
                                className={"block text-sm font-medium pb-1"}
                                htmlFor="phone">
                                Teléfono
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Ingresa tu teléfono"
                                className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                value={contactFormik.values.phone}
                                onChange={contactFormik.handleChange}
                                onBlur={contactFormik.handleBlur}
                            />
                            <span
                                className={"text-sm text-red-600 italic"}>{contactFormik.touched.phone && contactFormik.errors.phone ? contactFormik.errors.phone : ''}</span>
                        </div>
                        <button type={'submit'}
                                className={"w-full mt-2 bg-red-500 hover:bg-red-400 text-center p-2 text-white font-medium cursor-pointer flex-grow rounded-md"}>
                            Continuar
                        </button>
                    </form>
                </AccordionLayout>
                {/*Payment details*/}
                <AccordionLayout
                    title={'Información de pago'}
                    index={1}
                    activeIndex={activeForm}
                    setActiveIndex={setActiveIndex}
                >
                    <form onSubmit={paymentFormik.handleSubmit}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam blanditiis consequatur
                            delectus
                            eos ex excepturi facere laborum, nihil non nostrum officia praesentium quaerat tempore,
                            totam,
                            ut veniam voluptate. Dolorem ipsa necessitatibus qui quos reiciendis repellendus sapiente
                            sint
                            sit tenetur veritatis.</p>
                        <button type={'submit'}
                                className={"w-full mt-2 bg-red-500 hover:bg-red-400 text-center p-2 text-white font-medium cursor-pointer flex-grow rounded-md"}>
                            Continuar
                        </button>
                    </form>
                </AccordionLayout>
                {/*Shipping Address*/}
                <AccordionLayout
                    title={'Dirección de entrega'}
                    index={2}
                    activeIndex={activeForm}
                    setActiveIndex={setActiveIndex}
                >
                    <form onSubmit={addressFormik.handleSubmit}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam blanditiis consequatur
                            delectus
                            eos ex excepturi facere laborum, nihil non nostrum officia praesentium quaerat tempore,
                            totam,
                            ut veniam voluptate. Dolorem ipsa necessitatibus qui quos reiciendis repellendus sapiente
                            sint
                            sit tenetur veritatis.</p>
                        <button type={'submit'}
                                className={"w-full mt-2 bg-red-500 hover:bg-red-400 text-center p-2 text-white font-medium cursor-pointer flex-grow rounded-md"}>
                            Ordenar ahora
                        </button>
                    </form>
                </AccordionLayout>
            </div>
        </div>
    )
}