import {Link} from "react-router-dom";
import {routes} from "../routes/routes";
import {useFormik} from "formik";
import * as Yup from "yup";
import Logo from "../assets/images/LogoTulipann.svg";
import {motion} from "framer-motion";

export const Register = () => {
    // Formik logics
    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            email: '',
            password: '',
            phone: '',
            address: '',
        },

        // Validate form
        validationSchema: Yup.object({
            name: Yup.string().max(30, 'El nombre no puede exceder los 30 caracteres').required('Por favor introduce un nombre'),
            lastname: Yup.string().max(30, 'El apellido no puede exceder los 30 caracteres').required('Por favor introduce un apellido'),
            email: Yup.string().email('El formato del correo no es valido').required('Por favor introduce un correo'),
            password: Yup.string().min(8, 'La contraseña debe contener minimo 8 caracteres').required('Por favor introduce una contraseña'),
            phone: Yup.string().matches(/\d+/, 'El teléfono solo puede contener números').min(10, 'El teléfono debe contener 10 caracteres').max(15, 'El teléfono no puede exceder los 15 caracteres').required('Por favor introduce un télefono'),
            address: Yup.string().required('Por favor introduce una dirección'),
        }),

        // Submit form
        onSubmit: (values) => {
            console.log(values);
        },
    });


    return (
        <motion.div
            initial={{translate: '100%'}}
            animate={{ translate: 0, }}
            exit={{ translate: '-100%', transition: {duration: 0.3}}}
        >
            <div className={"flex flex-col gap-8 justify-start items-center min-h-screen bg-gray-50 pb-10 p-8"}>
                <div className={"flex flex-col items-center justify-center text-center gap-4"}>
                    <div className={"h-24"}>
                        <img src={Logo} alt={Logo} className={"w-full h-full object-fill"}/>
                    </div>
                    <div>
                        <h1 className={"text-3xl font-bold"}>Vamos a crear tu cuenta</h1>
                        <span className={"text-sm"}>¿Ya tienes una? <Link to={routes.login.path}
                                                                          className={"text-red-500 font-medium"}>Inicia sesión</Link></span>
                    </div>
                </div>
                <form onSubmit={formik.handleSubmit} action=""
                      className={"bg-white py-6 px-8 rounded-lg border border-gray-100 shadow-sm w-1/2"}>
                    <div className={'grid grid-cols-2 gap-x-8'}>
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
                        {/*Password input field*/}
                        <div className={"pb-4 w-full"}>
                            <label
                                className={"block text-sm font-medium pb-1"}
                                htmlFor="password">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Ingresa tu contraseña"
                                className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span
                                className={"text-sm text-red-600 italic"}>{formik.touched.password && formik.errors.password ? formik.errors.password : ''}</span>
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
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span
                                className={"text-sm text-red-600 italic"}>{formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''}</span>
                        </div>
                        {/*Address input field*/}
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
                                placeholder="Ingresa tu dirección"
                                className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span
                                className={"text-sm text-red-600 italic"}>{formik.touched.address && formik.errors.address ? formik.errors.address : ''}</span>
                        </div>
                    </div>
                    <button type={'submit'}
                            className={"w-full mt-2 bg-red-500 hover:bg-red-400 text-center p-2 text-white font-medium cursor-pointer flex-grow rounded-md"}>
                        Registrarse
                    </button>
                </form>
            </div>
        </motion.div>
    )
}