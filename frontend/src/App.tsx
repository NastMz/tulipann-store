import './App.css';
import {Login, NotFound, ProductPage, ProductsListPage, Register, StoreFront} from "./pages";
import {Route, Routes} from "react-router-dom";
import {Main} from "./templates";
import {getArticles, getCategories, getProducts} from "./api/api";
import {useDispatch} from "react-redux";
import {ScrollToTop} from "./utils";
import {addArticle, addCategory, addProduct} from "./redux/actions";
import {routes} from "./routes/routes";

function App() {
    const dispatch = useDispatch();

    const products = getProducts();
    const categories = getCategories();
    const articles = getArticles();

    products.forEach((product) => dispatch(addProduct(product)));
    categories.forEach((category) => dispatch(addCategory(category)));
    articles.forEach((article) => dispatch(addArticle(article)));

    return (<>
        <ScrollToTop/>
        <Routes>
            <Route
                path={"*"}
                element={<Main
                    page={<NotFound/>}
                    title={"Página no encontrada | Tulipann Store"}
                />}
            />
            <Route
                path={routes.home.path}
                element={<Main
                    page={<StoreFront/>}
                    title={routes.home.title}
                />}
            />
            <Route
                path={routes.catalog.path}
                element={<Main
                    page={<ProductsListPage itemsPerPage={12}/>}
                    title={routes.catalog.title}
                />}
            />
            <Route
                path={`${routes.catalog.path}/:categoryId`}
                element={<Main
                    page={<ProductsListPage itemsPerPage={12}/>}
                    title={routes.catalog.title}
                />}
            />
            <Route
                path={`${routes.product.path}/:productId`}
                element={<Main
                    page={<ProductPage/>}
                    title={routes.product.title}
                />}
            />
            <Route
                path={`${routes.login.path}`}
                element={<Main
                    page={<Login/>}
                    title={routes.login.title}
                />}
            /><Route
                path={`${routes.register.path}`}
                element={<Main
                    page={<Register/>}
                    title={routes.register.title}
                />}
            />
        </Routes>
    </>)
}

export default App;
