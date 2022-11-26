import {motion} from "framer-motion";
import {lazy} from "react";

const CategoryPreview = lazy(() => import('../components').then(({CategoryPreview}) => ({default: CategoryPreview})));
const DiscoverSection = lazy(() => import('../components').then(({DiscoverSection}) => ({default: DiscoverSection})));
const Hero = lazy(() => import('../components').then(({Hero}) => ({default: Hero})));
const PromoSection = lazy(() => import('../components').then(({PromoSection}) => ({default: PromoSection})));

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