import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectProducts} from "../redux/selector";
import {ProductFeatures, ProductOverview, Reviews} from "../components";
import {routes} from "../routes/routes";

export const ProductPage = () => {

    const {productId} = useParams();

    const products = useSelector(selectProducts);

    const product = products.filter((product) => product.id === parseInt(productId ?? ''))[0];

    document.title = product.name.concat(routes.product.title);

    return (
        <div>
            <ProductOverview product={product}/>
            <ProductFeatures specs={product.specs}/>
            <Reviews product={product}/>
        </div>
    )
}