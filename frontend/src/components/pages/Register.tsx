import {Link, useNavigate} from "react-router-dom";
import {routes} from "../../config/routes";
import {useFormik} from "formik";
import * as Yup from "yup";
import Logo from "../../assets/images/LogoTulipann.svg";
import {AnimatePresence, motion} from "framer-motion";
import {VscEye, VscEyeClosed} from "react-icons/vsc";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectDepartments} from "../../redux/selector";
import {City} from "../../models/interfaces";
import {apiRequest} from "../../api/request";
import {LoaderModal, Modal} from "../common";
import {getErrors} from "../../utils";

export const Register = () => {

    const departments = useSelector(selectDepartments);

    // Cities to show in the select input
    const [showCities, setShowCities] = useState<Array<City>>([]);

    // Loading state
    const [loading, setLoading] = useState<boolean>(false);

    // Show success modal state
    const [showSuccess, setShowSuccess] = useState(false);

    // Show error modal state
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    // Redirect to log in
    const redirect = () => {
        setShowSuccess(false);
        navigate(routes.login.path);
    };

    // Formik logics
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
            address: '',
            departmentId: departments[0].id,
            cityId: '',
            terms: false
        },

        // Validate form
        validationSchema: Yup.object({
            firstName: Yup.string().max(30, 'El nombre no puede exceder los 30 caracteres').required('Por favor introduce un nombre'),
            lastName: Yup.string().max(30, 'El apellido no puede exceder los 30 caracteres').required('Por favor introduce un apellido'),
            email: Yup.string().email('El formato del correo no es valido').required('Por favor introduce un correo'),
            password: Yup.string().min(8, 'La contraseña debe contener minimo 8 caracteres').required('Por favor introduce una contraseña'),
            phone: Yup.string().matches(/\d+/, 'El teléfono solo puede contener números').min(10, 'El teléfono debe contener 10 caracteres').max(15, 'El teléfono no puede exceder los 15 caracteres').required('Por favor introduce un télefono'),
            address: Yup.string().required('Por favor introduce una dirección'),
            cityId: Yup.string().required('Por favor selecciona una ciudad'),
            terms: Yup.boolean().oneOf([true], 'Debes aceptar los términos y condiciones')
        }),

        // Submit form
        onSubmit: (values) => {
            setLoading(true);
            let user = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                phone: values.phone,
                address: values.address,
                departmentId: values.departmentId,
                cityId: values.cityId
            }
            const response = apiRequest('POST', 'auth/register/', user, false);

            response.then(res => {
                setLoading(false);
                if (res.status === 201) {
                    setShowSuccess(true);
                } else {
                    const errors = res.data.Errors;
                    setErrorMessage(getErrors(errors));
                    setShowError(true);
                }
            });
        },
    });

    // Show cities
    useEffect(() => {
        setShowCities([]);
        const response = apiRequest('GET', `data/cities/department/${formik.values.departmentId}`, {}, false);
        response.then((response) => {
            let cities: City[] = response.data.sort((a: City, b: City) => a.name.localeCompare(b.name));
            setShowCities(cities);
        });
    }, [formik.values.departmentId]);

    // Show password
    const [shown, setShown] = useState<boolean>(false);

    const switchShown = () => setShown(!shown);

    return (
        <motion.div
            initial={{width: 0}}
            animate={{width: '100%'}}
            exit={{width: window.innerWidth}}
        >
            <div
                className={"flex flex-col gap-8 justify-start items-center min-h-screen bg-gray-50 pb-10 p-4 lg:p-8"}>
                <div className={"flex flex-col items-center justify-center text-center gap-4"}>
                    <div className={"h-24"}>
                        <img src={Logo} alt={Logo} className={`h-full w-full object-cover`}/>
                    </div>
                    <div>
                        <h1 className={"text-3xl font-bold"}>Vamos a crear tu cuenta</h1>
                        <span className={"text-sm"}>¿Ya tienes una? <Link to={routes.login.path}
                                                                          className={"text-red-500 font-medium"}>Inicia sesión</Link></span>
                    </div>
                </div>
                <form onSubmit={formik.handleSubmit}
                      className={"bg-white py-6 px-8 rounded-lg border border-gray-100 shadow-sm w-full md:w-1/2"}
                >
                    <div className={'grid md:grid-cols-2 gap-x-4 lg:gap-x-8'}>
                        {/*Name input field*/}
                        <div className={"pb-4 w-full"}>
                            <label
                                className={"block text-sm font-medium pb-1"}
                                htmlFor="firstName">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Ingresa tu nombre"
                                className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span
                                className={"text-sm text-red-600 italic"}>{formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : ''}</span>
                        </div>
                        {/*Lastname input field*/}
                        <div className={"pb-4 w-full"}>
                            <label
                                className={"block text-sm font-medium pb-1"}
                                htmlFor="lastName">
                                Apellido
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Ingresa tu apellido"
                                className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span
                                className={"text-sm text-red-600 italic"}>{formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : ''}</span>
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
                            <div className="w-full h-fit relative">
                                <input
                                    type={shown ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    placeholder="Ingresa tu contraseña"
                                    className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                    value={formik.values.password}
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
                        >
                            {
                                departments.map((department) => {
                                    return (
                                        <option key={department.id} value={department.id}>{department.name}</option>
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
                        >
                            {
                                showCities.length > 0
                                    ? <>
                                    <option value={''}><span className={'italic text-gray-500'}>Selecciona tu ciudad</span></option>
                                    {showCities.map((city) => {
                                        return (
                                            <option key={city.id} value={city.id}>{city.name}</option>
                                        )
                                    })
                                    }
                                    </>
                                    : <option value={''}><span className={'italic text-gray-500'}>Cargando las ciudades, por favor espera...</span></option>
                            }
                        </select>
                        <span
                            className={"text-sm text-red-600 italic"}
                        >
                            {formik.touched.cityId && formik.errors.cityId ? formik.errors.cityId : ''}
                        </span>
                    </div>
                    {/*Terms and conditions*/}
                    <div className={"pb-4 w-full"}>
                        <div className="flex items-center">
                            <input
                                id={'terms'}
                                name={`terms`}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
                                checked={formik.values.terms}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label
                                htmlFor={`terms`}
                                className="ml-2 min-w-0 flex-1 text-sm"
                            >
                                Acepto los <Link to={routes.terms.path} className={'text-red-500'}> términos y
                                condiciones </Link> y la <Link
                                to={routes.privacy.path} className={'text-red-500'}> política de privacidad</Link>
                            </label>
                        </div>
                        <span
                            className={"text-sm text-red-600 italic"}
                        >
                            {formik.touched.terms && formik.errors.terms ? formik.errors.terms : ''}
                        </span>
                    </div>
                    <button
                        type={'submit'}
                        className={"w-full mt-2 bg-red-500 hover:bg-red-400 text-center p-2 text-white font-medium cursor-pointer flex-grow rounded-md"}
                    >
                        Registrarse
                    </button>
                </form>
            </div>

            {/* Loader modal */}
            <LoaderModal isOpen={loading}/>

            {/* Success alert */}
            <Modal
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                type="success"
                title="Éxito"
                message="Se ha registrado con éxito"
                buttonText="Ir a Iniciar Sesión"
                onButtonClick={() => redirect()}
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