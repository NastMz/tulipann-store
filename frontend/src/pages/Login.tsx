import {Link} from "react-router-dom";
import {routes} from "../routes/routes";
import {useFormik} from "formik";
import * as Yup from "yup";

export const Login = () => {
    // Formik logics
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },

        // Validate form
        validationSchema: Yup.object({
            email: Yup.string().email('El formato del correo no es valido').required('Por favor introduce un correo'),
            password: Yup.string().required('Por favor introduce una contraseña'),
        }),

        // Submit form
        onSubmit: (values) => {
            console.log(values);
        },
    });


    return (
        <div className={"flex flex-col gap-8 justify-start items-center h-screen bg-gray-50 p-8"}>
            <div className={"flex flex-col items-center justify-center text-center gap-4"}>
                <div className={"text-3xl"}>
                    LOGO
                </div>
                <div>
                    <h1 className={"text-3xl font-bold"}>Inicia sesión con tu cuenta</h1>
                    <span className={"text-sm"}>O unete a nosotros y <Link to={routes.register.path}
                                                                           className={"text-red-500 font-medium"}>crea una</Link></span>
                </div>
            </div>
            <form onSubmit={formik.handleSubmit} action="" className={"bg-white py-6 px-8 rounded-lg border border-gray-100 shadow-sm w-96"}>
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
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className={"text-sm text-red-600 italic"}>{formik.touched.email && formik.errors.email ? formik.errors.email : ''}</span>
                </div>
                {/*Password input field*/}
                <div className={"pb-4"}>
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
                    <span className={"text-sm text-red-600 italic"}>{formik.touched.password && formik.errors.password ? formik.errors.password : ''}</span>
                </div>
                {/*Remember me*/}
                <div className={"pt-2 pb-5 text-sm flex justify-between items-center"}>
                    <div className="flex items-center">
                        <input
                            id={'remember-me'}
                            name={`remember-me`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
                        />
                        <label
                            htmlFor={`remember`}
                            className="ml-2 min-w-0 flex-1 font-medium"
                        >
                            Recordarme
                        </label>
                    </div>
                    <Link to={"#"} className={"text-red-500 font-medium"}>Olvidaste tu contraseña?</Link>
                </div>
                <button type={'submit'}
                        className={"w-full my-1 md:my-4 bg-red-500 hover:bg-red-400 text-center p-2 text-white font-medium cursor-pointer flex-grow rounded-md"}>
                    Iniciar sesión
                </button>
            </form>
        </div>
    )
}