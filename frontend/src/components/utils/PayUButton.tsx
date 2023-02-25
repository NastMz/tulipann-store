import icon from "../../assets/images/payu.png";
import React, {useState} from "react";
import {LoaderModal, Modal} from "../common";
import {OrderProduct} from "../../models/interfaces/Order";
import {ShippingAddressForm} from "./ShippingAddressForm";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../redux/selector";
import {useNavigate} from "react-router-dom";
import {routes} from "../../config/routes";
import {emptyCart} from "../../redux/actions";


/**
 * Interface for the PayUButton props.
 *
 * @interface PayUButtonProps
 * @property {OrderProduct[]} products - The products to be sent in the order.
 */
interface PayUButtonProps {
    products: OrderProduct[];
}


/**
 * PayUButton component.
 *
 * This component displays a button that can be used to pay with PayU.
 *
 * @return {ReactNode} The rendered component.
 */
export const PayUButton = (props: PayUButtonProps) => {

    const user = useSelector(selectUser);

    // State for the modal message.
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // State for the shipping form.
    const [shippingFormIsOpen, setShippingFormIsOpen] = useState(false);

    // Loading state
    const [loading, setLoading] = useState<boolean>(false);

    // Show success modal state
    const [showSuccess, setShowSuccess] = useState(false);

    // Show error modal state
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const handlePayUClick = () => {
        setModalIsOpen(false);
        setShippingFormIsOpen(true);
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const closeSuccessModal = () => {
        dispatch(emptyCart());
        setShowSuccess(false);
        navigate(routes.catalog.path)
    }

    const redirect = () => {
        dispatch(emptyCart());
        setShowSuccess(false);
        navigate(routes.orderHistory.path);
    }

    return (
        <>
            {/* PayU Button */}
            <button
                onClick={() => {
                    setModalIsOpen(true)
                }}
                className={`mx-auto bg-white px-10 py-4 rounded-md hover:bg-gray-100 font-medium w-full h-fit flex justify-center items-center border border-slate-100 shadow-md`}
            >
                <img src={icon} alt={'PayU Icon'} className={'max-w-[50px]'}/>
            </button>

            {/* Modal for displaying messages to the user */}
            <Modal
                title={'Atención'}
                message={'Recuerda que para poder realizar el pago, debe comunicarse con nosotros a través de nuestro WhatsApp para calcular el valor de su envio. Debe enviar un mensaje con el código de su pedido, para obtenerlo haga click en el botón a continuación y aparecera en su lista de pedidos.'}
                buttonText="Continuar"
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                onButtonClick={() => handlePayUClick()}
                type={'warning'}
            />

            <ShippingAddressForm
                user={user}
                products={props.products}
                isOpen={shippingFormIsOpen}
                onClose={() => setShippingFormIsOpen(false)}
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
                onClose={() => closeSuccessModal()}
                type="success"
                title="Éxito"
                message="Se ha registrado su orden con éxito. De clic en el botón para ver sus ordenes. O puede continuar comprando."
                buttonText="Ir a Mis Ordenes"
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
        </>
    )
}