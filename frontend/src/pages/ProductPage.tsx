import {Navigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectProducts} from "../redux/selector";
import {routes} from "../routes/routes";
import {lazy} from "react";
import {motion} from "framer-motion";

const ProductFeatures = lazy(() => import('../components').then(({ProductFeatures}) => ({default: ProductFeatures})));
const ProductOverview = lazy(() => import('../components').then(({ProductOverview}) => ({default: ProductOverview})));
const Reviews = lazy(() => import('../components').then(({Reviews}) => ({default: Reviews})));

export const ProductPage = () => {

    const {productId} = useParams();

    const products = useSelector(selectProducts);

    const product = products.filter((product) => product.id === parseInt(productId ?? ''));


    if (product.length > 0) {
        document.title = product[0].name.concat(' | ', routes.product.title);
        return (
            <motion.div
                initial={{width: 0}}
                animate={{width: '100%'}}
                exit={{width: window.innerWidth, transition: {duration: 0.3}}}
            >
                <div>
                    <ProductOverview product={product[0]}/>
                    <ProductFeatures specs={product[0].specs}/>
                    <Reviews product={product[0]}/>
                </div>
            </motion.div>
        )
    } else {
        return (
            <Navigate to={routes.catalog.path}/>
        );
    }
}