import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectProducts} from "../redux/selector";
import {ProductFeatures, ProductOverview, Reviews} from "../components";
import {routes} from "../routes/routes";
import {useEffect} from "react";
import {motion} from "framer-motion";

export const ProductPage = () => {

    const {productId} = useParams();

    const navigate = useNavigate();

    const products = useSelector(selectProducts);

    const product = products.filter((product) => product.id === parseInt(productId ?? ''));

    useEffect(() => {
        if (product.length > 0) {
            document.title = product[0].name.concat(' | ', routes.product.title);
        } else {
            navigate('/not-found');
        }
    }, []);

    if (product.length > 0) {
        return (
            <motion.div
                initial={{translate: '100%'}}
                animate={{ translate: 0, }}
                exit={{ translate: '-100%', transition: {duration: 0.3}}}
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
            <div>

            </div>
        );
    }
}