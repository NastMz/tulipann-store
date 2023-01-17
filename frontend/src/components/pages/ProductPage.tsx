import {Navigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectProducts} from "../../redux/selector";
import {routes} from "../../config/routes";
import {lazy} from "react";
import {motion} from "framer-motion";
import {ProductFeatures} from "../sections";
import {ProductOverview} from '../ui';


/**
 * Lazy-loads the Reviews component.
 *
 * @returns {React.LazyExoticComponent<typeof Reviews>} The lazy-loaded Reviews component.
 */
const Reviews = lazy(() => import('../sections/index').then(({Reviews}) => ({default: Reviews})));

/**
 * ProductPage component.
 *
 * This component displays detailed information about a product.
 *
 * @returns {React.ReactNode} The rendered component.
 */
export const ProductPage = () => {

    // Extracts the product ID from the URL parameters.
    const { productId } = useParams();

    // Retrieves the list of products from the Redux store.
    const products = useSelector(selectProducts);

    // Finds the product with the specified ID in the list of products.
    const product = products.find((product) => product.id === productId ?? "");

    if (product) {

        // Sets the page title to the name of the product and the route title.
        document.title = product.name.concat(' | ', routes.product.title);

        return (
            <motion.div
                initial={{width: 0}}
                animate={{width: '100%'}}
                exit={{width: window.innerWidth}}
            >
                <div>
                    <ProductOverview product={product}/>
                    <ProductFeatures specs={product.specs}/>
                    <Reviews product={product}/>
                </div>
            </motion.div>
        )
    } else {
        return (
            <Navigate to={routes.catalog.path}/>
        );
    }
}