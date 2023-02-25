import {motion} from "framer-motion";
import {OrderTable} from "../sections";


/**
 * OrderHistory component.
 *
 * This component is responsible for displaying the order history of the user.
 *
 * @returns {JSX.Element} OrderHistory component.
 */
export const OrderHistory = () => {
    return (
        <motion.div
            initial={{width: 0}}
            animate={{width: '100%'}}
            exit={{width: 0}}
            className={"min-h-screen h-fit overflow-hidden w-full grid grid-cols-1 md:grid-cols-4"}
        >
            <div className={'bg-gradient-to-bl from-red-500 to-red-800 w-full h-16 md:h-full'}/>
            <div className={'p-8 lg:p-12 flex flex-col gap-6 justify-items-start w-full col-span-3'}>
                <div>
                    <h3 className={'text-2xl font-bold text-red-500'}>Tus compras</h3>
                    <h1 className={'text-5xl font-bold'}>Historial de ordenes</h1>
                </div>
                <OrderTable className={'h-screen'}/>
            </div>
        </motion.div>
    );
}