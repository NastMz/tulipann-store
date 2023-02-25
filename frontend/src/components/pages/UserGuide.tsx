import {motion} from "framer-motion";
import {routes} from "../../config/routes";
import {Link} from "react-router-dom";

/**
 * UserGuide component.
 *
 * This component displays the user guide for the website.
 *
 * @returns {ReactNode} The rendered component.
 */
export const UserGuide = () => {

    return (
        <motion.div
            initial={{width: 0}}
            animate={{width: '100%'}}
            exit={{width: 0}}
            className={"min-h-screen h-fit overflow-hidden w-full grid grid-cols-1 md:grid-cols-4"}
        >
            <div className={'bg-gradient-to-bl from-red-500 to-red-800 h-16 md:h-full w-full'}/>
            <div className={'p-12 flex flex-col gap-6 justify-items-start w-full col-span-3'}>
                <div>
                    <h3 className={'text-2xl font-bold text-red-500'}>Guía del Usuario</h3>
                    <h1 className={'text-5xl font-bold'}>Tulipann Store</h1>
                </div>
                <p>Bienvenido a la guía de usuario para nuestra página web. En esta guía, le proporcionaremos información detallada sobre cómo utilizar nuestra página web de manera eficiente y efectiva, tanto en computadoras de escritorio como en dispositivos móviles.
                </p>

                <h2 className={'font-bold text-xl'}>Acceso a la página web</h2>
                <p>Puede acceder a nuestra página web desde cualquier navegador web en su computadora de escritorio o en su dispositivo móvil. Nuestra página web es responsiva, lo que significa que se adapta automáticamente a la resolución y tamaño de la pantalla de su dispositivo.
                </p>

                <h2 className={'font-bold text-xl'}>Registro</h2>
                <p>Para utilizar nuestra página web no hace falta crear una cuenta para ver los productos, pero si desea realizar compras si es necesario. Para ello, haga clic en el botón "Crear cuenta" en la barra de navegación en la parte superior si está en una computadora de escritorio. Si se encuentra en un dispositivo móvil tendrá que dar clic en las tres lineas que aparecen en la barra de navegación en la parte superior izquierda y bajar hasta encontrar el botón "Crear cuenta". Complete el formulario de registro con su información personal y presione "Registrarse". Recibirá un mensaje de confirmación si su cuenta fue creada.
                </p>

                <h2 className={'font-bold text-xl'}>Inicio de sesión</h2>
                <p>Después de registrarse, inicie sesión en la página web haciendo clic en el botón "Iniciar sesión" en la barra de navegación en la parte superior si está en una computadora de escritorio. Si se encuentra en un dispositivo móvil tendrá que dar clic en las tres lineas que aparecen en la barra de navegación en la parte superior izquierda  y bajar hasta encontrar el botón "Iniciar sesión". Introduzca su correo electrónico y contraseña y haga clic en "Iniciar sesión". Ahora estará conectado y listo para utilizar todas las funciones de nuestra página web.
                </p>

                <h2 className={'font-bold text-xl'}>Navegación</h2>
                <p>Nuestra página web cuenta con una barra de navegación en la parte superior que le permitirá acceder a diferentes secciones de la página. Explore los enlaces para ver todo lo que nuestra página web ofrece. Si se encuentra en un dispositivo móvil tendrá que dar clic en las tres lineas que aparecen en la barra de navegación para ver estas opciones.
                </p>

                <h2 className={'font-bold text-xl'}>Pérfil de usuario</h2>
                <p>Después de iniciar sesión, puede acceder a su perfil de usuario haciendo clic en su nombre de usuario y luego en el botón "Mi perfil" en la barra de navegación superior si está en una computadora de escritorio. Si se encuentra en un dispositivo móvil tendrá que dar clic en las tres lineas que aparecen en la barra de navegación en la parte superior izquierda  y bajar hasta ver el botón "Mi perfil". En su perfil, puede ver y editar su información personal y cambiar su contraseña.
                </p>

                <h2 className={'font-bold text-xl'}>Carrito de compras o bolsa</h2>
                <p>Nuestra página web cuenta con una sección de compras donde puede seleccionar los productos que desea comprar y agregarlos a su carrito de compras o bolsa. Desde el carrito de compras, puede ver y editar su selección de productos antes de realizar la compra.
                </p>

                <h2 className={'font-bold text-xl'}>Pago</h2>
                <p>Una vez que haya seleccionado todos los productos que desea comprar, puede proceder al pago haciendo clic en el botón "Ir a pagar". Elije su forma de pago e introduce la información de pago requerida y luego haga clic en "Continuar" o "Realizar orden" dependiendo la forma de pago. Una vez que se complete la transacción, podrá ver la orden y su estado haciendo clic en su nombre de usuario y luego en el botón "Mis ordenes" en la barra de navegación superior si está en una computadora de escritorio. Si se encuentra en un dispositivo móvil tendrá que dar clic en las tres lineas que aparecen en la barra de navegación en la parte superior izquierda  y bajar hasta ver el botón "Mis ordenes".
                </p>

                <h2 className={'font-bold text-xl'}>Ayuda y soporte</h2>
                <p>Si tiene alguna pregunta o problema mientras usa nuestra página web, puede acceder a la sección de ayuda en la barra de navegación superior si se encuentra en una computadora de escritorio. Si se encuentra en un dispositivo móvil tendrá que dar clic en las tres lineas que aparecen en la barra de navegación para ver la sección de ayuda. Aquí encontrará información útil como preguntas frecuentes, formas de pago, devoluciones y garantías. También puede acceder a la sección de ayuda en la barra de navegación superior donde encontrará la opción de ponerse en <Link
                    to={routes.contact.path}
                    className={'text-red-500'}>contacto</Link> con nosotros si necesita más ayuda.
                </p>

                <p>Gracias por utilizar nuestra página web. Esperamos que tenga una experiencia de usuario satisfactoria.</p>
            </div>
        </motion.div>
    )
};