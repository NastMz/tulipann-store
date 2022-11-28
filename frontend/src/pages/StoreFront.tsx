import {motion} from "framer-motion";
import {CategoryPreview, DiscoverSection, Hero, PromoSection} from "../components";


export const StoreFront = () => {

    return (
        <motion.div
            initial={{width: 0}}
            animate={{width: '100%'}}
            exit={{width: window.innerWidth, transition: {duration: 0.3}}}
        >
            <Hero/>
            <CategoryPreview/>
            <DiscoverSection/>
            <PromoSection/>
        </motion.div>
    )
}