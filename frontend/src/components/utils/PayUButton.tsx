import icon from "../../assets/images/payu.png";
import {useState} from "react";

/**
 * PayUButton component.
 *
 * This component displays a button that can be used to pay with PayU.
 *
 * @return {ReactNode} The rendered component.
 */
export const PayUButton = () => {
    const data = {
        "merchantId": import.meta.env.VITE_PAYU_MERCHANT_ID,
        "accountId": import.meta.env.VITE_PAYU_ACCOUNT_ID,
        "description": "Pago orden #1234",
        "referenceCode": "",
        "amount": "",
        "tax": "0",
        "currency": import.meta.env.VITE_PAYU_CURRENCY,
        "signature": "",
        "test": "0",
        "buyerEmail": "",
        "responseUrl": `${import.meta.env.VITE_PAYU_RESPONSE_URL}/a}`,
        "confirmationUrl": import.meta.env.VITE_PAYU_CONFIRMATION_URL,
        "shippingAddress": "",
        "shippingCity": "",
        "shippingCountry": "CO",
    }

    const [openModal, setOpenModal] = useState(false);
  return (
      <button
          onClick={() => {}}
          className={`mx-auto bg-white px-10 py-4 rounded-md hover:bg-gray-100 font-medium w-full h-fit flex justify-center items-center border border-slate-100 shadow-md`}
      >
          <img src={icon} alt={'PayU Icon'} className={'max-w-[50px]'}/>
      </button>
  )
}