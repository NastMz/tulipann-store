import {AiOutlineClose, BiSend, BsWhatsapp} from "react-icons/all";

interface WhatsAppFormProps {
    phone: number,
    setIsOpen: Function
}

export const WhatsAppWidget = (props: WhatsAppFormProps) => {
    // Appending the phone number to the URL
    // let url = `https://web.whatsapp.com/send?phone=${props.phone}`;
    return (
        <div className="rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-green-500 h-fit w-full p-4 flex items-center justify-between">
                <div className={'flex gap-2 items-center'}>
                    <BsWhatsapp size={25} color={"white"}/>
                    <span className={'text-white font-medium text-lg'}>WhatsApp</span>
                </div>
                <div className={'rounded-full p-1 bg-green-700 hover:bg-green-900 cursor-pointer h-fit w-fit'}>
                    <AiOutlineClose
                        size={20}
                        className={"cursor-pointer text-white"}
                        onClick={() => props.setIsOpen(false)}
                    />
                </div>
            </div>
            <div
                className={"bg-slate-100 p-2 border border-gray-100 w-full h-fit"}
            >
                <div className={"pl-2 pr-6 pt-4 pb-8 flex flex-col gap-1"}>
                    <span className={'bg-white w-fit py-1 px-2 rounded-xl shadow-sm'}>Hola!</span>
                    <span className={'bg-white w-fit py-1 px-2 rounded-xl shadow-sm'}>Contactanos y responderemos a tus dudas</span>
                </div>
                <div className={"w-full flex justify-end"}>
                    <div
                        className={'flex gap-2 items-center w-fit h-fit py-2 px-4 bg-green-500 hover:bg-green-700 rounded-full cursor-pointer'}>
                    <span className={"text-white text-md font-medium"}>
                        Abrir WhatsApp
                    </span>
                        <BiSend size={25} color={"white"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}