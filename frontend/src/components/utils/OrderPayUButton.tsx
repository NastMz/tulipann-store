import icon from "../../assets/images/payu.png";
import React, {useState} from "react";
import {generateSignature} from "../../utils";
import {Order} from "../../models/interfaces/Order";
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/selector";
import {getAmount} from "../../utils/orderUtils";

/**
 * Variants for animating the modal.
 *
 * @type {import('framer-motion').Variants}
 */
const modalVariants = {
    open: {scale: 1},
    closed: {scale: 0},
};

/**
 * Variants for animating the background.
 *
 * @type {import('framer-motion').Variants}
 */
const backgroundVariants = {
    open: {opacity: 1},
    closed: {opacity: 0},
};

/**
 * Interface for the props of the OrderPayUButton component.
 *
 * @interface OrderPayUButtonProps
 * @property {Order} order - The order to pay.
 */
interface OrderPayUButtonProps {
    order: Order;
}


/**
 * OrderPayUButton component.
 *
 * This component displays a button that can be used to pay with PayU.
 *
 * @return {ReactNode} The rendered component.
 */
export const OrderPayUButton = (props: OrderPayUButtonProps) => {

    const user = useSelector(selectUser);

    const amount = getAmount(props.order.products) + (props.order.shippingValue ?? 0)

    const data = {
        merchantId: import.meta.env.VITE_PAYU_MERCHANT_ID,
        accountId: import.meta.env.VITE_PAYU_ACCOUNT_ID,
        description: `Pago orden Tulipann Store`,
        referenceCode: props.order.id,
        amount: amount.toString(),
        currency: import.meta.env.VITE_PAYU_CURRENCY,
        signature: generateSignature(amount, props.order.id),
        test: "0",
        buyerEmail: user.email,
        buyerFullName: user.firstName + ' ' + user.lastName,
        responseUrl: `${import.meta.env.VITE_PAYU_RESPONSE_URL}/${props.order.id}`,
        confirmationUrl: import.meta.env.VITE_PAYU_CONFIRMATION_URL,
        extra1: props.order.id
    };

    return (
        <form
            method="post"
            action={import.meta.env.VITE_PAYU_SANDBOX_URL}
        >
            <input name="merchantId" type="hidden" value={data.merchantId}/>
            <input name="accountId" type="hidden" value={data.accountId}/>
            <input name="description" type="hidden" value={data.description}/>
            <input name="referenceCode" type="hidden" value={data.referenceCode}/>
            <input name="amount" type="hidden" value={data.amount}/>
            <input name="currency" type="hidden" value={data.currency}/>
            <input name="signature" type="hidden" value={data.signature}/>
            <input name="test" type="hidden" value={data.test}/>
            <input name="tax" type="hidden" value="0"/>
            <input name="taxReturnBase" type="hidden" value="0"/>
            <input name="buyerEmail" type="hidden" value={data.buyerEmail}/>
            <input name="buyerFullName" type="hidden" value={data.buyerFullName}/>
            <input name="responseUrl" type="hidden" value={data.responseUrl}/>
            <input name="confirmationUrl" type="hidden" value={data.confirmationUrl}/>
            <input name="extra1" type="hidden" value={data.extra1}/>
            {/* PayU Button */}
            <button
                type={"submit"}
                className={`mx-auto bg-white px-10 py-4 rounded-md hover:bg-gray-100 font-medium w-full h-fit flex justify-center items-center border border-slate-100 shadow-md`}
            >
                <img src={icon} alt={'PayU Icon'} className={'max-w-[50px]'}/>
            </button>
        </form>
    )
}