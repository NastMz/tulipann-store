import {motion} from "framer-motion";
import {routes} from "../../config/routes";
import {Link} from "react-router-dom";
import {AccordionLayout} from "../common";
import {useState} from "react";

/**
 * FAQ component.
 *
 * This component displays the frequently asked questions.
 *
 * @returns {ReactNode} The rendered component.
 */
export const FAQ = () => {

    // Accordions interaction
    const [activeForm, setActiveForm] = useState<number>(0);

    const [activeIndexes, setActiveIndexes] = useState<Array<number>>([]);

    const setActiveIndex = (index: number) => {
        setActiveForm(index);
    }

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
                    <h3 className={'text-2xl font-bold text-red-500'}>Preguntas frecuentes</h3>
                    <h1 className={'text-5xl font-bold'}>Tulipann Store</h1>
                </div>
                <p>Aquí encontrará respuestas a las preguntas más comunes que recibimos sobre nuestros productos. Si no
                    encuentra la respuesta a su pregunta, no dude en ponerse en <Link to={routes.contact.path}
                                                                                      className={'text-red-500'}>contacto</Link> con
                    nosotros. Estaremos encantados de ayudarle.</p>

                <AccordionLayout
                    title={'¿Cómo puedo hacer un pedido?'}
                    titleClass={'text-black'}
                    index={0}
                    activeIndex={activeForm}
                    setActiveIndex={setActiveIndex}
                    showIcon
                    independentCards={{ activeIndexes: activeIndexes, setActiveIndexes: setActiveIndexes }}
                >
                    <p>Para hacer un pedido, simplemente seleccione los productos que desea comprar en nuestra tienda en línea y siga las instrucciones para completar su compra. También puede hacer un pedido llamándonos al número de teléfono de nuestra tienda o enviando un mensaje a nuestro whatsapp.</p>
                </AccordionLayout>

                <AccordionLayout
                    title={'¿Cuáles son los plazos de entrega?'}
                    titleClass={'text-black'}
                    index={1}
                    activeIndex={activeForm}
                    setActiveIndex={setActiveIndex}
                    showIcon
                    independentCards={{ activeIndexes: activeIndexes, setActiveIndexes: setActiveIndexes }}
                >
                    <p>Los plazos de entrega varían según el producto y la ubicación de envío. Consulte la descripción del producto o póngase en <Link to={routes.contact.path} className={'text-red-500'}>contacto</Link> con nuestro servicio de atención al cliente para obtener detalles específicos.</p>
                </AccordionLayout>

                <AccordionLayout
                    title={'¿Cómo sé cuánto cuesta el envío?'}
                    titleClass={'text-black'}
                    index={2}
                    activeIndex={activeForm}
                    setActiveIndex={setActiveIndex}
                    showIcon
                    independentCards={{ activeIndexes: activeIndexes, setActiveIndexes: setActiveIndexes }}
                >
                    <p>Para saber el valor del envío, sin importar el medio de pago, debe consultar por WhatsApp cuánto costará este, ya que dependerá de la cantidad de productos. También en el proceso de la compra se le notificará de esto para que no realice ningún pago antes de saber este valor.</p>
                </AccordionLayout>

                <AccordionLayout
                    title={'¿Cómo puedo pagar mi pedido?'}
                    titleClass={'text-black'}
                    index={3}
                    activeIndex={activeForm}
                    setActiveIndex={setActiveIndex}
                    showIcon
                    independentCards={{ activeIndexes: activeIndexes, setActiveIndexes: setActiveIndexes }}
                >
                    <p>Aceptamos pagos con tarjeta de crédito, débito, contra entrega y transferencia bancaria. Seleccione su método de pago preferido durante el proceso de compra.</p>
                </AccordionLayout>

                <AccordionLayout
                    title={'¿Dónde estamos ubicados?'}
                    titleClass={'text-black'}
                    index={4}
                    activeIndex={activeForm}
                    setActiveIndex={setActiveIndex}
                    showIcon
                    independentCards={{ activeIndexes: activeIndexes, setActiveIndexes: setActiveIndexes }}
                >
                    <p>No contamos con sede física donde prestemos servicio al cliente, todo lo hacemos de manera virtual mediante nuestra página web o a través de WhatsApp.</p>
                </AccordionLayout>

                <AccordionLayout
                    title={'¿Cómo puedo contactar con el servicio de atención al cliente?'}
                    titleClass={'text-black'}
                    index={5}
                    activeIndex={activeForm}
                    setActiveIndex={setActiveIndex}
                    showIcon
                    independentCards={{ activeIndexes: activeIndexes, setActiveIndexes: setActiveIndexes }}
                >
                    <p>Puede ponerse en <Link to={routes.contact.path} className={'text-red-500'}>contacto</Link> con nuestro servicio de atención al cliente mediante correo electrónico, teléfono o chat en vivo en nuestra página web. Estamos disponibles para ayudarle durante las horas de oficina.</p>
                </AccordionLayout>

            </div>
        </motion.div>
    )
};