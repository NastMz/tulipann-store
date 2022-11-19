import {BsWhatsapp} from "react-icons/all";

export const WhatsAppFloatIcon = (props: { phone: number }) => {
    return (
        <a href={"#"} className="fixed z-50 bottom-5 right-5 rounded-full bg-green-500 shadow-xl p-3 flex items-center justify-center">
            <BsWhatsapp size={30} color={"white"}/>
        </a>
    )
}