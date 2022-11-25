import {CategoryPreview, DiscoverSection, Hero, PromoSection} from "../components";
import {motion} from "framer-motion";

export const StoreFront = () => {

    return (
        <motion.div
            initial={{translate: '100%'}}
            animate={{ translate: 0, }}
            exit={{ translate: '-100%', transition: {duration: 0.3}}}
        >
            <Hero/>
            <CategoryPreview/>
            <DiscoverSection/>
            <PromoSection/>
        </motion.div>
    )
}