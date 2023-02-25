import {motion} from "framer-motion";
import {FiMail, FiPhone} from "react-icons/fi";
import {useFormik} from "formik";
import * as Yup from "yup";

/**
 * Contact component.
 *
 * This component displays a form to email the website owner.
 *
 * @returns {ReactNode} The rendered component.
 */
export const Contact = () => {

    // Formik logics
    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
        },

        // Validate form
        validationSchema: Yup.object({
            name: Yup.string().max(30, 'El nombre no puede exceder los 30 caracteres').required('Por favor introduce un nombre'),
            lastname: Yup.string().max(30, 'El apellido no puede exceder los 30 caracteres').required('Por favor introduce un apellido'),
            email: Yup.string().email('El formato del correo no es valido').required('Por favor introduce un correo'),
            phone: Yup.string().matches(/\d+/, 'El teléfono solo puede contener números').min(10, 'El teléfono debe contener 10 caracteres').max(15, 'El teléfono no puede exceder los 15 caracteres'),
            subject: Yup.string().required('Por favor introduce un asunto'),
            message: Yup.string().max(500, 'El mensaje no puede exceder los 500 caracteres').required('Por favor introduce un mensaje')
        }),

        // Submit form
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <motion.div
            initial={{width: 0}}
            animate={{width: '100%'}}
            exit={{width: 0}}
            className={"min-h-screen h-fit overflow-hidden w-full grid grid-cols-1 lg:grid-cols-4"}
        >
            <div
                className={'p-12 flex flex-col gap-6 justify-items-start bg-gradient-to-bl from-red-500 to-red-800 w-full h-fit md:h-full text-white'}>
                <h3 className={'font-medium text-lg'}>Información de contacto</h3>
                <p>Contáctanos por teléfono o correo electrónico para solucionar cualquier problema o duda (o usa el
                    widget en la esquina inferior derecha de tu pantalla).</p>
                <span className={'flex gap-2 items-center'}><FiPhone/> +1 (555) 123-4567</span>
                <span className={'flex gap-2 items-center'}><FiMail/> tulipannstore@gmail.com</span>
            </div>
            <div className={'p-12 flex flex-col gap-6 justify-items-start w-full min-h-fit col-span-3'}>
                <h3 className={'font-medium text-lg'}>Envianos un mensaje</h3>
                <form onSubmit={formik.handleSubmit} className={'h-fit flex flex-col'}>
                    <div className={'grid grid-cols-1 md:grid-cols-2 gap-x-4 lg:gap-x-8'}>
                        {/*Name input field*/}
                        <div className={"pb-4 w-full"}>
                            <label
                                className={"block text-sm font-medium pb-1"}
                                htmlFor="name">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Ingresa tu nombre"
                                className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span
                                className={"text-sm text-red-600 italic"}>{formik.touched.name && formik.errors.name ? formik.errors.name : ''}</span>
                        </div>
                        {/*Lastname input field*/}
                        <div className={"pb-4 w-full"}>
                            <label
                                className={"block text-sm font-medium pb-1"}
                                htmlFor="lastname">
                                Apellido
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                placeholder="Ingresa tu apellido"
                                className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span
                                className={"text-sm text-red-600 italic"}>{formik.touched.lastname && formik.errors.lastname ? formik.errors.lastname : ''}</span>
                        </div>
                        {/*Email input field*/}
                        <div className={"pb-4 w-full"}>
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
                        {/*Phone input field*/}
                        <div className={"pb-4 w-full"}>
                            <label
                                className={"block text-sm font-medium pb-1 flex justify-between"}
                                htmlFor="phone">
                                Teléfono
                                <span className={'text-slate-400 font-normal'}>Opcional</span>
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Ingresa tu teléfono"
                                className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span
                                className={"text-sm text-red-600 italic"}>{formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''}</span>
                        </div>
                        {/*Subject input field*/}
                        <div className={"pb-4 w-full md:col-span-2"}>
                            <label
                                className={"block text-sm font-medium pb-1"}
                                htmlFor="subject">
                                Asunto
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                placeholder="Ingresa el asunto"
                                className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                value={formik.values.subject}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span
                                className={"text-sm text-red-600 italic"}>{formik.touched.subject && formik.errors.subject ? formik.errors.subject : ''}</span>
                        </div>
                    </div>
                    {/*Message input field*/}
                    <div className={"pb-4 w-full flex-grow flex flex-col"}>
                        <label
                            className={"block text-sm font-medium pb-1 flex justify-between"}
                            htmlFor="message">
                            Mensaje
                            <span
                                className={'text-slate-400 font-normal'}>{0 < 500 - formik.values.message.length && 500 - formik.values.message.length < 500 ? `${500 - formik.values.message.length} caracteres restantes` : 'Máximo 500 caracteres'}</span>
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Ingresa tu mensaje"
                            className={"resize-none border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full flex-grow"}
                            value={formik.values.message}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span
                            className={"text-sm text-red-600 italic"}>{formik.touched.message && formik.errors.message ? formik.errors.message : ''}</span>
                    </div>
                    <div className={'flex items-center justify-end mt-2'}>
                        <button
                            type={'submit'}
                            className={"w-1/3 p-4 bg-red-500 hover:bg-red-400 text-center text-white font-medium cursor-pointer flex-grow rounded-md"}
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    )
};