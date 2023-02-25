import {useDispatch, useSelector} from "react-redux";
import {selectDepartments, selectUser} from "../../redux/selector";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {City} from "../../models/interfaces";
import {apiRequest} from "../../api/request";
import {getErrors} from "../../utils";
import {setUser} from "../../redux/actions";
import {motion} from "framer-motion";
import {LoaderModal, Modal} from "../common";
import {ChangePasswordModal} from "../utils";

/**
 * Profile page.
 *
 * This component is responsible for displaying the profile page.
 * @returns {JSX.Element} Profile page.
 */
export const Profile = () => {
    const user = useSelector(selectUser);

    const dispatch = useDispatch();

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

    // Show change password modal state
    const [showChangePassword, setShowChangePassword] = useState(false);


    // Formik logics
    const formik = useFormik({
        initialValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            address: user.address,
            departmentId: user.departmentId,
            cityId: user.cityId,
        },

        // Validate form
        validationSchema: Yup.object({
            firstName: Yup.string().max(30, 'El nombre no puede exceder los 30 caracteres').required('Por favor introduce un nombre'),
            lastName: Yup.string().max(30, 'El apellido no puede exceder los 30 caracteres').required('Por favor introduce un apellido'),
            email: Yup.string().email('El formato del correo no es valido').required('Por favor introduce un correo'),
            phone: Yup.string().matches(/\d+/, 'El teléfono solo puede contener números').min(10, 'El teléfono debe contener 10 caracteres').max(15, 'El teléfono no puede exceder los 15 caracteres').required('Por favor introduce un télefono'),
            address: Yup.string().required('Por favor introduce una dirección'),
            cityId: Yup.string().required('Por favor selecciona una ciudad'),
        }),

        // Submit form
        onSubmit: (values) => {
            setLoading(true);

            const response = apiRequest('PUT', 'data/user/update/', values);

            response.then(res => {
                setLoading(false);
                if (res.status === 200) {
                    let newUser = apiRequest('GET', 'data/user/');
                    newUser.then(res => {
                        dispatch(setUser(res.data));
                        setShowSuccess(true);
                    }).catch(err => {
                        setErrorMessage('Ha ocurrido un error al actualizar los datos');
                        setShowError(true);
                    });

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
            let sortedCities: City[] = response.data.sort((a: City, b: City) => a.name.localeCompare(b.name));
            setShowCities(sortedCities);
        });
    }, [formik.values.departmentId]);


    return (
        <motion.div
            initial={{width: 0}}
            animate={{width: '100%'}}
            exit={{width: 0}}
            className={"min-h-screen h-fit overflow-hidden w-full grid grid-cols-1 md:grid-cols-4"}
        >
            <div className={'bg-gradient-to-bl from-red-500 to-red-800 h-16 md:h-full w-full'}/>
            <div className={'p-4 md:p-12 flex flex-col gap-6 justify-items-start w-full col-span-3'}>
                <div className={'flex flex-col md:flex-row justify-between items-start md:items-end p-2 md:p-0 gap-6'}>
                    <div>
                        <h3 className={'text-2xl font-bold text-red-500'}>Información Personal</h3>
                        <h1 className={'text-5xl font-bold'}>Mi Perfil</h1>
                    </div>
                    <div
                        onClick={() => setShowChangePassword(true)}
                        className={'font-medium cursor-pointer rounded-md px-4 py-2 bg-red-500 text-white hover:bg-red-400'}>
                        Cambiar contraseña
                    </div>
                </div>
                <form
                    onSubmit={formik.handleSubmit}
                    className={"bg-white py-6 px-8 rounded-lg border border-gray-100 shadow-sm w-full"}
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
                            placeholder="Selecciona tu departamento"
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
                    {/*Cty input field*/}
                    <div className={"pb-4 w-full"}>
                        <label
                            className={"block text-sm font-medium pb-1"}
                            htmlFor="cityId">
                            Ciudad
                        </label>
                        <select
                            id="cityId"
                            name="cityId"
                            placeholder="Selecciona tu Ciudad"
                            className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                            value={formik.values.cityId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            {
                                showCities.length > 0
                                    ? <>
                                        <option value={''}><span
                                            className={'italic text-gray-500'}>Selecciona tu ciudad</span></option>
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
                    <button
                        type={'submit'}
                        className={"w-full mt-2 bg-red-500 hover:bg-red-400 text-center p-2 text-white font-medium cursor-pointer flex-grow rounded-md"}
                    >
                        Actualizar
                    </button>
                </form>
            </div>

            <ChangePasswordModal
                user={user}
                isOpen={showChangePassword}
                onClose={() => setShowChangePassword(false)}
                setLoading={setLoading}
                setShowSuccess={setShowSuccess}
                setShowError={setShowError}
                setErrorMessage={setErrorMessage}
            />

            {/* Loader modal */}
            <LoaderModal isOpen={loading}/>

            {/* Success alert */}
            <Modal
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                type="success"
                title="Éxito"
                message="Perfil actualizado correctamente"
                buttonText="Aceptar"
                onButtonClick={() => setShowSuccess(false)}
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
    )
}